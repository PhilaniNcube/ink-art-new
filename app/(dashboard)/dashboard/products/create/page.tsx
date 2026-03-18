import { PrintifyImageUpload } from "@/components/printify/printify-image-upload";
import { PrintifyProductForm } from "@/components/printify/printify-product-form";
import { connection } from "next/server";
import {
  fetchBlueprintById,
  fetchProviderVariants,
} from "@/utils/queries/printify";
import { Suspense } from "react";

const CreatePrintifyProductsContent = async () => {
  await connection();

  const [blueprint, variants] = await Promise.all([
    fetchBlueprintById(555),
    fetchProviderVariants(1159, 105),
  ]);

  if (!blueprint) {
    return <div>No blueprint found.</div>;
  }

  return (
    <div>
      CreatePrintifyProducts
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex gap-x-6">
          <PrintifyImageUpload />
          <PrintifyProductForm variants={variants} className="w-full flex-1" />
        </div>
      </Suspense>
    </div>
  );
};

const CreatePrintifyProducts = () => {
  return (
    <Suspense fallback={<div>Loading product setup...</div>}>
      <CreatePrintifyProductsContent />
    </Suspense>
  );
};

export default CreatePrintifyProducts;
