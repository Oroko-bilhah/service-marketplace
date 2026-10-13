import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { services } from "../data/services"
import SiteNavbar from "../components/SiteNavbar"

function readConversations() {
  try {
    return JSON.parse(localStorage.getItem("market-inbox") || "[]")
  } catch {
    return []
  }
}

function Inbox() {
  const [searchParams] = useSearchParams()
  const serviceId = Number(searchParams.get("serviceId"))
  const requestedService = services.find((service) => service.id === serviceId)
  const [conversations, setConversations] = useState(readConversations)
  const [activeId, setActiveId] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!requestedService) return

    const conversationId = String(requestedService.id)
    setConversations((current) => {
      const exists = current.some((conversation) => conversation.id === conversationId)
      if (exists) return current

      const next = [{
        id: conversationId,
        serviceId: requestedService.id,
        serviceTitle: requestedService.title,
        provider: requestedService.provider,
        messages: [],
      }, ...current]

      localStorage.setItem("market-inbox", JSON.stringify(next))
      return next
    })

    setActiveId(conversationId)
  }, [requestedService])

  useEffect(() => {
    if (!activeId && conversations.length) {
      setActiveId(String(conversations[0].id))
    }
  }, [conversations, activeId])

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId) || null,
    [conversations, activeId],
  )

  function sendMessage(event) {
    event.preventDefault()
    const text = message.trim()
    if (!text || !activeConversation) return

    const next = conversations.map((conversation) => conversation.id === activeConversation.id
      ? { ...conversation, messages: [...conversation.messages, { sender: "customer", text, sentAt: new Date().toISOString() }] }
      : conversation)

    setConversations(next)
    localStorage.setItem("market-inbox", JSON.stringify(next))
    setMessage("")
  }

  return (
    <main className="inbox-page">
      <SiteNavbar />

      <header className="inbox-header">
        <p className="eyebrow">MESSAGES</p>
        <h1>Your inbox</h1>
        <p>Contact providers about their services and keep your conversations together in one place.</p>
      </header>

      <section className="inbox-layout">
        <aside className="conversation-list" aria-label="Conversations">
          <div className="conversation-toolbar">
            <h2>Conversations</h2>
            <span>{conversations.length}</span>
          </div>

          {conversations.length ? conversations.map((conversation) => {
            const latestMessage = conversation.messages.at(-1)
            return (
              <button
                key={conversation.id}
                type="button"
                className={`conversation-item${activeId === conversation.id ? " active" : ""}`}
                onClick={() => setActiveId(conversation.id)}
              >
                <strong>{conversation.provider}</strong>
                <span>{conversation.serviceTitle}</span>
                <small>{latestMessage?.text || "Start a conversation"}</small>
              </button>
            )
          }) : (
            <p className="empty-inbox">No conversations yet. Open a service to message its provider.</p>
          )}
        </aside>

        <section className="chat-panel" aria-live="polite">
          {activeConversation ? (
            <>
              <header className="chat-heading">
                <div>
                  <h2>{activeConversation.provider}</h2>
                  <p>About {activeConversation.serviceTitle}</p>
                </div>
                <Link to={`/service/${activeConversation.serviceId}`}>View service</Link>
              </header>

              <div className="chat-messages">
                {activeConversation.messages.length ? (
                  activeConversation.messages.map((item, index) => (
                    <article className={`chat-message ${item.sender}`} key={`${item.sentAt}-${index}`}>
                      <p>{item.text}</p>
                      <time>{new Date(item.sentAt).toLocaleString()}</time>
                    </article>
                  ))
                ) : (
                  <p className="chat-empty">
                    Send a message to start talking with {activeConversation.provider} about this service.
                  </p>
                )}
              </div>

              <form className="message-form" onSubmit={sendMessage}>
                <label className="visually-hidden" htmlFor="message-input">Message to provider</label>
                <textarea
                  id="message-input"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a message..."
                  rows={2}
                  maxLength={2000}
                  required
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="chat-placeholder">
              <h2>Select a conversation</h2>
              <p>Choose a provider conversation or browse services to start a new one.</p>
              <Link to="/services">Browse services</Link>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default Inbox
