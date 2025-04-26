'use server';

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
    const { error: deleteProductCategoriesError } = await supabase.from("product_categories").delete().eq("product_id", productId);
    if (deleteProductCategoriesError) {
        console.error("Error deleting product categories:", deleteProductCategoriesError);
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
    const shopId = '9354978';

    const url = `https://api.printify.com/v1/shops/${shopId}/products/${productId}/publish.json`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
            "title": true,
            "description": true,
            "images": true,
            "variants": true,
            "tags": true,
            "keyFeatures": true,
            "shipping_template": true
        }),
    });
    const data = await res.json();

    console.log("Publishing product:", data);
    if (res.status !== 200) {
        console.error("Error publishing product:", data);
        return { success: false, error: data };
    }
    console.log("Product published successfully:", data);
    revalidatePath("/dashboard/products");
    return { success: true, data };


}


export async function updatePrintifyProductTitle(productId: string, title: string) {
    const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
    const shopId = '9354978';

    const url = `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
            "title": title,
        }),
    });
    
    const data = await res.json();

    console.log("Updating product:", data);
    if (res.status !== 200) {
        console.error("Error updating product:", data);
        return { success: false, error: data };
    }
    console.log("Product published successfully:", data);
    revalidatePath("/dashboard/products");
    return { success: true, data };
}
