import { Storentia } from "@storentia/sdk"

export const client = new Storentia({
    clientId: process.env.STORENTIA_CLIENT_ID!,
    clientSecret: process.env.STORENTIA_CLIENT_SECRET!,
})

export async function fetchProducts() {
    try {
        const products = await client.products.list()
        return products || []
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}

export async function fetchProduct(id: string) {
    try {
        const product = await client.products.get(id)
        return product
    } catch (error) {
        console.error("Error fetching product:", error)
        return null
    }
}
