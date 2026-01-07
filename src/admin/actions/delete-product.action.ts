import { tesloApi } from '@/api/tesloApi'

export const deleteProductAction = async (id: string): Promise<void> => {
  if (!id) throw Error('Id is required ')
  await tesloApi.delete(`/products/${id}`)
}
