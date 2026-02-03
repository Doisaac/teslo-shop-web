import { useProduct } from '@/admin/hooks/useProduct'
import { CustomImageLightBox } from '@/components/custom/CustomImageLightBox'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tag, LucideArrowBigLeftDash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

export const ProductPage = () => {
  const { idSlug } = useParams()
  const { data: product } = useProduct(idSlug || '')

  const [image, setImage] = useState<string | null>(null)

  const handleOnImageClick = () => {
    setImage(null)
  }

  // Hide the scroll when an image is selected
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [image])

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Buttons */}
        <div className="flex items-center justify-end">
          <div className="flex justify-end mb-10">
            <Button variant="outline" type="button">
              <Link to="/" className="flex items-center gap-2">
                <LucideArrowBigLeftDash className="w-4 h-4" />
                Regresar
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Información del producto
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Título del producto
                  </label>
                  <input
                    className={cn(
                      'w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                    )}
                    disabled={true}
                    value={product?.title}
                    placeholder="Título del producto"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      className={cn(
                        'w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                      )}
                      placeholder="Precio del producto"
                      value={product?.price}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock del producto
                    </label>
                    <input
                      type="number"
                      className={cn(
                        'w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                      )}
                      placeholder="Stock del producto"
                      value={product?.stock}
                      disabled={true}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug del producto
                  </label>
                  <input
                    type="text"
                    className={cn(
                      'w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                    )}
                    placeholder="Slug del producto"
                    value={product?.slug}
                    disabled={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Género del producto
                  </label>
                  <input
                    type="text"
                    className={cn(
                      'w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                    )}
                    placeholder="Genero del producto"
                    value={product?.gender}
                    disabled={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descripción del producto
                  </label>
                  <textarea
                    rows={5}
                    className={cn(
                      'w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                    )}
                    placeholder="Descripción del producto"
                    value={product?.description}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Tallas disponibles
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product?.sizes.map((size) => (
                    <span
                      key={size}
                      className={cn(
                        'cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200',
                      )}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Etiquetas
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Imágenes del producto
              </h2>

              {/* Current Images */}
              <div className="mt-6 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  {product?.images.map((image, index) => (
                    <div key={index} className="relative group overflow-hidden">
                      <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                        <img
                          src={image}
                          alt="Product"
                          className="w-full h-full object-cover rounded-lg"
                          onClick={() => {
                            setImage(image)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Status */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mt-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                  Estado del producto
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                      Estado
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Activo
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                      Inventario
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product?.stock! > 5
                          ? 'bg-green-100 text-green-800'
                          : product?.stock! > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product?.stock! > 5
                        ? `${product?.stock} en stock!`
                        : product?.stock! > 0
                          ? 'Bajo stock'
                          : 'Sin stock'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                      Imágenes
                    </span>
                    <span className="text-sm text-slate-600">
                      {product?.images.length} imágenes
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                      Tallas disponibles
                    </span>
                    <span className="text-sm text-slate-600">
                      {product?.sizes.length} tallas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomImageLightBox image={image} onClose={handleOnImageClick} />
    </>
  )
}
