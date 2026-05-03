import { client, PUBLIC_STORE_TOKEN } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const response = await client.auth.sendAuthenticationEmail(email, PUBLIC_STORE_TOKEN)

    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    console.error('Error sending auth email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
