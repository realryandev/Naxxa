import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Naxxa',
  description: 'Made with luv by Ryan for Naxxa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>{children}</body>
    </html>
  )
}
