import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { cartItemId, quantity, token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    const item = await client.carts.updateItem({ cartItemId, quantity })
    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}
