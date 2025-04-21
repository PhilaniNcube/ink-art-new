import React, { Suspense } from 'react'
import PrintifyProducts from './_components/printify-products'
import { Skeleton } from '@/components/ui/skeleton'

const DashboardHome = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard Home</h1>
            <p>Welcome to the dashboard!</p>
            {/* Add more content here */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4">
                <Suspense fallback={
                    <div className='w-full p-3 aspect-square animate-pulse border rounded-md bg-muted'>
                        <Skeleton className="h-3 w-2/3 mb-2" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                }>
                    <PrintifyProducts />
                </Suspense>
            </div>
        </div>
    )
}

export default DashboardHome