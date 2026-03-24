import type { Metadata } from 'next'
import ResearchClient from './ResearchClient'

export const metadata: Metadata = {
  title: 'Research',
  description: 'PhD research on emergent collective intelligence, federated learning, multi-agent systems, and edge AI at the University of Oulu.',
}

export default function ResearchPage() {
  return <ResearchClient />
}
