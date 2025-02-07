import { useState } from 'react'
import image57 from '../assets/image 57.png'

export default function Header () {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      title: 'Пеноплекс Основа',
      description:
        'Пеноплэкс» — российская компания, производитель тепло- и гидроизоляционных, а также декоративно-отделочных материалов на основе полимеров, основной вид продукции — теплоизоляционные плиты из экструзионного пенополистирола',
      image: image57
    }
  ]

  return (
    <div className='container-full '>
      <header
        className='max-w-7xl mx-auto px-4 pt-[60px]'
        style={{ borderRadius: '20px' }}
      >
        <div className='relative h-[400px] mt-4'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className='absolute inset-0'>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='w-full h-full object-cover'
                  style={{ borderRadius: '20px' }}
                />
                <div
                  style={{
                    borderRadius: '20px'
                  }}
                  className='absolute inset-0'
                />
              </div>

              <div className='relative h-full max-w-7xl mx-auto px-4 py-12 flex flex-col justify-center'>
                <h1 className='text-4xl font-bold text-white mb-4'>
                  {slide.title}
                </h1>
                <p className='text-lg text-gray-200 max-w-2xl'>
                  {slide.description}
                </p>

                <div className='absolute bottom-8 left-4 flex gap-2'>
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index ? 'w-8' : 'bg-white/50'
                      }`}
                    >
                      <span className='sr-only'>Slide {index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  )
}
