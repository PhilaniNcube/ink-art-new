'use client'

import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return <Button size='icon' onClick={logout} variant='outline' className="rounded-full border-collapse border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600">

    <LogOut className="" />
  </Button>
}
