import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import MaterialIcon from './MaterialIcon'

function renderMessageText(text) {
  const parts = text.split('\n\n')
  return parts.map((part) => <p key={part}>{part}</p>)
}

function AssistantChatPane({ messages: initialMessages }) {
  const [chatMessages, setChatMessages] = useState(initialMessages || [])
  const [inputText, setInputText] = useState('')
  const [knowledgeDoc, setKnowledgeDoc] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Document is fetched on-demand during send to ensure we have the latest

  const handleSend = async () => {
    if (!inputText.trim()) return

    const userMsg = {
      role: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText.trim(),
    }

    setChatMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsProcessing(true)

    // Fetch the latest document dynamically
    const { data } = await supabase.from('documents').select('*').order('uploaded_at', { ascending: false }).limit(1)
    const activeDoc = data && data.length > 0 ? data[0] : null
    setKnowledgeDoc(activeDoc)

    setTimeout(() => {
      let responseText = "I couldn't find an exact answer in the uploaded document. Please check with HR directly."

      if (activeDoc && activeDoc.content) {
        // filter out common stopwords to make our basic search more robust
        const stopWords = ['what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how', 'this', 'that', 'with', 'from', 'have', 'does']
        const words = userMsg.text.toLowerCase().split(' ')
          .map(w => w.replace(/[^a-z0-9]/g, ''))
          .filter((w) => w.length > 3 && !stopWords.includes(w))

        if (words.length > 0) {
          const sentences = activeDoc.content.split('. ')
          
          let bestMatch = null
          let highestScore = 0
          
          sentences.forEach(s => {
            const lowerS = s.toLowerCase()
            const score = words.filter(w => lowerS.includes(w)).length
            // Give preference to sentences that contain at least a significant overlap
            if (score > highestScore) {
              highestScore = score
              bestMatch = s
            }
          })

          if (bestMatch && highestScore > 0) {
            let matchedText = bestMatch.trim()
            // If the text contains " A:" or " Answer:" (or Q&A format), extract only the answer portion
            const regex = /(?:A:|Answer:)\s*(.*)/i
            const extracted = matchedText.match(regex)
            
            if (extracted && extracted[1]) {
              matchedText = extracted[1].trim()
            }
            
            responseText = matchedText + (matchedText.endsWith('.') ? '' : '.')
          }
        }
      }

      const botMsg = {
        role: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseText,
      }

      setChatMessages((prev) => [...prev, botMsg])
      setIsProcessing(false)
    }, 1200)
  }

  return (
    <section className="relative flex min-h-[720px] flex-1 flex-col overflow-hidden bg-surface">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-blue-200">
            <MaterialIcon className="[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24] text-xl" name="smart_toy" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold">Benefits Enrollment AI</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed" />
              <span className="text-xs font-medium text-on-surface-variant">
                Assistant is online and processing
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
          AI can make mistakes. Please verify important HR information.
        </p>
      </div>
    </section>
  )
}

export default AssistantChatPane
