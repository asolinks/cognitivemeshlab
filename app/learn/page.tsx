import type { Metadata } from 'next'
import LearnClient from './LearnClient'

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Tutorials on edge AI, federated learning, distributed systems, Rust, and multi-agent systems — from fundamentals to Cognitive Mesh architecture.',
}

export default function LearnPage() {
  return <LearnClient />
}
