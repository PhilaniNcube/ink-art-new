"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

// Schema for validating the update data
const updateProductSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  title: z.string().min(1, "Title is required"),
})

type UpdateProductState = {
  status: "success" | "error" | "idle"
  message?: string
}

export async function updateProductTitle(prevState: UpdateProductState, formData: FormData) {
  try {
    // Extract and validate form data
    const validatedFields = updateProductSchema.safeParse({
      productId: formData.get("productId"),
      title: formData.get("title"),
    })

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Invalid data. Please check the fields and try again.",
      }
    }

    const { productId, title } = validatedFields.data

    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_TOKEN

    if (!apiKey) {
      console.error("Printify API token is missing. Ensure PRINTIFY_API_TOKEN is set.")
      return {
        status: "error",
        message: "API token is not configured. Please contact your administrator.",
      }
    }

    // Make request to Printify API to update product
    const shopId = "9354978" // This should be configurable or from env vars
    const printifyUrl = `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`
    
    const response = await fetch(printifyUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("Error updating product:", response.status, errorData)
      
      return {
        status: "error",
        message: `Failed to update product: ${response.statusText}`,
      }
    }

    // Revalidate the products page to show updated data
    revalidatePath("/dashboard/products")
    revalidatePath("/dashboard")
    
    return {
      status: "success",
      message: "Product title updated successfully!",
    }
  } catch (error) {
    console.error("Error updating product title:", error)
    return {
      status: "error",
      message: `An unexpected error occurred: ${(error as Error).message}`,
    }
  }
}
