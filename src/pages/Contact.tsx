import { useState, useEffect, useRef } from 'react';
import { Send, Check, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { siteConfig, partners } from '@/data';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-body text-sm font-medium tracking-[2px] uppercase text-black/50 mb-6 block">
              work with me
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-8">
              Let's Create Something Amazing Together
            </h1>
            <p className="font-body text-lg leading-relaxed text-black/70 max-w-2xl mx-auto">
              I love to share my knowledge and experiences with brands that align with my values. 
              Whether it's sponsored content, brand partnerships, or collaborations, I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              <h2 className="font-display text-3xl font-light mb-8">
                contact me
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-body text-sm text-black/70 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-black/10 font-body text-base focus:outline-none focus:border-ocean transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-body text-sm text-black/70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-black/10 font-body text-base focus:outline-none focus:border-ocean transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-body text-sm text-black/70 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/10 font-body text-base focus:outline-none focus:border-ocean transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body text-sm text-black/70 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-black/10 font-body text-base focus:outline-none focus:border-ocean transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-ocean w-full justify-center"
                  >
                    <Send className="w-5 h-5" />
                    <span>SUBMIT</span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl mb-2">Thank you!</h3>
                  <p className="font-body text-black/70">
                    I'll get back to you as soon as possible.
                  </p>
                </div>
              )}
            </div>

            {/* Info */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="space-y-8">
                {/* Bio */}
                <div>
                  <p className="font-body text-base leading-relaxed text-black/70">
                    Over the past few years, I've built a community of ocean enthusiasts 
                    who trust my recommendations and value my authentic perspective. 
                    Let's work together to create content that inspires and engages.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-ocean/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <span className="font-body text-sm text-black/50 block">Email</span>
                      <a
                        href="mailto:whatkatieseas@gmail.com"
                        className="font-body text-base hover:text-ocean transition-colors"
                      >
                        whatkatieseas@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-ocean/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <span className="font-body text-sm text-black/50 block">Location</span>
                      <span className="font-body text-base">
                        Currently on Heron Island, Great Barrier Reef
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <span className="font-body text-sm text-black/50 mb-4 block">Follow me</span>
                  <div className="flex gap-4">
                    {siteConfig.social.instagram && (
                      <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-black/5 flex items-center justify-center hover:bg-ocean hover:text-white transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {siteConfig.social.youtube && (
                      <a
                        href={siteConfig.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-black/5 flex items-center justify-center hover:bg-ocean hover:text-white transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                    {siteConfig.social.pinterest && (
                      <a
                        href={siteConfig.social.pinterest}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-black/5 flex items-center justify-center hover:bg-ocean hover:text-white transition-colors"
                        aria-label="Pinterest"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.071 3.151 9.405 7.601 11.151-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.669.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.569-.994 3.995-.283 1.195.599 2.169 1.777 2.169 2.132 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.739.098.119.112.223.083.344-.091.379-.293 1.195-.334 1.363-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.966 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.747 2.848c-.271 1.043-1.002 2.35-1.492 3.146A12.016 12.016 0 0 0 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Partners */}
                <div className="pt-8 border-t border-black/10">
                  <span className="font-body text-sm text-black/50 mb-4 block">Partners</span>
                  <div className="flex flex-wrap gap-4">
                    {partners.slice(0, 3).map((partner: { name: string; logo: string }) => (
                      <span
                        key={partner.name}
                        className="font-display text-sm font-medium text-black/30"
                      >
                        {partner.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
