import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Open Source Projects',
  description: 'Open source projects from Cognitive Mesh Lab — Rust orchestration framework, edge AI tools, and distributed systems infrastructure.',
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
