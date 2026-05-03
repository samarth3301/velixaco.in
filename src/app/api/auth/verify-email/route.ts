import { client, PUBLIC_STORE_TOKEN } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code required' }, { status: 400 })
    }

    const response = await client.auth.verifyAuthenticationEmail(email, code, PUBLIC_STORE_TOKEN)
    console.log(response)
    client.setAccessToken(response.token)
    const user = await client.auth.getMe()

    return NextResponse.json({
      success: true,
      token: response.token,
      user,
    })
  } catch (error) {
    console.error('Error verifying email:', error)
    return NextResponse.json({ error: 'Invalid email or code' }, { status: 401 })
  }
}
