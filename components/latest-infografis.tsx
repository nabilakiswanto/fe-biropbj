'use client'

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InfographicCard from './infographic-card';
import EmptyState from './empty-state';

interface Infographic {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

interface LatestInfographicsSliderProps {
  latestInfographics: Infographic[];
}

export default function LatestInfographicsSlider({ latestInfographics }: LatestInfographicsSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Infografis Terkini</h2>
        <Button asChild variant="outline">
          <Link href="/infografis">
            Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {latestInfographics.length > 0 ? (
        <div className="relative">
          {/* Arrow buttons */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
            disabled={!canScrollPrev}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {latestInfographics.map((infographic) => (
                <div key={infographic.id} className="min-w-[80%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] xl:min-w-[20%] 2xl:min-w-[20%]">
                  <InfographicCard
                    title={infographic.title}
                    imageUrl={infographic.imageUrl}
                    slug={infographic.slug}
                    category='infografis'
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
            disabled={!canScrollNext}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <EmptyState
          title="Belum Ada Infografis"
          description="Belum ada infografis yang tersedia saat ini. Silakan kunjungi kembali nanti."
        />
      )}
    </section>
  );
}