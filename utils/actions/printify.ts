"use server";

import { z } from "zod";

// Response type for Printify image upload
export interface PrintifyImageUploadResponse {
  id: string;
  file_name: string;
  height: number;
  width: number;
  x_locked_aspect?: boolean;
  y_locked_aspect?: boolean;
  size: number;
  mime_type: string;
  preview_url: string;
  upload_time: string;
}

// Error response type
export interface PrintifyErrorResponse {
  error: string;
  message?: string;
}

// Response type for Printify product creation
export interface PrintifyProductResponse {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: Array<{
    name: string;
    type: string;
    values: Array<{
      id: number;
      title: string;
      colors?: string[];
    }>;
  }>;
  variants: Array<{
    id: number;
    sku: string;
    cost: number;
    price: number;
    title: string;
    grams: number;
    is_enabled: boolean;
    is_default: boolean;
    is_available: boolean;
    options: number[];
  }>;
  images: Array<{
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
  }>;
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: number;
  user_id: number;
  shop_id: number;
  print_provider_id: number;
  print_areas: Array<{
    variant_ids: number[];
    placeholders: Array<{
      position: string;
      images: Array<{
        id: string;
        name: string;
        type: string;
        height: number;
        width: number;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }>;
    }>;
  }>;
  sales_channel_properties: any[];
}

// Schema for form validation
const uploadImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image file is required")
    .refine(
      (file) => file.size <= 20 * 1024 * 1024, // 20MB limit
      "Image file must be less than 20MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "Only JPEG, PNG, and WebP images are supported"
    ),
  file_name: z.string().optional(),
});

// Schema for product creation validation
const createProductSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  blueprint_id: z
    .number()
    .int()
    .positive("Blueprint ID must be a positive integer"),
  print_provider_id: z
    .number()
    .int()
    .positive("Print provider ID must be a positive integer"),
  variants: z
    .array(
      z.object({
        id: z.number().int(),
        price: z.number().positive("Price must be positive"),
        is_enabled: z.boolean().optional().default(true),
      })
    )
    .min(1, "At least one variant is required"),
  print_areas: z
    .array(
      z.object({
        variant_ids: z.array(z.number().int()),
        placeholders: z.array(
          z.object({
            position: z.string(),
            images: z.array(
              z.object({
                id: z.string(),
                name: z.string().optional(),
                type: z.string().optional().default("image"),
                height: z.number().positive(),
                width: z.number().positive(),
                x: z.number().optional().default(0),
                y: z.number().optional().default(0),
                scale: z.number().positive().optional().default(1),
                angle: z.number().optional().default(0),
              })
            ),
          })
        ),
      })
    )
    .min(1, "At least one print area is required"),
  tags: z.array(z.string()).optional().default([]),
});

export type UploadImageState = {
  success: boolean;
  message: string;
  data?: PrintifyImageUploadResponse;
  errors?: {
    image?: string[];
    file_name?: string[];
    _form?: string[];
  };
};

/**
 * Server action to upload an image to Printify media library
 * @param prevState - Previous state from useActionState
 * @param formData - Form data containing the image file
 * @returns Updated state with success/error information
 */
export async function uploadImageToPrintify(
  prevState: UploadImageState,
  formData: FormData
): Promise<UploadImageState> {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;

  if (!apiToken) {
    return {
      success: false,
      message: "Printify API token is not configured",
      errors: {
        _form: ["Server configuration error: Printify API token missing"],
      },
    };
  }

  try {
    // Validate the form data
    const result = uploadImageSchema.safeParse({
      image: formData.get("image"),
      file_name: formData.get("file_name") || undefined,
    });

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: result.error.flatten().fieldErrors,
      };
    }
    const { image, file_name } = result.data;

    // Convert file to base64
    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Prepare the request body as JSON
    const requestBody = {
      file_name: file_name || image.name,
      contents: base64,
    };

    // Make the API request to Printify
    const response = await fetch(
      "https://api.printify.com/v1/uploads/images.json",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Printify API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      return {
        success: false,
        message: `Upload failed: ${response.statusText}`,
        errors: {
          _form: [
            errorData.message ||
              `HTTP ${response.status}: ${response.statusText}`,
          ],
        },
      };
    }
    const uploadResult: PrintifyImageUploadResponse = await response.json();

    return {
      success: true,
      message: "Image uploaded successfully to Printify media library",
      data: uploadResult,
    };
  } catch (error) {
    console.error("Error uploading image to Printify:", error);

    return {
      success: false,
      message: "Failed to upload image",
      errors: {
        _form: [
          error instanceof Error ? error.message : "Unknown error occurred",
        ],
      },
    };
  }
}

