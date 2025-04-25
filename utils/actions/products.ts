'use server';

import { revalidatePath } from "next/cache";
import { admin } from "../queries/users";
import { createClient } from "../supabase/server";

export async function deleteProduct(prevState:unknown, formData: FormData) {

    

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