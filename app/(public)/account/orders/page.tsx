import { redirect } from "next/navigation"
import { fetchUserOrders } from "@/utils/queries/orders"
import { currentUser } from "@/utils/queries/users"
import { OrderHistory } from "../_components/order-history"

export const metadata = {
  title: 'Order History | Ink Art',
  description: 'View your past orders and their status.',
}

export default async function OrdersPage() {
  // Get current user
  const user = await currentUser()

  if (!user) {
    redirect("/auth/login")
  }
  
  // Fetch user orders
  const orders = await fetchUserOrders(user.id)

  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your past orders.
        </p>
      </div>

      <OrderHistory orders={orders} />
    </div>
  )
}
