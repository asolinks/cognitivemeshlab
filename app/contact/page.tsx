import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for AI consulting, research collaboration, workshops, or speaking engagements.',
}

export default function ContactPage() {
  return <ContactClient />
}
