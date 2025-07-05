"use client";

import { Button } from "@/components/ui/button";
import {
  publishPrintifyProduct,
  unlockProduct,
} from "@/utils/actions/products";
import { CircleDashed } from "lucide-react";
import React, { useTransition } from "react";

const PublishButton = ({ productId }: { productId: string }) => {
  const [isPending, startTransition] = useTransition();

  const publishProduct = async () => {
    const response = await publishPrintifyProduct(productId);
    if (response.error) {
      console.error("Error publishing product:", response.error);
      return;
    }
  };

  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            publishProduct();
          });
        }}
        className="w-full relative"
      >
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircleDashed className="animate-spin" />
          </div>
        )}
        Publish
      </Button>
    </div>
  );
};

export default PublishButton;
