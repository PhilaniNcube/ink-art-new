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
