import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { askGemini } from '../lib/gemini'
import MaterialIcon from './MaterialIcon'

function renderMessageText(text) {
  const parts = text.split('\n\n')
  return parts.map((part, i) => <p key={i}>{part}</p>)
}

function AssistantChatPane({ messages: initialMessages }) {
  const [chatMessages, setChatMessages] = useState(initialMessages || [])
  const [inputText, setInputText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSend = async () => {
    if (!inputText.trim() || isProcessing) return

    const userMsg = {
      role: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText.trim(),
    }

    setChatMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsProcessing(true)

    try {
      // Fetch the latest document for context (non-blocking if it fails)
      let docContent = null
      try {
        const { data } = await supabase
          .from('documents')
          .select('content')
          .order('uploaded_at', { ascending: false })
          .limit(1)
        if (data && data.length > 0 && data[0].content) {
          docContent = data[0].content
        }
      } catch {
        // No document context available — that's fine
      }

      // Call Gemini with conversation history
      const responseText = await askGemini(
        userMsg.text,
        docContent,
        chatMessages.filter((m) => m.role === 'user' || m.role === 'assistant'),
      )

      const botMsg = {
        role: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseText,
      }

      setChatMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
      }
      setChatMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section className="relative flex min-h-[720px] flex-1 flex-col overflow-hidden bg-surface">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-blue-200">
            <MaterialIcon className="[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24] text-xl" name="smart_toy" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold">HR Onboarding AI</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed" />
              <span className="text-xs font-medium text-on-surface-variant">
                Powered by Gemini
              </span>
            </div>
          </div>
        </div>

        <button className="rounded-full bg-surface-container-low p-2 text-on-surface-variant transition hover:text-on-surface" type="button">
          <MaterialIcon name="more_vert" />
        </button>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto p-8">
        <div className="flex justify-center">
          <span className="rounded-full bg-surface-container-low px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Today
          </span>
        </div>

        {chatMessages.map((message, index) => (
          <div
            className={`flex gap-4 ${message.role === 'user' ? 'ml-auto max-w-2xl flex-row-reverse' : 'max-w-2xl'}`}
            key={`${message.role}-${message.time}-${index}`}
          >
            <div
              className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                message.role === 'assistant'
                  ? 'bg-primary-container text-white'
                  : 'bg-surface-container-highest text-on-surface'
              }`}
            >
              <MaterialIcon
                className={message.role === 'assistant' ? "[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24] text-xs" : 'text-xs'}
                name={message.role === 'assistant' ? 'smart_toy' : 'person'}
              />
            </div>

            <div className={`space-y-3 ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
              <div
                className={`max-w-md space-y-4 rounded-[22px] p-5 text-sm leading-7 shadow-sm ${
                  message.role === 'assistant'
                    ? 'rounded-tl-none border-l-4 border-primary bg-surface-container-lowest text-on-surface'
                    : 'rounded-tr-none bg-gradient-to-br from-primary to-primary-container text-white shadow-md'
                }`}
              >
                {renderMessageText(message.text)}
              </div>

              {message.summary ? (
                <div className="flex items-start gap-4 rounded-xl border border-secondary-fixed-dim/30 bg-secondary-fixed/20 p-4">
                  <div className="rounded-lg bg-secondary-fixed p-2 text-on-secondary-container">
                    <MaterialIcon className="text-sm" name="analytics" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-on-secondary-fixed">
                      AI Summary
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {message.summary.map((entry) => (
                        <div className="rounded-lg bg-white/60 p-2" key={entry.label}>
                          <p className="text-[10px] text-on-surface-variant">{entry.label}</p>
                          <p className="text-sm font-bold">{entry.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <span className={`text-[10px] font-medium text-on-surface-variant ${message.role === 'user' ? 'mr-1' : 'ml-1'}`}>
                {message.time}
              </span>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex max-w-2xl gap-4">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-container/30 text-primary">
              <MaterialIcon className="[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24] text-xs" name="smart_toy" />
            </div>
            <div className="flex h-8 items-center gap-1 rounded-full bg-surface-container-low px-4 py-2">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-outline" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-outline [animation-delay:0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-outline [animation-delay:0.2s]" />
            </div>
          </div>
        )}
      </div>

      <div className="px-8 pb-8 pt-4">
        <div className="rounded-xl bg-surface-container-low p-2 shadow-inner focus-within:ring-2 focus-within:ring-primary/20">
          <textarea
            className="min-h-[56px] w-full resize-none border-none bg-transparent px-4 pt-4 text-sm outline-none focus:ring-0"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask anything about your onboarding..."
            rows="1"
            value={inputText}
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1">
              {['attach_file', 'mood', 'mic'].map((icon) => (
                <button
                  className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container-high"
                  key={icon}
                  type="button"
                >
                  <MaterialIcon className="text-xl" name={icon} />
                </button>
              ))}
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-2 text-sm font-bold text-white transition hover:opacity-95 disabled:opacity-50"
              disabled={isProcessing}
              onClick={handleSend}
              type="button"
            >
              <span>Send</span>
              <MaterialIcon className="text-sm" name="send" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] font-medium text-on-surface-variant">
          Powered by Google Gemini · AI can make mistakes
        </p>
      </div>
    </section>
  )
}

export default AssistantChatPane
