// Source of truth: resumewritingdata/summary.md — keep in sync with lib/prompt.js.

export const SSIp_LEADS = ["story", "skills", "impact"];

export const SSIp_FIELDS = ["story", "skill", "impact", "positioning"];

export const resumeBulletsJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "bullets",
    "skills",
    "impactFraming",
    "positioningFraming",
    "coachingNote",
    "missingInformation",
  ],
  properties: {
    bullets: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["lead", "text", "ssiP"],
        properties: {
          lead: { type: "string", enum: SSIp_LEADS },
          text: { type: "string" },
          ssiP: {
            type: "object",
            additionalProperties: false,
            required: SSIp_FIELDS,
            properties: {
              story: { type: "string" },
              skill: { type: "string" },
              impact: { type: "string" },
              positioning: { type: "string" },
            },
          },
        },
      },
    },
    skills: { type: "array", items: { type: "string" } },
    impactFraming: { type: "string" },
    positioningFraming: { type: "string" },
    coachingNote: { type: "string" },
    missingInformation: { type: "array", items: { type: "string" } },
  },
};

const TOP_LEVEL_KEYS = Object.keys(resumeBulletsJsonSchema.properties);

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const looksLikeMarkdown = (text) =>
  /^[\s>*#-]+/.test(text) || /[\n`*]/.test(text);

export function validateResumeBullets(data) {
  const errors = [];

  if (!isPlainObject(data)) {
    return { ok: false, errors: ["response must be a JSON object"] };
  }

  for (const key of Object.keys(data)) {
    if (!TOP_LEVEL_KEYS.includes(key)) {
      errors.push(`unexpected top-level field "${key}"`);
    }
  }

  const bullets = data.bullets;
  if (!Array.isArray(bullets)) {
    errors.push("bullets must be an array");
  } else {
    if (bullets.length !== 3) {
      errors.push(`bullets must contain exactly 3 entries, got ${bullets.length}`);
    }
    bullets.forEach((bullet, index) => {
      const label = `bullets[${index}]`;
      if (!isPlainObject(bullet)) {
        errors.push(`${label} must be an object`);
        return;
      }
      for (const key of Object.keys(bullet)) {
        if (!["lead", "text", "ssiP"].includes(key)) {
          errors.push(`${label} has unexpected field "${key}"`);
        }
      }
      if (!SSIp_LEADS.includes(bullet.lead)) {
        errors.push(`${label}.lead must be one of: ${SSIp_LEADS.join(", ")}`);
      } else if (index < SSIp_LEADS.length && bullet.lead !== SSIp_LEADS[index]) {
        errors.push(`${label}.lead must be "${SSIp_LEADS[index]}"`);
      }
      if (!isNonEmptyString(bullet.text)) {
        errors.push(`${label}.text must be a non-empty string`);
      } else {
        const trimmed = bullet.text.trim();
        if (trimmed.length < 10 || trimmed.length > 320) {
          errors.push(`${label}.text must be 10-320 characters`);
        } else if (looksLikeMarkdown(trimmed)) {
          errors.push(`${label}.text must be plain text, not markdown`);
        }
      }
      if (!isPlainObject(bullet.ssiP)) {
        errors.push(`${label}.ssiP must be an object`);
      } else {
        for (const key of Object.keys(bullet.ssiP)) {
          if (!SSIp_FIELDS.includes(key)) {
            errors.push(`${label}.ssiP has unexpected field "${key}"`);
          }
        }
        for (const field of SSIp_FIELDS) {
          if (!isNonEmptyString(bullet.ssiP[field])) {
            errors.push(`${label}.ssiP.${field} must be a non-empty string`);
          } else if (bullet.ssiP[field].trim().length > 200) {
            errors.push(`${label}.ssiP.${field} must be at most 200 characters`);
          }
        }
      }
    });
    if (bullets.length === 3) {
      const leads = bullets.map((b) => (isPlainObject(b) ? b.lead : undefined));
      const allValid = leads.every((lead) => SSIp_LEADS.includes(lead));
      if (allValid && new Set(leads).size !== leads.length) {
        errors.push("bullets must use each of story, skills, impact exactly once");
      }
    }
  }

  const skills = data.skills;
  if (!Array.isArray(skills)) {
    errors.push("skills must be an array");
  } else {
    if (skills.length < 1 || skills.length > 12) {
      errors.push(`skills must contain 1-12 entries, got ${skills.length}`);
    }
    skills.forEach((skill, index) => {
      if (!isNonEmptyString(skill)) {
        errors.push(`skills[${index}] must be a non-empty string`);
      }
    });
  }

  for (const key of ["impactFraming", "positioningFraming", "coachingNote"]) {
    if (!isNonEmptyString(data[key])) {
      errors.push(`${key} must be a non-empty string`);
    } else if (data[key].trim().length > 200) {
      errors.push(`${key} must be at most 200 characters`);
    }
  }

  const missing = data.missingInformation;
  if (!Array.isArray(missing)) {
    errors.push("missingInformation must be an array");
  } else {
    if (missing.length > 4) {
      errors.push(`missingInformation must contain at most 4 entries, got ${missing.length}`);
    }
    missing.forEach((item, index) => {
      if (!isNonEmptyString(item)) {
        errors.push(`missingInformation[${index}] must be a non-empty string`);
      }
    });
  }

  return { ok: errors.length === 0, errors };
}
