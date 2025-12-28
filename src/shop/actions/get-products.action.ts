import { tesloApi } from '@/api/tesloApi'
import type { ProductsResponse } from '@/interfaces/products.response'

const API_URL = import.meta.env.VITE_API_URL

interface Options {
  limit?: number | string
  offset?: number | string
  gender?: string
  sizes?: string
  minPrice?: number
  maxPrice?: number
}

export const getProductsAction = async (
  options: Options
): Promise<ProductsResponse> => {
  const { limit, offset, gender, sizes, minPrice, maxPrice } = options

  const { data } = await tesloApi.get<ProductsResponse>('/products', {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
    },
  })

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
