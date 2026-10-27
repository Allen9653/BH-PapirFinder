import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CitySlide {
  name: string;
  image: string;
  alt: string;
}

const cities: CitySlide[] = [
  {
    name: 'Mostar',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop&q=80',
    alt: 'Stari most u Mostaru',
  },
  {
    name: 'Sarajevo',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=400&fit=crop&q=80',
    alt: 'Baščaršija u Sarajevu',
  },
  {
    name: 'Jajce',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d2729906?w=600&h=400&fit=crop&q=80',
    alt: 'Vodopad i stari grad Jajce',
  },
  {
    name: 'Banja Luka',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Kastel_Banja_Luka.jpg/640px-Kastel_Banja_Luka.jpg',
    alt: 'Tvrđava Kastel u Banjoj Luci',
  },
  {
    name: 'Travnik',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&h=400&fit=crop&q=80',
    alt: 'Stari grad Travnik',
  },
  {
    name: 'Zenica',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&h=400&fit=crop&q=80',
    alt: 'Panorama grada Zenica',
  },
];

const CityCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const visibleCount = 3;
  const maxIndex = cities.length - visibleCount;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto my-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {cities.map((city, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="relative group overflow-hidden rounded-xl cursor-pointer h-48 md:h-56">
                <img
                  src={city.image}
                  alt={city.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* City name label */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 font-semibold text-sm px-3 py-1.5 rounded-md shadow-sm">
                    {city.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-md'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CityCarousel;