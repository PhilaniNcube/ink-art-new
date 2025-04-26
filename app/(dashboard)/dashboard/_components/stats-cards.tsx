import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Package, DollarSignIcon } from "lucide-react"

type StatsCardProps = {
    revenueData: {
        ordersCount:{
            this_month_orders_count: number
            last_month_orders_count: number
        }
        ordersRevenue:{
            this_month_revenue: number
            last_month_revenue: number
        }
    }
}

export function StatsCards(props:StatsCardProps) {


    const { revenueData } = props

  // Sample data - in a real app, this would come from your database


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
     <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(revenueData.ordersRevenue.this_month_revenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {revenueData.ordersRevenue.this_month_revenue - revenueData.ordersRevenue.last_month_revenue < 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={revenueData.ordersRevenue.this_month_revenue - revenueData.ordersRevenue.last_month_revenue < 0 ? "text-green-500" : "text-red-500"}>{
                revenueData.ordersRevenue.this_month_revenue - revenueData.ordersRevenue.last_month_revenue > 0 ? '+' : '-'
                }
                {/* Calculate the percentage change between last month and this month */}
                {Math.abs(revenueData.ordersRevenue.this_month_revenue - revenueData.ordersRevenue.last_month_revenue) / revenueData.ordersRevenue.last_month_revenue * 100}%
                </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueData.ordersCount.this_month_orders_count}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {revenueData.ordersCount.this_month_orders_count - revenueData.ordersCount.last_month_orders_count < 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={revenueData.ordersCount.this_month_orders_count - revenueData.ordersCount.last_month_orders_count < 0 ? "text-green-500" : "text-red-500"}>{
                revenueData.ordersCount.this_month_orders_count - revenueData.ordersCount.last_month_orders_count > 0 ? '+' : '-'
                }
                {/* Calculate the percentage change between last month and this month */}
                {Math.abs(revenueData.ordersCount.this_month_orders_count - revenueData.ordersCount.last_month_orders_count) / revenueData.ordersCount.last_month_orders_count * 100}%
                </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
    </div>
  )
}
