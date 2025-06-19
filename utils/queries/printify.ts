import { PrintifyBlueprint, ProviderVariant } from "../supabase/types";

// the blueprinnt id for stretched canvas is 555

const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

// get the blueprints from Printify the return type is PrintifyBlueprint[]
export async function fetchPrintifyBlueprints(): Promise<PrintifyBlueprint[]> {
  const response = await fetch(
    `https://api.printify.com/v1/catalog/blueprints.json`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Error fetching Printify blueprints:", response.statusText);
    return [];
  }

  const data = await response.json();
  return data;
}

export async function fetchBlueprintById(
  blueprintId: number
): Promise<PrintifyBlueprint | null> {
  const response = await fetch(
    `https://api.printify.com/v1/catalog/blueprints/${blueprintId}.json`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Error fetching Printify blueprint:", response.statusText);
    return null;
  }

  const data = await response.json();
  return data;
}

export async function fetchBlueprintProviders(
  blueprintId: number
): Promise<any[]> {
  const response = await fetch(
    `https://api.printify.com/v1/catalog/blueprints/${blueprintId}/print_providers.json`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Error fetching Printify blueprint providers:",
      response.statusText
    );
    return [];
  }

  const data = await response.json();
  return data;
}

export async function fetchProviderVariants(
  blueprintId: number,
  providerId: number
): Promise<ProviderVariant[]> {
  const response = await fetch(
    `https://api.printify.com/v1/catalog/blueprints/${blueprintId}/print_providers/${providerId}/variants.json`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Error fetching Printify provider variants:",
      response.statusText
    );
    return [];
  }

  const data = await response.json();
  return data.variants || [];
}

// get a list of all print providers
export async function fetchPrintProviders(): Promise<any[]> {
  const response = await fetch(
    `https://api.printify.com/v1/catalog/print_providers.json`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Error fetching Printify print providers:",
      response.statusText
    );
    return [];
  }

  const data = await response.json();
  return data;
}

// get a list of all print providers' products
export async function fetchPrintProvidersProducts(
  providerId: number
): Promise<any[]> {
  const response = await fetch(
    `https://api.printify.com/v1/catalog/print_providers/${providerId}.json`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Error fetching Printify print providers products:",
      response.statusText
    );
    return [];
  }

  const data = await response.json();
  return data;
}
