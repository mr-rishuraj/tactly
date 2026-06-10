import type { Goal, Tone, Platform, RewriteRequest } from './rewrite-types'

const goalDescriptions: Record<Goal, string> = {
  'network': 'build a genuine professional connection',
  'follow-up': 'follow up on a previous interaction without being pushy',
  'ask': 'ask a clear, specific question that earns a response',
  'persuade': 'persuade or influence with clarity and credibility',
  'close': 'move toward a concrete decision or next step',
  'apologize': 'apologize sincerely and rebuild trust',
}

const toneDescriptions: Record<Tone, string> = {
  'professional': 'polished, clear, and measured — appropriate for business communication',
  'founder': 'bold, direct, and visionary — confident without being arrogant, speaks with conviction',
  'student': 'curious, enthusiastic, and genuine — eager to learn, respectful of the other person\'s time',
  'friendly': 'warm, approachable, and personable — feels like a real person, not a template',
  'casual': 'relaxed and conversational — like talking to someone you already know',
  'confident': 'assertive and decisive — no hedging, no over-qualifying, clear and direct',
}

const platformInstructions: Record<Platform, string> = {
  'linkedin':
    'Platform: LinkedIn\nKeep it concise (under 300 characters for connection messages, under 500 for InMail). Focus on professional value and genuine interest. Be specific — no phrases like "I noticed your profile" or "I\'d love to pick your brain." Reference something real.',
  'gmail':
    'Platform: Email (Gmail)\nStructure it clearly with a natural greeting and closing if the tone calls for it. Can be slightly longer than other platforms. Good subject lines matter, but you\'re rewriting body text only.',
  'x':
    'Platform: X (Twitter)\nBe very brief — ideally under 200 characters. Punchy, direct, and natural. Think of how real people talk on the platform, not how brands post.',
  'whatsapp':
    'Platform: WhatsApp\nConversational and natural. Short and direct. No unnecessary formalities. Sound like a real person texting.',
  'unknown':
    'Platform: General web\nAdapt length and structure to what the message content suggests. Default to clarity and brevity.',
}

export function buildPrompt(input: RewriteRequest): { systemPrompt: string; userPrompt: string } {
  const { message, context, goal, tone, platform } = input

  const systemPrompt = `You are Tactly, an AI communication copilot. You help people communicate with greater clarity, confidence, and intent.

When rewriting messages, you:
- Sound human and authentic, never robotic or AI-generated
- Preserve the user's voice while improving their impact
- Cut filler words, vague language, and clichés ruthlessly
- Make every word earn its place
- Never add hollow pleasantries like "I hope this finds you well"
- Never use buzzwords unless they fit naturally

Return ONLY the rewritten message. No explanation, no label, no alternatives, no quotation marks around the output.

${platformInstructions[platform]}`

  const contextLine = context?.trim() ? `Context: ${context.trim()}\n` : ''

  const userPrompt = `Goal: ${goalDescriptions[goal]}
Tone: ${toneDescriptions[tone]}
${contextLine}
Original message:
${message}

Rewrite this message to better achieve the goal with the specified tone.`

  return { systemPrompt, userPrompt }
}
