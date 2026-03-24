import type { Metadata } from 'next'
import AnalyseClient from './AnalyseClient'

export const metadata: Metadata = {
  title: 'MeshNode — AI Business Analysis',
  description: 'Free AI opportunity analysis for Oulu SMEs. Answer 6 questions tailored to your exact business type and get a personalised report within 24 hours.',
  openGraph: {
    title: 'Is your Oulu business leaving money on the table?',
    description: 'Free AI analysis personalised to your business. First 5 get a free on-site MeshAudit.',
    url: 'https://cognitivemeshlab.fi/analyse',
  },
}

// Layout (Navbar, Footer, MeshCanvas) is inherited automatically from
// app/layout.tsx — nothing to import or duplicate here.
export default function AnalysePage() {
  return <AnalyseClient />
}
