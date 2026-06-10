export type Goal = 'network' | 'follow-up' | 'ask' | 'persuade' | 'close' | 'apologize'
export type Tone = 'professional' | 'founder' | 'student' | 'friendly' | 'casual' | 'confident'
export type Platform = 'linkedin' | 'gmail' | 'x' | 'whatsapp' | 'unknown'

export interface RewriteRequest {
  message: string
  context?: string
  goal: Goal
  tone: Tone
  platform: Platform
}
