import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { resumeBulletsJsonSchema, validateResumeBullets } from "@/lib/schema";

const FIELD_LIMITS = {
  workDescription: 4000,
  currentJobTitle: 120,
  industry: 100,
  targetRole: 120,
  targetJobDescription: 20000,
};

function readField(key, body) {
  const value = body[key];
  if (value === undefined || value === null) return { value: null, error: null };
  if (typeof value !== "string") {
    return { value: null, error: `"${key}" must be a string.` };
  }
  const trimmed = value.trim();
  if (trimmed.length > FIELD_LIMITS[key]) {
    return { value: null, error: `"${key}" is too long (max ${FIELD_LIMITS[key]} characters).` };
  }
  return { value: trimmed.length > 0 ? trimmed : null, error: null };
}

function buildUserContext(fields) {
  const parts = [`workDescription:\n${fields.workDescription}`];
  if (fields.currentJobTitle) parts.push(`currentJobTitle: ${fields.currentJobTitle}`);
  if (fields.industry) parts.push(`industry: ${fields.industry}`);
  if (fields.targetRole) parts.push(`targetRole: ${fields.targetRole}`);
  if (fields.targetJobDescription) {
    parts.push(`targetJobDescription:\n${fields.targetJobDescription}`);
  }
  return parts.join("\n\n");
}

function parseModelJson(text) {
  if (typeof text !== "string") return null;
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const fields = {};
  const issues = [];
  for (const key of Object.keys(FIELD_LIMITS)) {
    const { value, error } = readField(key, body);
    if (error) issues.push(error);
    else fields[key] = value;
  }
  if (!fields.workDescription) {
    issues.push('A work description is required — tell me what you did, even one sentence is fine.');
  }
  if (issues.length > 0) {
    return NextResponse.json({ error: issues[0], issues }, { status: 400 });
  }

  if (!process.env.AI_API_KEY) {
    return NextResponse.json(
      { error: "The AI service is not configured on the server." },
      { status: 500 }
    );
  }

  const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

  let result;
  try {
    result = await ai.models.generateContent({
      model: process.env.AI_MODEL || "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: buildUserContext(fields) }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        responseMimeType: "application/json",
        responseSchema: resumeBulletsJsonSchema,
      },
    });
  } catch (err) {
    const status = String(err?.code ?? err?.status ?? "");
    if (status === "429" || status === "RESOURCE_EXHAUSTED") {
      return NextResponse.json(
        { error: "The AI service is busy right now. Please try again in a few seconds." },
        { status: 429 }
      );
    }
    if (status === "401" || status === "403" || status === "PERMISSION_DENIED") {
      return NextResponse.json(
        { error: "The AI service credentials were rejected. Check the server configuration." },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong while generating your bullets. Please try again." },
      { status: 502 }
    );
  }

  const data = parseModelJson(result.text);
  const validation = data ? validateResumeBullets(data) : { ok: false, errors: ["empty model response"] };

  if (!validation.ok) {
    return NextResponse.json(
      { error: "The model returned an unexpected format. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json(data);
}
