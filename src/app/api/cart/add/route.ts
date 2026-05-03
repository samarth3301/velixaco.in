import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json()
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || ''

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    // Hack: SDK CartResource checks isCustomerAuthenticated which looks for customerJWT
    // but Storentia.setAccessToken only sets accessToken.
    if ((client.auth as any).client) {
      (client.auth as any).client.setCustomerJWT(token)
    }

    const item = await client.carts.addItem({ productId, quantity })
    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
