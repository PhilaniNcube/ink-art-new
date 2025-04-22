"use client"

import { Database } from '@/utils/supabase/types'
import { createColumnHelper } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisIcon, Pencil, TrashIcon } from 'lucide-react'
import Link from 'next/link'
// Import other necessary components like Button, DropdownMenu for actions if needed

type Product = Database['public']['Tables']['products']['Row']

const columnHelper = createColumnHelper<Product>()

export const columns = [
  // Selection Column (Optional)
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  // Product Name Column
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => <span className="font-medium">{info.getValue()}</span>,
  }),

  // Description Column (Truncated)
  columnHelper.accessor('featured', {
    header: 'Featured',
    cell: info => {
        const featured = info.getValue();
        return <Badge className={cn("text-xs rounded-full truncate max-w-xs", 
        featured ? "bg-green-600 text-white" : "bg-blue-600 text-white"
        )}>{featured ? 'Featured' : 'Not Featured'}</Badge>;
    }
  }),



  // Status Column (Example - Assuming you have a status field)
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   cell: info => <Badge variant="outline">{info.getValue()}</Badge>,
  // }),

  // Created At Column
columnHelper.accessor('created_at', {
  header: 'Created At',
  cell: info => {
    const dateValue = info.getValue();
    // Check if dateValue is not null or undefined before formatting
    if (dateValue) {
      try {
        // Attempt to parse the date string into a Date object
        const date = new Date(dateValue);
        // Check if the parsed date is valid before formatting
        if (!isNaN(date.getTime())) {
          return format(date, 'dd/MM/yyyy');
        }
      } catch (error) {
        console.error("Error parsing date:", error);
        // Handle potential parsing errors, e.g., return the original string or 'Invalid Date'
        return 'Invalid Date';
      }
    }
    // Return 'N/A' if the dateValue is null or undefined
    return 'N/A';
  },
}),

  // Actions Column (Example)
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original
      // Add DropdownMenu with actions like Edit, Delete here
      return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size='icon'>
                    <span className="sr-only">Actions</span>
                    <EllipsisIcon className="h-4 w-4" />
                    {/* Icon for actions, e.g., three dots or similar */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem>
                    <Link href={`/dashboard/products/${product.id}`} className="w-full flex" onClick={() => console.log('Edit', product.id)}>
                       <Pencil className='h-5 w-5 mr-2' /> Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <TrashIcon className='h-5 w-5 mr-2' />
                    Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]
