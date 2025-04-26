'use client';

import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { unlockProduct } from '@/utils/actions/products';
import React, { useTransition } from 'react'

const UnlockProduct = ({ productId, is_locked }: { productId: string, is_locked: boolean }) => {

  const [ispending, startTransition] = useTransition()

  const handleUnlock = async () => {
    startTransition(async () => {

      await unlockProduct(productId)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          {is_locked ? "Locked" : "Unlocked"}
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Unlock Product</DialogTitle>
        <p className="text-muted-foreground">
          Are you sure you want to unlock this product? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleUnlock}
            disabled={ispending}
          >
            {ispending ? "Unlocking..." : "Unlock"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UnlockProduct
