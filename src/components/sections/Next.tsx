import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { nextStops } from "@/data";

export function NextStops() {
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
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:pt-10 lg:pb-20 bg-gray-50">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* MAPA */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h2
              className={`font-display text-5xl md:text-6xl lg:text-7xl font-light transition-all duration-700  text-terracotta/80 pb-10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Next Up
            </h2>
            <div className="group relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/home/next_destinations.jpg"
                alt="Next destinations"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay suave */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* TEXTO */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            {/* Eyebrow */}
            <span className="text-sm uppercase tracking-[0.25em] text-terracotta/80">
              Up Next
            </span>

            {/* Título */}
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-black leading-tight">
              Where we’re heading next
            </h2>

            {/* Descripción */}
            <p className="mt-4 text-black/60 text-lg max-w-md">
              New oceans, new cultures, and places we’re excited to explore
              soon.
            </p>

            {/* Lista */}
            <ul className="mt-8 space-y-4">
              {nextStops.map((stop, index) => (
                <li
                  key={index}
                  className={`group flex items-center justify-between border-b border-black/10 pb-3 transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 120 + 500}ms`,
                  }}
                >
                  <span className="font-body text-lg text-black/80 group-hover:text-terracotta transition-colors">
                    {stop.country}
                  </span>

                  <ArrowRight className="w-5 h-5 text-terracotta transition-transform duration-300 group-hover:translate-x-2" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
