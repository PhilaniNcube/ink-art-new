"use client";

import { Button } from "@/components/ui/button";
import { toggleProductFeatured } from "@/utils/actions/products";
import { Star } from "lucide-react";
import { startTransition, useActionState } from "react";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface FeaturedButtonProps {
  productId: string;
  isFeatured: boolean;
}

const FeaturedButton = ({ productId, isFeatured }: FeaturedButtonProps) => {
  // create a client action from which we will call the server action
  const clientAction = async () => {
    toggleProductFeatured(productId);
  };

  const [state, formAction, isPending] = useActionState(clientAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="productId" value={productId} />
      <Button
        type="submit"
        variant={isFeatured ? "default" : "outline"}
        size="sm"
        disabled={isPending}
        className="gap-2"
      >
        <Star className={`h-4 w-4 ${isFeatured ? "fill-current" : ""}`} />
        {isPending ? "Updating..." : isFeatured ? "Featured" : "Mark Featured"}
      </Button>
    </form>
  );
};

export default FeaturedButton;
