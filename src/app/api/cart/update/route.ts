import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { cartItemId, quantity } = await request.json()
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || ''

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    if ((client.auth as any).client) {
      (client.auth as any).client.setCustomerJWT(token)
    }
    const item = await client.carts.updateItem({ cartItemId, quantity })
    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}
