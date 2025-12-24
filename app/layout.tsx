import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Action Engine',
  description: 'Execute tasks, automate workflows, and extend your reach',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
