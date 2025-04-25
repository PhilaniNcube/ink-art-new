import { createClient } from "../supabase/server";

export async function currentUser() {

    const supabase = await createClient();

    // get the current user from the session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Error getting session:", error);
        return null;
    }

    if (!session) {
        return null;
    }

    // get the user from the session
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Error getting user:", userError);
        return null;
    }

    if (!user) {
        return null;
    }

    // get the user profile from the database
    return user;

}


export async function admin() {

    const supabase = await createClient();

    const result = await supabase.rpc('is_admin')

    if (result.error) {
        console.error("Error checking admin:", result.error);
        return false;
    }

    return result.data



} 