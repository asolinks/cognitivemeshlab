'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',         label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/lab',      label: 'Lab' },
  { href: '/learn',    label: 'Learn' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const navBg = scrolled
    ? 'rgba(6,9,18,0.95)'
    : 'rgba(8,12,24,0.6)'

  const navBorder = scrolled
    ? '0 0 0 rgba(0,0,0,0)'
    : '0 4px 24px rgba(0,0,0,0.4)'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '0' : '12px 24px',
      transition: 'padding 0.35s ease',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        height: scrolled ? 62 : 68,
        padding: '0 16px',
        transition: 'all 0.35s ease',
        background: navBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: scrolled ? 0 : 16,
        border: scrolled
          ? 'none'
          : '1px solid rgba(90,110,245,0.18)',
        borderBottom: scrolled
          ? '1px solid rgba(90,110,245,0.1)'
          : undefined,
        boxShadow: navBorder,
      }}>

        {/* ── LEFT: Logo + Name ──────────────────────────────── */}
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          justifySelf: 'start',
        }}>
          {/* Logo circle */}
          <div style={{
            width: 50, height: 50,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #0a1a2e 0%, #000 100%)',
            border: '2px solid rgba(20,184,166,0.6)',
            overflow: 'hidden',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/logo.png"
              alt="Cognitive Mesh Lab"
              style={{ width: 50, height: 50, objectFit: 'contain' }}
            />
          </div>

          {/* Name + location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14px, 3.5vw, 20px)',
              fontWeight: 600,
              color: '#e8ecf4',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>
              Cognitive Mesh Lab
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: '#14b8a6',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: '#14b8a6',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
              }}>
                Oulu · Finland
              </span>
            </div>
          </div>
        </Link>

        {/* ── CENTRE: Nav links ──────────────────────────────── */}
        <div
          className="cm-desktop-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifySelf: 'center',
          }}
        >
          {links.map(l => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap' as const,
                  color: active ? '#b4beff' : '#8892aa',
                  background: active ? 'rgba(90,110,245,0.1)' : 'transparent',
                  borderBottom: `2px solid ${active ? '#5a6ef5' : 'transparent'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* ── RIGHT: CTA ─────────────────────────────────────── */}
        <div style={{
          justifySelf: 'end',
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="cm-desktop-links"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '9px 20px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em',
              background: 'linear-gradient(135deg, #5a6ef5 0%, #3d4ee8 100%)',
              color: 'white',
              border: '1px solid rgba(90,110,245,0.5)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap' as const,
            }}
          >
            Hire / Collaborate
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="cm-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(90,110,245,0.25)',
              borderRadius: 9,
              cursor: 'pointer',
              color: '#e8ecf4',
              width: 42, height: 42,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: 0,
            }}
          >
            <span style={{
              display: 'block', width: 18, height: 2,
              background: '#8892aa', borderRadius: 2,
              transition: 'all 0.25s',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 18, height: 2,
              background: '#8892aa', borderRadius: 2,
              transition: 'all 0.25s',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 18, height: 2,
              background: '#8892aa', borderRadius: 2,
              transition: 'all 0.25s',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu dropdown ────────────────────────────── */}
      {open && (
        <div style={{
          maxWidth: 1200,
          margin: '6px auto 0',
          padding: '0 24px',
        }}>
          <div style={{
            background: 'rgba(6,9,18,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(90,110,245,0.18)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          }}>
            {/* Mobile status bar */}
            <div style={{
              padding: '14px 20px 12px',
              borderBottom: '1px solid rgba(90,110,245,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#14b8a6', display: 'inline-block',
              }} />
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-mono)',
                color: '#14b8a6', letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
              }}>
                Cognitive Mesh Lab · Oulu, Finland
              </span>
            </div>

            {/* Mobile links */}
            <div style={{ padding: '8px 8px' }}>
              {links.map(l => {
                const active = isActive(l.href)
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '13px 20px',
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 500,
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      color: active ? '#7c95fa' : '#8892aa',
                      background: active ? 'rgba(90,110,245,0.08)' : 'transparent',
                      borderLeft: `2px solid ${active ? '#5a6ef5' : 'transparent'}`,
                      paddingLeft: active ? '18px' : '20px',
                    }}
                  >
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: active ? '#5a6ef5' : 'rgba(255,255,255,0.2)',
                      flexShrink: 0,
                    }} />
                    {l.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile CTA */}
            <div style={{ padding: '0 12px 14px' }}>
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  background: 'linear-gradient(135deg, #5a6ef5, #3d4ee8)',
                  color: 'white',
                  letterSpacing: '0.02em',
                }}
              >
                Hire / Collaborate
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
