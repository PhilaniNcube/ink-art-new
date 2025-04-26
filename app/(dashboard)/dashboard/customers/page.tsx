import { fetchProfiles } from '@/utils/queries/profiles';
import React from 'react'

const CustomersPage = async () => {

  const customers = await fetchProfiles();

  if (!customers) {
    return <div>Error fetching customers</div>
  }

  if (customers.length === 0) {
    return <div>No customers found</div>
  }

  return (
    <div>
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="mt-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">First Name</th>
                <th className="px-4 py-2 border-b">Last Name</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2 border-b capitalize">{customer.first_name}</td>

                  <td className="px-4 py-2 border-b capitalize"> {customer.last_name}</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage
