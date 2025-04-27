import { LoginForm } from '@/components/login-form'
import { currentUser } from '@/utils/queries/users'
import { fetchUserProfile } from '@/utils/queries/profiles'
import { fetchUserOrders } from '@/utils/queries/orders'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ProfileForm } from './_components/profile-form'
import { OrderHistory } from './_components/order-history'
import { SecuritySettings } from './_components/security-settings'

export const metadata = {
  title: 'Account | Ink Art',
  description: 'Manage your account information, view order history, and update your profile.',
}

export default async function AccountPage() {
  // Get current user
  const user = await currentUser()

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] gap-6'>
        <h1 className='text-2xl font-bold'>Please login to view your account</h1>
        <LoginForm />
      </div>
    )
  }

  // Fetch user profile and orders
  const profilePromise = fetchUserProfile(user.id)
  const ordersPromise = fetchUserOrders(user.id)
  
  const [profile, orders] = await Promise.all([profilePromise, ordersPromise])

  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile, review order history, and update account settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <ProfileForm user={user} profile={profile} />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrderHistory orders={orders} />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings user={user} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
