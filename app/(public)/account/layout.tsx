import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account | Ink Art',
  description: 'Manage your account settings, view order history, and update your profile.',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-muted/20">
      {children}
    </section>
  )
}
