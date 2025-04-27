"use server"

import { z } from "zod"
import { createClient } from "../supabase/server"
import { revalidatePath } from "next/cache"

// Schema for validating profile updates
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
})

type ProfileState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function updateProfile(prevState: unknown, formData: FormData) {
  try {
    // Extract data from the form
    const validatedFields = profileSchema.safeParse({
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
    })

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Invalid data. Please check the fields and try again.",
      }
    }

    // Get the current user's ID
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || !session.user) {
      return {
        status: "error",
        message: "You must be logged in to update your profile.",
      }
    }

    const userId = session.user.id
    const { first_name, last_name } = validatedFields.data

    // Update the profile in the database
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name,
        last_name,
      })
      .eq("id", userId)

    if (error) {
      return {
        status: "error",
        message: `Failed to update profile: ${error.message}`,
      }
    }

    // Revalidate the account page to show updated data
    revalidatePath("/account")

    return {
      status: "success",
      message: "Profile updated successfully!",
    }
  } catch (error) {
    return {
      status: "error",
      message: `An unexpected error occurred: ${(error as Error).message}`,
    }
  }
}
