import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig, partners } from '@/data';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-body text-sm font-medium tracking-[2px] uppercase text-black/50 mb-6 block">
              about me
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-8">
              Hey there, my name is {siteConfig.author.name}
            </h1>
            <p className="font-body text-lg leading-relaxed text-black/70 max-w-2xl mx-auto">
              {siteConfig.description}
            </p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={siteConfig.author.avatar}
                  alt={siteConfig.author.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-ocean/10 -z-10" />
              </div>
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <span className="font-display text-xl italic text-ocean mb-4 block">
                dive instructor & ocean explorer
              </span>
              
              <p className="font-body text-base leading-relaxed text-black/70 mb-8">
                Over the past few years, I've been sharing my diving experiences, travel tips, and ocean stories 
                with a growing community of ocean lovers. My goal is to inspire people to explore 
                the underwater world, respect our oceans, and create unforgettable memories.
              </p>

              <p className="font-body text-base leading-relaxed text-black/70 mb-8">
                From the Great Barrier Reef to the remote islands of Raja Ampat, 
                I cover a wide range of diving destinations and experiences. Whether you're a seasoned diver 
                or just starting out, you'll find valuable insights and inspiration here.
              </p>

              {/* Subscribe CTA */}
              <Link
                to="/contact"
                className="btn-ocean inline-flex items-center gap-3 group mb-12"
              >
                <Mail className="w-5 h-5" />
                <span>Subscribe</span>
              </Link>

              {/* Contact */}
              <div className="border-t border-black/10 pt-8">
                <span className="font-body text-sm text-black/50 mb-2 block">
                  Want to work with me?
                </span>
                <a
                  href="mailto:hello@whatkatieseas.com"
                  className="font-display text-2xl text-ocean hover:underline"
                >
                  hello@whatkatieseas.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="section-padding">
          <h3 className="font-display text-2xl md:text-3xl font-light text-center mb-12">
            Partners & Certifications:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner: { name: string; logo: string }) => (
              <span
                key={partner.name}
                className="font-display text-lg md:text-xl font-medium text-black/30 tracking-wider"
              >
                {partner.logo}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
