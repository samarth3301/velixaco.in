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

export async function authenticate(email: string, password: string) {
    try {
        const response = await fetch('/api/auth/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        if (!response.ok) throw new Error('Invalid credentials')
        const data = await response.json()
        localStorage.setItem('customer-email', data.user.email)
        localStorage.setItem('customer-id', data.user.id)
        localStorage.setItem('customer-token', data.token)
        return { success: true, user: data.user, token: data.token }
    } catch (err) {
        return { success: false, error: (err as Error).message }
    }
}

export async function sendAuthEmail(email: string) {
    try {
        const response = await fetch('/api/auth/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
        if (!response.ok) throw new Error('Failed to send email')
        return { success: true, result: await response.json() }
    } catch (err) {
        return { success: false, error: (err as Error).message }
    }
}

export async function verifyAuthEmail(email: string, code: string) {
    try {
        const response = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code }),
        })
        if (!response.ok) throw new Error('Invalid code')
        const data = await response.json()
        localStorage.setItem('customer-email', data.user.email)
        localStorage.setItem('customer-id', data.user.id)
        localStorage.setItem('customer-token', data.token)
        return { success: true, customer: data.user, token: data.token }
    } catch (err) {
        return { success: false, error: (err as Error).message }
    }
}

export async function getCart() {
    try {
        const token = localStorage.getItem('customer-token')
        if (!token) throw new Error('Not authenticated')

        const response = await fetch('/api/cart/get', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!response.ok) throw new Error('Failed to fetch cart')
        const data = await response.json()
        return data.cart
    } catch (err) {
        console.error('Failed to fetch cart:', err)
        throw err
    }
}

export async function addToCart(productId: string, quantity: number) {
    try {
        const token = localStorage.getItem('customer-token')
        if (!token) throw new Error('Not authenticated')

        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity }),
        })
        if (!response.ok) throw new Error('Failed to add item')
        const data = await response.json()
        return data.item
    } catch (err) {
        console.error('Failed to add item:', err)
        throw err
    }
}

export async function removeFromCart(cartItemId: string) {
    try {
        const token = localStorage.getItem('customer-token')
        if (!token) throw new Error('Not authenticated')

        const response = await fetch('/api/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cartItemId }),
        })
        if (!response.ok) throw new Error('Failed to remove item')
        const data = await response.json()
        return data.result
    } catch (err) {
        console.error('Failed to remove item:', err)
        throw err
    }
}

export async function updateCartItem(cartItemId: string, quantity: number) {
    try {
        const token = localStorage.getItem('customer-token')
        if (!token) throw new Error('Not authenticated')

        const response = await fetch('/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cartItemId, quantity }),
        })
        if (!response.ok) throw new Error('Failed to update item')
        const data = await response.json()
        return data.item
    } catch (err) {
        console.error('Failed to update item:', err)
        throw err
    }
}

export async function clearCart() {
    try {
        const token = localStorage.getItem('customer-token')
        if (!token) throw new Error('Not authenticated')

        const response = await fetch('/api/cart/clear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({}),
        })
        if (!response.ok) throw new Error('Failed to clear cart')
        const data = await response.json()
        return data.result
    } catch (err) {
        console.error('Failed to clear cart:', err)
        throw err
    }
}

export function logout() {
    client.auth.logout()
    localStorage.removeItem('customer-email')
    localStorage.removeItem('customer-id')
    localStorage.removeItem('customer-token')
}
