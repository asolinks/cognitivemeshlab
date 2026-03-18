'use client'
import { useState } from 'react'

const services = [
  { id: 'consulting', label: 'AI Architecture Consulting' },
  { id: 'education', label: 'Technical Education / Workshop' },
  { id: 'research', label: 'Research Collaboration' },
  { id: 'opensource', label: 'Open Source / Development' },
  { id: 'phd', label: 'PhD / Academic Enquiry' },
  { id: 'other', label: 'Other' },
]

export default function ContactClient() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', org: '', service: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
      const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!SUPABASE_URL || !SUPABASE_KEY) {
        // No Supabase configured yet — save to localStorage as fallback
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]')
        submissions.push({ ...form, submitted_at: new Date().toISOString() })
        localStorage.setItem('contact_submissions', JSON.stringify(submissions))
        setSent(true)
        return
      }

      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organisation: form.org,
          topic: form.service,
          message: form.message,
        }),
      })

      if (!res.ok) throw new Error(`Error: ${res.status}`)
      setSent(true)

    } catch (err: any) {
      setError('Submission failed. Please email directly: stanley@cognitivemeshlab.fi')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: 8, padding: '12px 16px',
    color: 'var(--text-primary)', fontSize: 15,
    fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'border-color 0.2s',
  }
  const labelStyle = {
    display: 'block', fontSize: 13,
    color: 'var(--text-secondary)',
    fontWeight: 500 as const, marginBottom: 8,
  }

  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 64 }}>
        <span className="tag tag-blue" style={{ marginBottom: 16, display: 'inline-block' }}>Open to work</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Contact
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 580 }}>
          Available for consulting, research collaboration, workshops, and speaking.
          All work is invoiced through Cognitive Mesh Lab (Toiminimi, Oulu).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 20 }}>DIRECT CONTACT</p>
          {[
            { icon: '📧', label: 'Email', value: 'stanley@cognitivemeshlab.fi', href: 'mailto:stanley@cognitivemeshlab.fi' },
            { icon: '💼', label: 'LinkedIn', value: 'Cognitive Mesh Lab', href: 'https://www.linkedin.com/company/cognitive-mesh-lab' },
            { icon: '⚙️', label: 'GitHub', value: 'github.com/asolinks', href: 'https://github.com/asolinks' },
            { icon: '🎓', label: 'University', value: 'UBICOMP · University of Oulu', href: 'https://www.oulu.fi/fi/yliopisto/tiedekunnat-ja-yksikot/tieto-ja-sahkotekniikan-tiedekunta/jokapaikan-tietotekniikka' },
          ].map((c, i) => (
            <a key={i}
              href={c.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                marginBottom: 8, borderRadius: 10,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{c.label}</p>
                <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{c.value}</p>
              </div>
            </a>
          ))}

          <div style={{ marginTop: 32, padding: 20, background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Location:</strong> Oulu, Finland 🇫🇮<br />
              <strong style={{ color: 'var(--text-primary)' }}>Response time:</strong> Within 48 hours on weekdays.
            </p>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 20 }}>ENQUIRY FORM</p>

          {sent ? (
            <div style={{
              padding: 40, textAlign: 'center',
              background: 'rgba(20,184,166,0.08)',
              border: '1px solid rgba(20,184,166,0.3)',
              borderRadius: 16,
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)', marginBottom: 12 }}>Message sent</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Thanks for reaching out. I'll reply within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input type="text" required placeholder="Your name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" required placeholder="your@email.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Organisation / University</label>
                <input type="text" placeholder="Where are you writing from?"
                  value={form.org} onChange={e => setForm({ ...form, org: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
              </div>

              <div>
                <label style={labelStyle}>Topic *</label>
                <select required value={form.service}
                  onChange={e => {
                    const selected = services.find(s => s.id === e.target.value)
                    setForm({ ...form, service: selected ? selected.label : e.target.value })
                  }}
                  style={{ ...inputStyle, cursor: 'pointer', background: '#0d1225', color: '#e8ecf4', colorScheme: 'dark' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <option value="">Select a topic…</option>
                  {services.map(s => <option key={s.id} value={s.label}>{s.label}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea required rows={6}
                  placeholder="Tell me about your project, research idea, or question."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' as const, lineHeight: 1.6 }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
              </div>

              {error && (
                <div style={{ padding: '12px 16px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, fontSize: 14, color: '#fca5a5' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  By submitting you agree to be contacted about your enquiry.
                </p>
                <button type="submit" className="btn-primary" disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}>
                  {submitting ? 'Sending...' : 'Send message →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
