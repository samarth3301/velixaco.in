import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    const success = await client.carts.clear()
    return NextResponse.json({ success: true, result: success })
  } catch (error) {
    console.error('Error clearing cart:', error)
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
}
