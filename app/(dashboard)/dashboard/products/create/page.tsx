import { PrintifyImageUpload } from "@/components/printify/printify-image-upload";
import { PrintifyProductForm } from "@/components/printify/printify-product-form";
import {
  fetchBlueprintById,
  fetchBlueprintProviders,
  fetchPrintifyBlueprints,
  fetchPrintProviders,
  fetchPrintProvidersProducts,
  fetchProviderVariants,
} from "@/utils/queries/printify";
import { Suspense } from "react";

const CreatePrintifyProducts = async () => {
  // Fetch Printify blueprints

  const bluePrintData = fetchBlueprintById(555); // Fetching a specific blueprint by ID (e.g., 555 for stretched canvas)
  const providersData = fetchBlueprintProviders(555); // Fetching providers for the same blueprint
  const providerVariantsData = fetchProviderVariants(1159, 105); // Fetching variants for the same blueprint
  const printProvidersData = fetchPrintProviders(); // Fetching all print providers
  const providerProductsData = fetchPrintProvidersProducts(105);

  const [blueprint, providers, variants, printProviders, providersProducts] =
    await Promise.all([
      bluePrintData,
      providersData,
      providerVariantsData,
      printProvidersData,
      providerProductsData,
    ]);

  if (!blueprint) {
    return <div>No blueprint found.</div>;
  }

  return (
    <div>
      CreatePrintifyProducts
      <div className="flex gap-x-6">
        <PrintifyImageUpload />
        <Suspense fallback={<div>Loading form...</div>}>
          <PrintifyProductForm variants={variants} className="w-full flex-1" />
        </Suspense>
      </div>
    </div>
  );
};

export default CreatePrintifyProducts;
