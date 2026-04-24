import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await client.products.get(id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const transformed = {
      id: product.id,
      name: product.title,
      description: product.description,
      price: `₹${(product.price as number)?.toLocaleString() || '0'}`,
      oldPrice: undefined,
      img: (product.media as Array<{ fileKey: string }>)?.[0]?.fileKey || '/prod1.png',
      badge: product.status === 'ACTIVE' ? 'Active' : product.status,
      badgeType: product.status === 'ACTIVE' ? 'new' : 'sale',
      stock: (product as any).stock,
    }

    return NextResponse.json(transformed)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
