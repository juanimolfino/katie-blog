import { useEffect, useRef, useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
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
      <section className="py-24 lg:py-32 bg-cream">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-body text-sm font-medium tracking-[2px] uppercase text-black/50 mb-6 block">
              about me
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-8">
              Hey there, my name is {siteConfig.author.name} and I am one of the top bloggers out there!
            </h1>
            <p className="font-body text-lg leading-relaxed text-black/70 max-w-2xl mx-auto">
              {siteConfig.author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
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
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-terracotta/10 -z-10" />
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
              <span className="font-display text-xl italic text-terracotta mb-4 block">
                travel advice blogger
              </span>
              
              <p className="font-body text-base leading-relaxed text-black/70 mb-8">
                Over the past 10 years, I've been sharing my travel experiences, tips, and recommendations 
                with a growing community of adventure seekers. My goal is to inspire people to explore 
                the world, step out of their comfort zones, and create unforgettable memories.
              </p>

              <p className="font-body text-base leading-relaxed text-black/70 mb-8">
                From solo backpacking trips through Southeast Asia to luxury escapes in the Maldives, 
                I cover a wide range of travel styles and budgets. Whether you're a seasoned traveler 
                or planning your first trip, you'll find valuable insights and inspiration here.
              </p>

              {/* Subscribe CTA */}
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-3 group mb-12"
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
                  href="mailto:contact@travelblog.com"
                  className="font-display text-2xl text-terracotta hover:underline"
                >
                  contact@travelblog.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen In */}
      <section className="py-16 bg-cream border-y border-black/5">
        <div className="section-padding">
          <h3 className="font-display text-2xl md:text-3xl font-light text-center mb-12">
            As seen in:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <span
                key={partner.name}
                className="font-display text-lg md:text-xl font-medium text-black/30 tracking-wider"
              >
                {partner.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Me CTA */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Work with me
            </h2>
            <p className="font-body text-base leading-relaxed text-black/70 mb-8">
              I'm always open to collaborations, sponsored content, and partnerships 
              with brands that align with my values and resonate with my audience.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-3 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
