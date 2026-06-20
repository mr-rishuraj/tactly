import { NextRequest } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { buildPrompt } from '@/lib/prompts'
import type { RewriteRequest } from '@/lib/rewrite-types'

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: 'Server not configured' }, { status: 500 })
  }

  let body: RewriteRequest
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { message, context, goal, tone, platform } = body

  if (!message?.trim()) {
    return Response.json({ error: 'Message is required' }, { status: 400 })
  }

  if (message.length > 2000) {
    return Response.json({ error: 'Message too long (max 2000 characters)' }, { status: 400 })
  }

  const { systemPrompt, userPrompt } = buildPrompt({ message, context, goal, tone, platform })
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  try {
    const geminiStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 600,
        temperature: 0.7,
      },
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const chunk of geminiStream) {
            const text = chunk.text
            if (text) {
              const data = JSON.stringify({ choices: [{ delta: { content: text }, index: 0 }] })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-store',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Gemini error:', msg)
    return Response.json({ error: 'AI service error', detail: msg }, { status: 502 })
  }
}
