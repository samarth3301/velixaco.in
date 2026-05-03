import { client, PUBLIC_STORE_TOKEN } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const response = await client.auth.authenticate(email, password, PUBLIC_STORE_TOKEN)

    client.setAccessToken(response.token)
    const user = await client.auth.getMe()

    return NextResponse.json({
      success: true,
      token: response.token,
      user,
    })
  } catch (error) {
    console.error('Error authenticating:', error)
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }
}
