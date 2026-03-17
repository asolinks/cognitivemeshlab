'use client'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: 80,
      padding: '48px 24px 32px',
      background: 'rgba(8,12,24,0.8)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(20,184,166,0.4)',
                  overflow: 'hidden', flexShrink: 0,
                }}>
                <img src="/logo.png" alt="Cognitive Mesh Lab"
                  style={{ width: 40, height: 40, objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)' }}>
                Cognitive Mesh Lab
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 240 }}>
              Emergent collective intelligence at the 5G edge. Research → Products → Community.
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
              Oulu, Finland 🇫🇮
            </p>
          </div>

          {/* Research */}
          <div>
            <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', marginBottom: 14, letterSpacing: '0.08em' }}>RESEARCH</p>
            {[
              ['PhD Proposal', '/research'],
              ['Publications', '/research#publications'],
              ['Open Source', '/projects'],
              ['Lab Notes', '/blog'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {label}
              </Link>
            ))}
          </div>

          {/* Lab */}
          <div>
            <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', marginBottom: 14, letterSpacing: '0.08em' }}>LAB & VENTURE</p>
            {[
              ['Vision & Roadmap', '/lab'],
              ['Products', '/lab#products'],
              ['Services', '/contact#services'],
              ['Toiminimi → Oy', '/lab#roadmap'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', marginBottom: 14, letterSpacing: '0.08em' }}>CONNECT</p>
            {[
              ['GitHub', 'https://github.com/cognitive-mesh-lab'],
              ['LinkedIn', 'https://www.linkedin.com/company/cognitive-mesh-lab'],
              ['Email', 'mailto:stanley@cognitivemeshlab.fi'],
              ['University of Oulu', 'https://www.oulu.fi/fi/yliopisto/tiedekunnat-ja-yksikot/tieto-ja-sahkotekniikan-tiedekunta/jokapaikan-tietotekniikka'],
            ].map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                rel="noopener noreferrer"
                style={{ display: 'block', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {label} {href.startsWith('http') ? '↗' : ''}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © {year} Stanley Ogechi Amaechi — Cognitive Mesh Lab (Toiminimi, Oulu)
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Rust', 'Next.js', 'University of Oulu'].map(t => (
              <span key={t} style={{
                fontSize: 11, fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)', letterSpacing: '0.05em',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
