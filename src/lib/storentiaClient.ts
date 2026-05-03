import { Storentia } from "@storentia/sdk"

export const client = new Storentia({
    clientId: process.env.NEXT_PUBLIC_STORENTIA_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_STORENTIA_CLIENT_SECRET!,
})

export const PUBLIC_STORE_TOKEN = process.env.NEXT_PUBLIC_STORENTIA_STORE_TOKEN!

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

export async function createContact(name: string, email: string, message: string) {
    try {
        const contact = await client.contacts.create({
            name,
            email,
            message
        })
        return contact
    } catch (error) {
        console.error("Error creating contact:", error)
        return null
    }
}

export async function fetchCollection(id: string) {
    try {
        const collection = await client.collections.get(id)
        return collection
    } catch (error) {
        console.error("Error fetching collection:", error)
        return null
    }
}

export async function sendAuthEmail(email: string) {
    try {
        const result = await (client.auth as any).sendAuthenticationEmail({ email })
        return { success: true, result }
    } catch (err) {
        return { success: false, error: (err as Error).message }
    }
}

export async function verifyAuthEmail(email: string, code: string) {
    try {
        const result = await (client.auth as any).verifyAuthenticationEmail({ email, code })
        const user = await (client.auth as any).getMe()
        localStorage.setItem('customer-email', user.email)
        localStorage.setItem('customer-id', user.id)
        return { success: true, customer: user }
    } catch (err) {
        return { success: false, error: (err as Error).message }
    }
}

export async function getCart() {
    try {
        const cart = await client.carts.get()
        return cart
    } catch (err) {
        console.error('Failed to fetch cart:', err)
        throw err
    }
}

export async function addToCart(productId: string, quantity: number) {
    try {
        const item = await client.carts.addItem({ productId, quantity })
        return item
    } catch (err) {
        console.error('Failed to add item:', err)
        throw err
    }
}

export async function removeFromCart(cartItemId: string) {
    try {
        const success = await client.carts.removeItem(cartItemId)
        return success
    } catch (err) {
        console.error('Failed to remove item:', err)
        throw err
    }
}

export async function updateCartItem(cartItemId: string, quantity: number) {
    try {
        const item = await client.carts.updateItem({ cartItemId, quantity })
        return item
    } catch (err) {
        console.error('Failed to update item:', err)
        throw err
    }
}

export async function clearCart() {
    try {
        const success = await client.carts.clear()
        return success
    } catch (err) {
        console.error('Failed to clear cart:', err)
        throw err
    }
}

export function logout() {
    client.auth.logout()
    localStorage.removeItem('customer-email')
    localStorage.removeItem('customer-id')
}
