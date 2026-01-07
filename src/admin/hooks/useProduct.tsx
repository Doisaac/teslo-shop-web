import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductByIdAction } from '../actions/get-product-by-id.action'
import type { Product } from '@/interfaces/product.interface'
import { createUpdateProductAction } from '../actions/create-update-product.action'
import { deleteProductAction } from '../actions/delete-product.action'

export const useProduct = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidate cache
      queryClient.invalidateQueries({ queryKey: ['products'] })

      // Update queryData
      queryClient.setQueryData(['product', { id: product.id }], product)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: () => {
      // Refresh the product list
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return {
    ...query,
    mutation,
    deleteMutation,
  }
}
