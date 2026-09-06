RESUME BULLET GENERATOR — METHODOLOGY SUMMARY

GOAL
Build a single-screen AI web tool that takes a messy, casual description of something a person did at work and turns it into 3 polished, targeted resume bullets.

The tool should not simply rewrite the user's sentence. It should identify the user's actual contribution, skills, scope, impact, and relevance to their target role, then frame that experience professionally.

CORE PRINCIPLE
A resume should communicate:
- What you did
- How you did it
- Why it mattered
- What impact/result it created
- What skills it demonstrates
- Why the experience is relevant to where you want to go next

Avoid writing bullets like a job description that only lists responsibilities. Focus on accomplishments, impact, outcomes, scope, scale, and transferable skills.

INPUT
User provides a messy everyday description such as:

"I was working at a coffee shop and during busy shifts I handled customer orders, trained new people, and helped when we opened another location."

The user should not need to know resume-writing terminology.

OPTIONAL CONTEXT
To make the output more targeted, the tool can optionally ask for:
- Target job title
- Target industry
- Job description
- Years of experience

The system should use the target role to determine which parts of the user's experience should be emphasized. The resume should focus on where the person is going, not simply where they have been.

PROCESS

1. UNDERSTAND THE EXPERIENCE
Extract:
- Task/action performed
- Challenge or situation
- Responsibility/scope
- People or teams involved
- Tools/technical skills
- Soft skills
- Frequency/volume
- Result/outcome
- Recognition or trust received

2. FIND IMPACT
Look for measurable information wherever possible:
- Numbers
- Percentages
- Revenue
- Cost savings
- Time saved
- Volume
- Frequency
- Team size
- Customers/users
- Projects
- Deadlines
- Growth
- Before vs. after comparisons

If the user doesn't provide a number, NEVER invent one.

Instead, ask whether there is a real metric available or use qualitative evidence of impact.

Useful prompts for discovering hidden metrics:
- How much?
- How many?
- How often?
- How large was the project?
- How frequently did you do this?
- Were you the person others relied on?
- Did your manager specifically choose you?
- Did you receive praise or recognition?
- Did you solve a problem others couldn't?
- Did you improve a process?
- Did you help achieve a goal?

These questions are based directly on the methodology in the transcript.

3. IDENTIFY TRANSFERABLE SKILLS
The system should recognize skills that can transfer between jobs and industries.

Examples:
- Leadership
- Communication
- Problem solving
- Time management
- Team collaboration
- Training
- Project management
- Stakeholder management
- Data analysis
- Organization
- Adaptability
- Process improvement
- Public speaking

Transferable skills are especially important when someone is changing careers or doesn't perfectly match the requirements of a target role.

4. APPLY CAR / TAB LOGIC

CAR:
Challenge → Action → Result

TAB:
Task → Action/Benefit

The exact formula does not have to be visible in the final bullet. It is an internal writing framework.

Every bullet should communicate the action AND why it mattered, rather than simply describing the responsibility.

5. POSITION THE USER
The system should elevate ordinary work into professionally meaningful experience without exaggerating it.

Example:

RAW:
"Trained new employees at the coffee shop."

WEAK:
"Responsible for training new employees."

BETTER:
"Selected to lead new-hire training during expansion, helping establish consistent operating practices across locations."

The positioning should reveal:
- Trust
- Ownership
- Expertise
- Leadership
- Scale
- Potential
- Transferable skills

Even when there is no numerical metric, strong positioning and language can communicate impact.

OUTPUT
Generate exactly 3 resume bullets.

Each bullet should contain, implicitly or explicitly:

1. STORY / CONTEXT
What situation or challenge existed?

2. ACTION / SKILL
What did the person actually do and what skills did they demonstrate?

3. IMPACT / RESULT
What changed, improved, or was accomplished?

4. POSITIONING
Why does this demonstrate value for the target role?

The three bullets should ideally highlight different dimensions of the same experience rather than repeating the same sentence three times.

For example:
- Bullet 1 → scale/operational impact
- Bullet 2 → leadership/training
- Bullet 3 → problem solving/process improvement

QUALITY RULES
- Never invent metrics.
- Never exaggerate responsibilities.
- Never turn assumptions into facts.
- Use numbers only when supplied or confirmed.
- Prefer accomplishments over responsibilities.
- Use strong action verbs.
- Keep bullets concise and executive-ready.
- Include relevant keywords naturally.
- Prioritize the target role.
- Preserve the user's actual experience.
- Avoid generic corporate fluff.
- Do not force a metric when none exists.
- If no numerical metric exists, communicate qualitative impact through strong positioning.

TARGETING / MARKET RESEARCH
The broader methodology recommends knowing the target role, understanding the professional brand, and researching the market.

For a more advanced version of the product, the user could paste a job description. The system can then identify:
- Repeated skills
- Required qualifications
- Certifications
- Important keywords
- Responsibilities
- Transferable skills

Those keywords can influence how the bullets are framed.

ATS CONSIDERATION
The resume should remain readable by both humans and applicant tracking systems.

Important information to naturally surface includes:
- Target job title
- Relevant skills
- Job-related keywords
- Experience
- Education/certifications where relevant

The transcript explains that ATS systems can parse information such as job titles, dates, locations, education, and keywords, and some systems rank candidates against criteria.

PRODUCT CONCEPT

SCREEN 1:
Headline:
"Turn the work you actually do into resume bullets."

Subtitle:
"Describe what you did. We'll uncover the impact, skills, and story behind it."

Input:
Large textarea:
"Tell me what you did at work — messy is fine."

Optional:
Target role
Job description

Button:
"Generate 3 Resume Bullets"

OUTPUT CARD:
3 polished bullets with:
- Copy button
- Regenerate button
- "Why this works" expandable explanation
- Skills detected
- Impact detected
- Missing information suggestions

IMPORTANT DIFFERENTIATOR
The tool should not behave like a generic AI resume rewriter.

It should behave like a career coach analyzing the user's experience:

RAW EXPERIENCE
↓
Extract hidden value
↓
Identify skills
↓
Find scope / scale / impact
↓
Apply CAR/TAB logic
↓
Connect experience to target role
↓
Position professionally
↓
Generate 3 executive-ready bullets

CORE PROMPT LOGIC

"You are a professional resume strategist.

Take the user's messy description of work they performed and transform it into three concise, achievement-oriented resume bullets.

First identify the situation, action, skills, scope, scale, and result.

Prioritize measurable impact when the user provides legitimate metrics. Never invent numbers.

If no numerical metric exists, use qualitative evidence of impact, ownership, trust, expertise, problem solving, leadership, or business value.

Use Challenge → Action → Result and Task → Action → Benefit reasoning internally.

Focus on transferable skills and relevance to the user's target role.

Do not simply rewrite responsibilities. Position the experience around what the person accomplished and why it mattered.

Keep every statement truthful and grounded in the user's input.

Return exactly three polished resume bullets."