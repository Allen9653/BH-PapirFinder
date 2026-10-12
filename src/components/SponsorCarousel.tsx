import { useEffect, useState } from 'react';
import { getSponsors, Sponsor } from '@/lib/auth';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const SponsorCarousel = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const activeSponsors = getSponsors().filter((s) => s.active);
    setSponsors(activeSponsors);
  }, []);

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {sponsors.map((sponsor) => (
            <CarouselItem key={sponsor.id}>
              <div className="p-4">
                {sponsor.link ? (
                  <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={sponsor.imageUrl}
                      alt="Sponsor"
                      className="w-full h-48 object-contain rounded-lg hover:opacity-90 transition-opacity"
                    />
                  </a>
                ) : (
                  <img
                    src={sponsor.imageUrl}
                    alt="Sponsor"
                    className="w-full h-48 object-contain rounded-lg"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default SponsorCarousel;