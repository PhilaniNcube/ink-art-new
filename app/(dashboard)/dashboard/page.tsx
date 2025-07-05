import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllOrders, fetchOrdersAnalytics } from "@/utils/queries/orders";
import { DashboardHeader } from "./_components/dashboard-header";
import { RefreshProductsButton } from "./_components/refresh-products-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsCards } from "./_components/stats-cards";
import { RecentSales } from "./_components/recent-sales";
import {
  fetchAllProducts,
  fetchPrintifyProducts,
} from "@/utils/queries/products";
import ProductsTable from "./products/_components/products-table";
import { OrdersContent } from "./_components/orders-content";
import { getAllCategories } from "@/utils/actions/categories";

const DashboardHome = async () => {
  const revenueData = fetchOrdersAnalytics();
  const allOrdersData = fetchAllOrders();
  const productsData = fetchAllProducts();
  const categoriesData = getAllCategories();

  // fetch all printify products
  const printifyProductsData = fetchPrintifyProducts();

  const [totalRevenue, products, orders, categories, printifyProducts] =
    await Promise.all([
      revenueData,
      productsData,
      allOrdersData,
      categoriesData,
      printifyProductsData,
    ]);

  return (
    <main>
      <DashboardHeader
        heading="Dashboard"
        description="Welcome to your dashboard. Here you can manage your store, view analytics, and more."
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {totalRevenue && <StatsCards revenueData={totalRevenue} />}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Your sales performance over the last 30 days compared to the
                  previous period.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Your most recent orders.</CardDescription>
              </CardHeader>
              <CardContent>
                {orders === null || orders.length === 0 ? (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    No recent orders found.
                  </div>
                ) : (
                  <Suspense fallback={<Skeleton className="h-[400px]" />}>
                    {/* get the first 5 orders */}
                    <RecentSales orders={orders.slice(0, 5)} />
                  </Suspense>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Popular Products</CardTitle>
                <CardDescription>
                  Your best-selling products this month.
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <PopularProducts /> */}</CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Inventory Alert</CardTitle>
                <CardDescription>
                  Products that are low in stock or out of stock.
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <InventoryAlert /> */}</CardContent>
            </Card>
          </div>
        </TabsContent>{" "}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <RefreshProductsButton />
          </div>
          <ProductsTable
            categories={categories}
            products={products!}
            printifyProducts={printifyProducts}
          />
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>Manage and track your orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersContent data={orders!} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default DashboardHome;
