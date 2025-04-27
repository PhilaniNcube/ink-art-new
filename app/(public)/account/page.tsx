import { LoginForm } from '@/components/login-form'
import { currentUser } from '@/utils/queries/users'
import React from 'react'

const AccountPage = async () => {

  // get current user
  const user = await currentUser()

  if (!user) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>Please login to view your account</h1>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>AccountPage</div>
  )
}

export default AccountPage
