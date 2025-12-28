import { useQuery } from '@tanstack/react-query'
import { getProductsAction } from '../actions/get-products.action'

export const useProducts = () => {
  // TODO: Add query logic

  return useQuery({
    queryKey: ['products'],
    queryFn: getProductsAction,
  })
}
