import { Navigate, useParams } from 'react-router'

import { useProduct } from '@/admin/hooks/useProduct'
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading'
import { AdminProductForm } from './ui/AdminProductForm'

export const AdminProductPage = () => {
  const { id } = useParams()

  const { isLoading, isError, data: product } = useProduct(id || '')

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto'
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.'

  if (isError) {
    return <Navigate to="/admin/products" />
  }

  if (isLoading) {
    return <CustomFullScreenLoading />
  }

  if (!product) {
    return <Navigate to="/admin/products" />
  }

  return (
    <AdminProductForm title={title} subtitle={subtitle} product={product} />
  )
}
