import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data';
import type { NavItem } from '@/types';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 SCROLL LOCK REAL (mobile safe)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
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
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50">
        
        {/* Background */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isMobileMenuOpen
              ? 'bg-black'
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
                  isScrolled || isMobileMenuOpen
                    ? 'text-black'
                    : 'text-white'
                }`}
              >
                What Katie Seas
              </span>
            </Link>

            {/* Desktop Nav */}
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
          </div>
        </div>
      </header>

      {/* 🔥 BOTÓN FIXED (SIEMPRE VISIBLE) */}
      <button
        className={`lg:hidden fixed top-6 right-6 z-[60] p-2 transition-colors duration-300 ${
          isMobileMenuOpen
            ? 'text-white'
            : isScrolled
              ? 'text-black hover:text-ocean'
              : 'text-white hover:text-white/80'
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Menu className="w-7 h-7" />
        )}
      </button>

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
    </>
  );
}