import { BlogsQuery } from "@/payload-types";



export async function getBlogPosts() {

    try {

        const req = await fetch(`${process.env.VERCEL_URL}/api/blog?limit=3`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        const res: BlogsQuery = await req.json();


        if (!res) {
            return null
        }

        return res

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return null
    }

}


export async function getAllBlogPosts() {
    
        try {
    
            const req = await fetch(`${process.env.VERCEL_URL}/api/blog`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
    
            const res: BlogsQuery = await req.json();
    
       
    
            if (!res) {
                return null
            }
    
            return res
    
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return null
        }
}


export async function getBlogPost(id: number) {

    try {

        const req = await fetch(`${process.env.VERCEL_URL}/api/blog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const res = await req.json();

        if (!res) {
            return null
        }

        return res

    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null
    }

}

export async function getBlogPostsBySlug(slug: string) {

    try {

        const req = await fetch(`${process.env.VERCEL_URL}/api/blog?slug=${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const res = await req.json();

        if (!res) {
            return null
        }

        return res

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return null
    }

}
