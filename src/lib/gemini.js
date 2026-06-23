const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

/**
 * Call Gemini API with a prompt and optional document context.
 * Returns the text response or a fallback message on error.
 */
export async function askGemini(userMessage, documentContext = null, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    return "AI assistant is not configured. Please add a VITE_GEMINI_API_KEY to your .env.local file."
  }

  const systemInstruction = `You are an HR onboarding assistant for Stitch, an HR Intelligence Platform. You help employees with benefits enrollment, onboarding tasks, company policies, and general HR questions. Be helpful, professional, and concise. If you have document context provided, use it to answer questions accurately. If you don't know the answer, say so honestly and suggest contacting HR directly.`

  const contents = []

  // Add conversation history for context (last 10 messages)
  const recentHistory = conversationHistory.slice(-10)
  for (const msg of recentHistory) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    })
  }

  // Build the current user message with document context
  let currentPrompt = userMessage
  if (documentContext) {
    currentPrompt = `Context from uploaded HR document:\n---\n${documentContext.slice(0, 8000)}\n---\n\nUser question: ${userMessage}`
  }

  contents.push({
    role: 'user',
    parts: [{ text: currentPrompt }],
  })

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      console.error('Gemini API error:', errData)
      throw new Error(errData?.error?.message || `API returned ${response.status}`)
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new Error('No response text from Gemini')
    }

    return text
  } catch (err) {
    console.error('Gemini API call failed:', err)
    return `I'm having trouble connecting to the AI service right now. Error: ${err.message}. Please try again in a moment.`
  }
}
