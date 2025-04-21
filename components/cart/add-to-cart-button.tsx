'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { CartItem } from '@/store/cart';
import { Database, Variant } from '@/utils/supabase/types';
import { Data } from 'payload';





interface AddToCartButtonProps {
  product: Database['public']['Tables']['products']['Row'];
  variant: Variant;
  quantity: number;
  className?: string;
}

const AddToCartButton = ({ 
  product, 
  variant, 
  quantity = 1,
  className
}: AddToCartButtonProps) => {
  const { addItem, setIsCartOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addItem({
      sku: variant.sku,
      productId: product.id,
      variantId: variant.id || 0, // If no variant, use 0 as default ID
      name: variant.title ? `${product.title} - ${variant.title}` : variant.title,
      price: variant?.price,
      image: product.images.find(img => img.variant_id === variant.id)?.src || '', // Use the main image or fallback to an empty string
    });

    // Optionally open cart drawer when item is added
    setIsCartOpen(true);
    
    // Reset adding state after a brief delay
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Button 
      onClick={handleAddToCart} 
      className={cn("flex items-center gap-2 w-full text-lg bg-blue-500 rounded-none", className)}
      disabled={isAdding}
    >
      <ShoppingBag size={16} />
      {isAdding ? 'Adding...' : 'Add to cart'}
    </Button>
  );
}


export default AddToCartButton;