/**
 * Alternative function-based approach for programmatic usage
 * @param imageFile - File object or Buffer
 * @param fileName - Optional custom filename
 * @returns Promise with upload result or throws error
 */
export async function uploadImageToPrintifyDirect(
  imageFile: File | Buffer,
  fileName?: string
): Promise<PrintifyImageUploadResponse> {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;

  if (!apiToken) {
    throw new Error("Printify API token is not configured");
  }
  try {
    let base64: string;
    let finalFileName: string;

    if (imageFile instanceof File) {
      const arrayBuffer = await imageFile.arrayBuffer();
      base64 = Buffer.from(arrayBuffer).toString("base64");
      finalFileName = fileName || imageFile.name;
    } else {
      // Handle Buffer case
      base64 = imageFile.toString("base64");
      finalFileName = fileName || "image.png";
    }

    // Prepare the request body as JSON
    const requestBody = {
      file_name: finalFileName,
      contents: base64,
    };

    const response = await fetch(
      "https://api.printify.com/v1/uploads/images.json",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Upload failed: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading image to Printify:", error);
    throw error;
  }
}

export type CreateProductState = {
  success: boolean;
  message: string;
  data?: PrintifyProductResponse;
  errors?: {
    title?: string[];
    description?: string[];
    blueprint_id?: string[];
    print_provider_id?: string[];
    variants?: string[];
    print_areas?: string[];
    tags?: string[];
    _form?: string[];
  } & Record<string, string[] | undefined>;
};

/**
 * Server action to create a new product in Printify
 * @param prevState - Previous state from useActionState
 * @param formData - Form data containing the product information
 * @returns Updated state with success/error information
 */
export async function createPrintifyProduct(
  prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!apiToken) {
    return {
      success: false,
      message: "Printify API token is not configured",
      errors: {
        _form: ["Server configuration error: Printify API token missing"],
      },
    };
  }

  if (!shopId) {
    return {
      success: false,
      message: "Printify shop ID is not configured",
      errors: {
        _form: ["Server configuration error: Printify shop ID missing"],
      },
    };
  }

  try {
    // Parse JSON data from form
    const productDataJson = formData.get("productData") as string;
    if (!productDataJson) {
      return {
        success: false,
        message: "Product data is required",
        errors: {
          _form: ["Product data is missing"],
        },
      };
    }

    const productData = JSON.parse(productDataJson);

    // Validate the product data
    const result = createProductSchema.safeParse(productData);

    if (!result.success) {
      return {
        success: false,
        message: "Invalid product data",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const validatedData = result.data;

    // Make the API request to Printify
    const response = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Printify API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      return {
        success: false,
        message: `Product creation failed: ${response.statusText}`,
        errors: {
          _form: [
            errorData.message ||
              `HTTP ${response.status}: ${response.statusText}`,
          ],
        },
      };
    }

    const productResult: PrintifyProductResponse = await response.json();

    return {
      success: true,
      message: "Product created successfully in Printify",
      data: productResult,
    };
  } catch (error) {
    console.error("Error creating Printify product:", error);

    return {
      success: false,
      message: "Failed to create product",
      errors: {
        _form: [
          error instanceof Error ? error.message : "Unknown error occurred",
        ],
      },
    };
  }
}

/**
 * Direct function to create a Printify product programmatically
 * @param productData - Product data object
 * @returns Promise with product creation result or throws error
 */
export async function createPrintifyProductDirect(
  productData: z.infer<typeof createProductSchema>
): Promise<PrintifyProductResponse> {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!apiToken) {
    throw new Error("Printify API token is not configured");
  }

  if (!shopId) {
    throw new Error("Printify shop ID is not configured");
  }

  try {
    // Validate the product data
    const validatedData = createProductSchema.parse(productData);

    const response = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Product creation failed: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating Printify product:", error);
    throw error;
  }
}
