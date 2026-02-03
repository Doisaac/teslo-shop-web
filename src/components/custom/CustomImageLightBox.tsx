interface Props {
  image: string | null
  onClose: () => void
}

export const CustomImageLightBox = ({ image, onClose }: Props) => {
  if (!image) return

  return (
    <div
      className="fixed inset-0 z-51 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 text-white right-4 text-3xl cursor-pointer"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={image}
        className="max-w-[90vw] max-h-[70vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
