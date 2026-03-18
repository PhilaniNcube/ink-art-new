import { createClient } from "../supabase/server";

export async function currentUser() {
    const supabase = await createClient();

    // getUser() validates the token server-side — no need to call getSession() first
    // since the middleware already refreshes the session.
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

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