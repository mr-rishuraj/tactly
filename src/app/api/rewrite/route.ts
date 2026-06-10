import { NextRequest } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { buildPrompt } from '@/lib/prompts'
import type { RewriteRequest } from '@/lib/rewrite-types'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Tactly-Secret',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  // Shared secret: prevents direct API abuse without requiring user auth.
  // Set TACTLY_EXTENSION_SECRET in Vercel env vars.
  const secret = req.headers.get('x-tactly-secret')
  if (process.env.TACTLY_EXTENSION_SECRET && secret !== process.env.TACTLY_EXTENSION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS_HEADERS })
  }

  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: 'Server not configured' }, { status: 500, headers: CORS_HEADERS })
  }

  let body: RewriteRequest
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400, headers: CORS_HEADERS })
  }

  const { message, context, goal, tone, platform } = body

  if (!message?.trim()) {
    return Response.json({ error: 'Message is required' }, { status: 400, headers: CORS_HEADERS })
  }

  if (message.length > 2000) {
    return Response.json({ error: 'Message too long (max 2000 characters)' }, { status: 400, headers: CORS_HEADERS })
  }

  const { systemPrompt, userPrompt } = buildPrompt({ message, context, goal, tone, platform })
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  try {
    const geminiStream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
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
              // Emit in OpenAI-compatible SSE format so the extension parses it unchanged
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
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-store',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Gemini error:', error)
    return Response.json({ error: 'AI service error' }, { status: 502, headers: CORS_HEADERS })
  }
}
