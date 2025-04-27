import { createClient } from "../supabase/server";

export async function fetchProfiles() {

  const supabase = await createClient();

  try {

    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;

  } catch (error) {

    console.error("Error fetching profiles:", error);
    return null;

  }

}

export async function fetchUserProfile(userId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function updateUserProfile(
  userId: string, 
  updates: { first_name?: string; last_name?: string }
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: String(error) };
  }
}
