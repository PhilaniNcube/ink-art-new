import { createClient } from "../supabase/server"


export async function fetchAllOrders() {
    const supabase = await createClient()

    // write a query to get all orders from the orders table
    const { data, error } = await supabase.from("orders").select("*")

    if (error) {
        console.error("Error fetching all orders:", error)
        return null
    }

    return data
}

export async function fetchTotalRevenue() {

    const supabase = await createClient()

    // write a query to get the total revenue from the orders table
    const { data, error, count } = await supabase.from("orders").select("*")
   
    if (error) {
        console.error("Error fetching total revenue:", error)
        return null
    }



    return data
}


export async function fetchOrdersAnalytics() {

    const supabase = await createClient()
    
    const ordersCountData =  supabase.rpc('get_monthly_orders_count')
    const ordersRevenueData =  supabase.rpc('get_monthly_revenue')

    const [ordersCount, ordersRevenue] = await Promise.all([ordersCountData, ordersRevenueData])

    if (ordersCount.error) {
        console.error("Error fetching orders count:", ordersCount.error)
        return null
    }
    if (ordersRevenue.error) {
        console.error("Error fetching orders revenue:", ordersRevenue.error)
        return null
    }

    return {
        ordersCount: ordersCount.data[0],
        ordersRevenue: ordersRevenue.data[0],
    }


}


export async function fetchRecentOrders() {

    const supabase = await createClient()

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

    if (error) {
        console.error("Error fetching recent orders:", error)
        return null
    }

    return data

}

export async function fetchUserOrders(userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching user orders:", error)
        return null
    }

    return data
}
