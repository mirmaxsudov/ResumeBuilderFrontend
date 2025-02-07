export default function Hero() {
    return (
      <div className="relative h-[400px] bg-gray-900 rounded-lg overflow-hidden my-6">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pWcXu5Olv61lr2DbBVUCqPXo7hu3rH.png"
            alt="Penoplex Insulation"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 py-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Пеноплекс Основа</h1>
          <p className="text-gray-200 max-w-2xl">
            Пеноплекс — российская компания, производитель тепло- и гидроизоляционных, а также декоративно-отделочных
            материалов на основе полимеров. основной вид продукции — теплоизоляционные плиты из экструзионного
            пенополистирола.
          </p>
          <div className="flex gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-white opacity-100" />
            <span className="w-2 h-2 rounded-full bg-white opacity-50" />
            <span className="w-2 h-2 rounded-full bg-white opacity-50" />
            <span className="w-2 h-2 rounded-full bg-white opacity-50" />
          </div>
        </div>
      </div>
    )
  }
  
  