export async function POST(request: Request) {
    // this is going to be a webhook from printify, I want to handle the product update action

    const { action, payload } = await request.json()
}