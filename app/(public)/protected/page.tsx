import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/utils/supabase/server'


const ProtectedContent = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{data.user.email}</span>
      </p>
      <LogoutButton />
    </div>
  )
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div className="flex h-svh w-full items-center justify-center">Loading account...</div>}>
      <ProtectedContent />
    </Suspense>
  )
}
