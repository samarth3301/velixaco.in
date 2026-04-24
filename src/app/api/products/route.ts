import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await client.products.list()

    if (!response || !response.data) {
      return NextResponse.json([])
    }

    const transformedProducts = (response.data as unknown as Array<Record<string, unknown>>).map((product) => ({
      id: product.id,
      name: product.title,
      description: product.description,
      price: `₹${(product.price as number)?.toLocaleString() || '0'}`,
      oldPrice: undefined,
      img: (product.media as Array<{ fileKey: string }>)?.[0]?.fileKey || '/prod1.png',
      badge: product.status === 'ACTIVE' ? 'Active' : product.status,
      badgeType: product.status === 'ACTIVE' ? 'new' : 'sale',
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json([])
  }
}
