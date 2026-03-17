import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Lab notes, essays, and technical writing from Stanley Amaechi on edge AI, distributed systems, federated learning, and the PhD journey.',
}

export default function BlogPage() {
  return <BlogClient />
}
