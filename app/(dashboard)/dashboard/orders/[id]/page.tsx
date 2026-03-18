import React, { Suspense } from "react";
import OrderDetails from "../../_components/order-details";

const OrdersPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrderDetails paramsPromise={params} />
      </Suspense>
    </div>
  );
};

export default OrdersPage;
