import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MeshCanvas from '@/components/MeshCanvas'

export const metadata: Metadata = {
  title: {
    default: 'Cognitive Mesh Lab — Stanley Amaechi',
    template: '%s | Cognitive Mesh Lab',
  },
  description: 'AI researcher, distributed systems engineer, and founder building emergent collective intelligence at the 5G edge. Prospective PhD applicant at University of Oulu.',
  keywords: ['Cognitive Mesh', 'Edge AI', 'Federated Learning', 'Multi-agent Systems', '5G', 'Distributed Intelligence', 'Stanley Amaechi'],
  authors: [{ name: 'Stanley Ogechi Amaechi' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_FI',
    url: 'https://cognitivemeshlab.fi',
    siteName: 'Cognitive Mesh Lab',
    title: 'Cognitive Mesh Lab — Stanley Amaechi',
    description: 'Emergent collective intelligence at the 5G edge.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognitive Mesh Lab',
    description: 'Emergent collective intelligence at the 5G edge.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080c18" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>
        <MeshCanvas />
        <div className="page-content">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
