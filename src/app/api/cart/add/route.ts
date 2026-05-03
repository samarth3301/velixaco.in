import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { productId, quantity, token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    const item = await client.carts.addItem({ productId, quantity })
    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
