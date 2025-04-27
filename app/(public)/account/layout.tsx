import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { currentUser } from '@/utils/queries/users'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Account | Ink Art',
  description: 'Manage your account settings, view order history, and update your profile.',
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated for any account page
  const user = await currentUser()
  
  if (!user) {
    // We'll let the child pages handle the unauthorized state
    // This gives them flexibility to render login forms or other content
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] gap-6'>
        <h1 className='text-2xl font-bold'>Please login to view your account</h1>
        <LoginForm />
      </div>
    )
      
  }
  
  return (
    <section className="min-h-screen bg-muted/20">
      {children}
    </section>
  )
}
