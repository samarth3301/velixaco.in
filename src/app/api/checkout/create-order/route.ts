import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || ''

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    client.setAccessToken(token)
    if ((client.auth as any).client) {
      (client.auth as any).client.setCustomerJWT(token)
    }

    const cart = await client.carts.get()
    if (!cart || !cart.items || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculate total amount in paise
    const amount = cart.items.reduce((acc: number, item: any) => {
      const priceStr = item.product?.sellingPrice || "0"
      const priceNum = parseFloat(priceStr.replace(/[^\d.]/g, "")) || 0;
      return acc + (priceNum * (item.quantity || 1));
    }, 0);

    if (amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const options = {
      amount: Math.round(amount * 100), 
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
