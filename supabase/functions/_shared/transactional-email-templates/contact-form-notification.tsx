import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Words of Life'

interface ContactFormNotificationProps {
  name?: string
  email?: string
  message?: string
}

const ContactFormNotificationEmail = ({
  name,
  email,
  message,
}: ContactFormNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New message from {name || 'a visitor'} on {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form message</Heading>
        <Text style={text}>
          Someone just reached out through {SITE_NAME}.
        </Text>
        <Section style={card}>
          <Text style={label}>From</Text>
          <Text style={value}>{name || 'Anonymous'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Hr style={hr} />
          <Text style={label}>Message</Text>
          <Text style={messageStyle}>{message || '—'}</Text>
        </Section>
        <Text style={footer}>
          Reply directly to this email to respond to {name || 'them'}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactFormNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New message from ${data?.name || 'a visitor'} — ${SITE_NAME}`,
  to: 'funkegoodvibe@gmail.com',
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hi! I love the daily affirmations. Keep up the great work.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}
const container = { padding: '32px 24px', maxWidth: '560px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 600,
  color: '#111111',
  margin: '0 0 16px',
}
const text = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.6',
  margin: '0 0 20px',
}
const card = {
  backgroundColor: '#f7f7f5',
  borderRadius: '12px',
  padding: '20px 22px',
  margin: '0 0 24px',
}
const label = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#8a8a8a',
  margin: '12px 0 4px',
}
const value = {
  fontSize: '14px',
  color: '#111111',
  margin: '0',
}
const messageStyle = {
  fontSize: '14px',
  color: '#222222',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const footer = {
  fontSize: '12px',
  color: '#999999',
  margin: '24px 0 0',
  fontStyle: 'italic' as const,
}
