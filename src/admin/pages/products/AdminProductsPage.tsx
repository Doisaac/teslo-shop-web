import { useState } from 'react'
import { Link } from 'react-router'
import { PencilIcon, PlusIcon, Trash } from 'lucide-react'

import { AdminTitle } from '@/admin/components/AdminTitle'
import { CustomPagination } from '@/components/custom/CustomPagination'
import { Button } from '@/components/ui/button'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table'
import { useProducts } from '@/shop/hooks/useProducts'
import { currencyFormatter } from '@/lib/currency-formatter'
import { useProduct } from '@/admin/hooks/useProduct'
import { ConfirmDeleteDialog } from '@/admin/components/ConfirmDeleteDialog'

export const AdminProductsPage = () => {
  const { data } = useProducts()

  const [pendingId, setPendingId] = useState<string | null>(null)

  const { deleteMutation } = useProduct(pendingId ?? '')

  const openDelete = (id: string) => setPendingId(id)
  const closeDelete = () => setPendingId(null)

  const handleDeleteProduct = () => {
    if (!pendingId) return

    deleteMutation.mutate(pendingId, {
      onSuccess: () => {
        closeDelete()
      },
    })
  }
  
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No hay productos, agrega uno haciendo clic en “Nuevo Producto”
              </TableCell>
            </TableRow>
          )}

          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>

              <TableCell>
                <Link
                  to={`/admin/products/${product.id}`}
                  className="hover:text-blue-500 underline"
                >
                  {product.title}
                </Link>
              </TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.gender}</TableCell>
              <TableCell>{product.stock} stock</TableCell>
              <TableCell>{product.sizes.join(', ')}</TableCell>

              <TableCell>
                <div className="flex items-center gap-4">
                  <Link to={`/admin/products/${product.id}`} className="">
                    <PencilIcon className="w-4 h-4 text-blue-500" />
                  </Link>

                  <Trash
                    onClick={() => {
                      openDelete(product.id)
                    }}
                    className="w-4 h-4 text-red-500 cursor-pointer"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 1} />

      <ConfirmDeleteDialog
        open={!!pendingId}
        onOpenChange={(open) => (open ? null : closeDelete())}
        title="Eliminar producto"
        description="Esta acción no se puede deshacer. ¿Seguro que quieres eliminar este producto?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        loading={deleteMutation?.isPending}
        onConfirm={handleDeleteProduct}
      />
    </>
  )
}
