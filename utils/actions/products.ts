"use server";

import { revalidatePath } from "next/cache";
import { admin } from "../queries/users";
import { createClient } from "../supabase/server";

export async function deleteProduct(prevState: unknown, formData: FormData) {
  const productId = formData.get("productId") as string; // Ensure productId is a string

  console.log("Deleting product with ID:", productId); // Log the productId for debugging

  if (!productId) {
    console.error("Product ID is required");
    return { success: false, error: "Product ID is required" };
  }

  const supabase = await createClient();

  // find this product in the product_categories table and delete it
  const { error: deleteProductCategoriesError } = await supabase
    .from("product_categories")
    .delete()
    .eq("product_id", productId);
  if (deleteProductCategoriesError) {
    console.error(
      "Error deleting product categories:",
      deleteProductCategoriesError
    );
    return { success: false, error: deleteProductCategoriesError.message };
  }

  const { error, data } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error };
  }

  revalidatePath("/dashboard/products");

  return { success: true };
}

export async function publishPrintifyProduct(productId: string) {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

  const url = `https://api.printify.com/v1/shops/${shopId}/products/${productId}/publishing_succeeded.json`;

  // Prepare the external object for the request body
  const externalData = {
    id: productId, // Use provided external ID or fallback to productId
    handle: `https://inkart.store/products/${productId}`, // Use provided handle or create a default one
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      external: externalData,
    }),
  });

  console.log("Setting product publish status to succeeded:", {
    productId,
    external: externalData,
  });

  if (res.status !== 200) {
    const errorData = await res.json();
    console.error("Error setting product publish status:", errorData);
    return { success: false, error: errorData };
  }

  const data = await res.json();
  const supabase = await createClient();

  // Update the product status in the database
  const { error } = await supabase
    .from("products")
    .update({
      is_locked: false,
      // external_id: externalData.id,
      // external_handle: externalData.handle,
    })
    .eq("id", productId)
    .select("id, title, is_locked");

  if (error) {
    console.error("Error updating product status in database:", error);
    return { success: false, error };
  }

  console.log("Product publish status set to succeeded:", data);
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/products/${productId}`);
  return { success: true, data };
}

export async function updatePrintifyProductTitle(
  productId: string,
  title: string
) {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

  const url = `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      title: title,
    }),
  });

  const data = await res.json();

  console.log("Updating product:", data);
  if (res.status !== 200) {
    console.error("Error updating product:", data);
    return { success: false, error: data };
  }

  const supabase = await createClient();

  // Update the product title in the database
  const { error } = await supabase
    .from("products")
    .update({ title })
    .eq("id", productId);
  if (error) {
    console.error("Error updating product title in database:", error);
    return { success: false, error };
  }

  console.log("Product published successfully:", data);
  revalidatePath("/dashboard/products");
  return { success: true, data };
}

export async function unlockProduct(productId: string) {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

  const url = `https://api.printify.com/v1/shops/${shopId}/products/${productId}/publishing_succeeded.json`;

  // Prepare the external object for the request body
  const externalData = {
    id: productId, // Use provided external ID or fallback to productId
    handle: `https://inkart.store/products/${productId}`, // Use provided handle or create a default one
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      external: externalData,
    }),
  });

  console.log("Setting product publish status to succeeded:", {
    productId,
    external: externalData,
  });

  if (res.status !== 200) {
    const errorData = await res.json();
    console.error("Error setting product publish status:", errorData);
    return { success: false, error: errorData };
  }

  const data = await res.json();
  const supabase = await createClient();

  // Update the product status in the database
  const { error } = await supabase
    .from("products")
    .update({
      is_locked: false,
      external_id: externalData.id,
      external_handle: externalData.handle,
    })
    .eq("id", productId);

  if (error) {
    console.error("Error updating product status in database:", error);
    return { success: false, error };
  }

  console.log("Product publish status set to succeeded:", data);
  revalidatePath("/dashboard/products");
  return { success: true, data };
}

export async function updateProductCategory(
  prevState: unknown,
  formData: FormData
) {
  const productId = formData.get("productId") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!productId) {
    return {
      success: false,
      error: "Product ID is required",
    };
  }

  // categoryId can be empty string to remove category (set to null)
  const categoryValue =
    categoryId && categoryId.trim() !== "" ? categoryId : null;

  const supabase = await createClient();

  try {
    // Update the product's category
    const { error, data } = await supabase
      .from("products")
      .update({ category: categoryValue })
      .eq("id", productId)
      .select("id, title, category");

    if (error) {
      console.error("Error updating product category:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    console.log("Product category updated successfully:", data[0]);

    // Revalidate the dashboard products page to show updated data
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: data[0],
      message: `Product category updated successfully`,
    };
  } catch (error) {
    console.error("Unexpected error updating product category:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function toggleProductFeatured(productId: string) {
  if (!productId) {
    return {
      success: false,
      error: "Product ID is required",
    };
  }

  const supabase = await createClient();

  try {
    // First, get the current featured status from the database
    const { data: currentProduct, error: fetchError } = await supabase
      .from("products")
      .select("featured")
      .eq("id", productId)
      .single();

    if (fetchError) {
      console.error("Error fetching current product status:", fetchError);
      return {
        success: false,
        error: fetchError.message,
      };
    }

    if (!currentProduct) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    // Toggle the featured status
    const newFeaturedStatus = !currentProduct.featured;

    const { error, data } = await supabase
      .from("products")
      .update({ featured: newFeaturedStatus })
      .eq("id", productId)
      .select("id, title, featured");

    if (error) {
      console.error("Error updating product featured status:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    console.log("Product featured status updated successfully:", data[0]);

    // Revalidate the dashboard products page to show updated data
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: data[0],
      message: `Product ${
        newFeaturedStatus ? "marked as featured" : "removed from featured"
      }`,
    };
  } catch (error) {
    console.error("Unexpected error updating product featured status:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
