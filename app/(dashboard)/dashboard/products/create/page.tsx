import { PrintifyImageUpload } from "@/components/printify/printify-image-upload";
import { PrintifyProductForm } from "@/components/printify/printify-product-form";
import {
  fetchBlueprintById,
  fetchBlueprintProviders,
  fetchPrintifyBlueprints,
  fetchProviderVariants,
} from "@/utils/queries/printify";

const CreatePrintifyProducts = async () => {
  // Fetch Printify blueprints

  const bluePrintData = fetchBlueprintById(555); // Fetching a specific blueprint by ID (e.g., 555 for stretched canvas)
  const providersData = fetchBlueprintProviders(555); // Fetching providers for the same blueprint
  const providerVariantsData = fetchProviderVariants(555, 69); // Fetching variants for the same blueprint

  const [blueprint, providers, variants] = await Promise.all([
    bluePrintData,
    providersData,
    providerVariantsData,
  ]);

  if (!blueprint) {
    return <div>No blueprint found.</div>;
  }

  console.log("Fetched Printify blueprint:", blueprint);

  return (
    <div>
      CreatePrintifyProducts
      <div className="flex gap-x-6">
        <PrintifyImageUpload />
        <PrintifyProductForm className="w-full flex-1" />
      </div>
      {/* <pre className="max-w-3xl">{JSON.stringify(blueprint, null, 2)}</pre> */}
    </div>
  );
};

export default CreatePrintifyProducts;
