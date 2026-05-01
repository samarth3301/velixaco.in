import { client } from '@/lib/storentiaClient'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get collection to retrieve product IDs
    const collection = await client.collections.get(id)
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 })
    }

    // Get all products
    const allProductsResponse = await client.products.list()
    const allProducts = allProductsResponse.data || []

    // Filter products that exist in collection
    const collectionProductIds = new Set((collection.products || []).map((p) => p.id))
    const products = allProducts
      .filter((product) => collectionProductIds.has(product.id))
      .map((product) => ({
        id: product.id,
        name: product.title,
        description: product.description,
        sellingPrice: `₹${(product.sellingPrice as number)?.toLocaleString() || '0'}`,
        originalPrice: product.originalPrice ? `₹${(product.originalPrice as number)?.toLocaleString()}` : undefined,
        img: (product.media as Array<{ fileKey: string }>)?.[0]?.fileKey || '/prod1.png',
        badge: product.status === 'ACTIVE' ? 'Active' : product.status,
        badgeType: product.status === 'ACTIVE' ? 'new' : 'sale',
      }))

    return NextResponse.json({
      collection: {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        parentId: collection.parentId,
      },
      products,
    })
  } catch (error) {
    console.error('Error fetching collection products:', error)
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 })
  }
}
