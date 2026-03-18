import { fetchAllOrders } from '@/utils/queries/orders';
import { OrdersTable } from './orders-table';

const DashboardOrders = async () => {

    const orders = await fetchAllOrders();

    if (!orders) {
        return <div>No orders found.</div>;
    }

  return (
    <OrdersTable data={orders!} />
  )
}

export default DashboardOrders