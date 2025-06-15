"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export function RefreshProductsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/jobs/products/new", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh products");
      }

      const result = await response.json();

      toast({
        title: "Success",
        description: `Products refreshed successfully! ${result.message || ""}`,
      });

      // Refresh the current page to show updated data
      router.refresh();
    } catch (error) {
      console.error("Error refreshing products:", error);
      toast({
        title: "Error",
        description: "Failed to refresh products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      <RefreshCw
        className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
      />
      {isLoading ? "Refreshing..." : "Refresh Products"}
    </Button>
  );
}
