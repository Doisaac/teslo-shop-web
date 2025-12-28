import { tesloApi } from '@/api/tesloApi'
import type { ProductsResponse } from '@/interfaces/products.response'

const API_URL = import.meta.env.VITE_API_URL

export const getProductsAction = async (): Promise<ProductsResponse> => {
  const { data } = await tesloApi.get<ProductsResponse>('/products')

  const productsWithUrls = data.products.map((product) => {
    const newImages = product.images.map((image) => {
      return `${API_URL}/files/product/${image}`
    })

    return {
      ...product,
      images: newImages,
    }
  })

  return {
    ...data,
    products: productsWithUrls,
  }
}
