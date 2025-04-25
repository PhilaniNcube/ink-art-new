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

  return <Button size='icon' onClick={logout} variant='outline' className="w-full hover:bg-red-500 hover:text-white">
    <LogOut className="h-4 w-4" />
    <span className="">Logout</span>
  </Button>
}
