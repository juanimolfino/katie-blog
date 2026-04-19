import { Link } from 'react-router-dom';
import { navigation, siteConfig } from '@/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl font-light mb-4">
              Get in Contact
            </h3>
            <a
              href="mailto:hello@whatkatieseas.com"
              className="font-body text-white/80 hover:text-white transition-colors"
            >
              hello@whatkatieseas.com
            </a>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg 
                viewBox="0 0 32 32" 
                fill="none" 
                className="w-12 h-12 text-white/90"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M16 3C10 8 4 12 4 19C4 25 9.5 29 16 29C22.5 29 28 25 28 19C28 12 22 8 16 3Z" />
                <circle cx="16" cy="18" r="3" fill="currentColor" stroke="none" />
                <path d="M16 8C13 11 11 13 11 16" strokeLinecap="round" />
                <path d="M16 8C19 11 21 13 21 16" strokeLinecap="round" />
                <path d="M12 24C14 26 18 26 20 24" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
                <circle cx="20" cy="16" r="1" fill="currentColor" stroke="none" />
              </svg>
            </Link>
            <span className="font-display text-lg">What Katie Seas</span>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h3 className="font-display text-2xl md:text-3xl font-light mb-4">
              Follow me
            </h3>
            <div className="flex justify-center md:justify-end gap-6">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <nav className="flex flex-wrap justify-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="font-body text-sm text-white/50 text-center">
              &copy; {currentYear} What Katie Seas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
