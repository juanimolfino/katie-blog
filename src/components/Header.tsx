import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data';
import type { NavItem } from '@/types';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔒 Scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return location.pathname === '/';
      return location.pathname.startsWith(href);
    },
    [location.pathname]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      {/* Background */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isMobileMenuOpen
            ? 'bg-black' // 🔥 fuerza fondo cuando menú abierto
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-sm'
              : 'bg-transparent'
        }`}
      />

      {/* CONTENT */}
      <div className="relative section-padding">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-transform duration-300"
          >
            <img
              src={
                isScrolled || isMobileMenuOpen
                  ? '/images/Updblacklogo.png'
                  : '/images/Up3logowhite.png'
              }
              alt="What Katie Seas"
              className="h-12 w-auto"
            />

            <span
              className={`font-logo text-3xl font-medium transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-black' : 'text-white'
              }`}
            >
              What Katie Seas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item: NavItem) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative font-body text-base tracking-wide transition-colors duration-300 pb-1 ${
                  isActive(item.href)
                    ? isScrolled
                      ? 'text-ocean'
                      : 'text-white'
                    : isScrolled
                      ? 'text-black hover:text-ocean'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-ocean transition-all duration-200 ${
                    isActive(item.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            className={`lg:hidden p-2 relative z-50 transition-colors duration-300 ${
              isScrolled || isMobileMenuOpen
                ? 'text-black hover:text-ocean'
                : 'text-white hover:text-white/80'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 🔥 Mobile Menu FULLSCREEN */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } ${isScrolled ? 'bg-white/98' : 'bg-black/95'}`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navigation.map((item: NavItem) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={`font-display text-3xl font-light transition-colors duration-300 ${
                isActive(item.href)
                  ? 'text-ocean'
                  : isScrolled
                    ? 'text-black hover:text-ocean'
                    : 'text-white hover:text-white/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}