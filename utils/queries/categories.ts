import { createClient } from "../supabase/server"

export async function fetchCategories() {

    const supabase = await createClient()

    const { data, error } = await supabase.from('categories').select('*').order('title', { ascending: true })

    if (error) {
        console.error("Error fetching categories:", error)
        return []
    }

    return data

}

export async function fetchCategoryBySlug(slug: string) {

    const supabase = await createClient()

    const {data: category, error:categoryError} = await supabase.from('categories').select('*').eq('slug', slug).single()

    
    if (categoryError ) {
        console.error("Error fetching:", categoryError)
        return null
    }

        const {data:products, error:productsError} = await supabase.from('products').select('*, category(*)').eq('category', category.id)



    if (!category || !products || productsError) {
        console.error("Category or products not found")
        return null
    }

    console.log('products', products.length)

    return { category, products }

    
}