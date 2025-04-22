'use server';

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function deleteProduct(prevState:unknown, formData: FormData) {

    const productId = formData.get("productId") as string; // Ensure productId is a string  


    if (!productId) {
        console.error("Product ID is required");
        return { success: false, error: "Product ID is required" };
    }

    const supabase = await createClient();

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