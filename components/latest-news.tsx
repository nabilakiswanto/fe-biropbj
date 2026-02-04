'use client'
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogCard from './blog-card';
import EmptyState from './empty-state';
type NewsItem = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    slug: string;
  };
  
  interface LatestNewsSliderProps {
    latestNews: NewsItem[];
  }
  
  export default function LatestNewsSlider({ latestNews }: LatestNewsSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
  
    return (
      <section className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary">Berita Terkini</h2>
          <Button asChild variant="outline">
            <Link href="/berita">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
  
        {latestNews.length > 0 ? (
          isMobile ? (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {latestNews.map((news) => (
                  <div key={news.id} className="min-w-[80%] sm:min-w-[60%]">
                    <BlogCard
                      title={news.title}
                      excerpt={news.excerpt}
                      date={news.date}
                      imageUrl={news.imageUrl}
                      slug={news.slug}
                      category="berita"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <BlogCard
                  key={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  date={news.date}
                  imageUrl={news.imageUrl}
                  slug={news.slug}
                  category="berita"
                />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            title="Belum Ada Berita"
            description="Belum ada berita yang tersedia saat ini. Silakan kunjungi kembali nanti."
          />
        )}
      </section>
    );
  }
  