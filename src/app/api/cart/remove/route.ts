import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { cartItemId, token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    const success = await client.carts.removeItem(cartItemId)
    return NextResponse.json({ success: true, result: success })
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
  }
}
