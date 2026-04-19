import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your API
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/newsletter-bg.jpg"
          alt="Newsletter background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className={`font-display text-4xl md:text-5xl font-light text-white mb-8 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Subscribe to
            <br />
            receive travel tips
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {!isSubmitted ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white text-black font-body text-base placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center justify-center gap-3 whitespace-nowrap"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 text-white py-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <span className="font-body text-lg">Thank you for subscribing!</span>
              </div>
            )}
          </form>

          <p
            className={`font-body text-sm text-white/60 mt-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
