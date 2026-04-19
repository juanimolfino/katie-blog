import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data';

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-2xl font-medium text-black transition-transform duration-300"
          >
            <svg 
              viewBox="0 0 32 32" 
              fill="none" 
              className="w-8 h-8 text-ocean"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 3C10 8 4 12 4 19C4 25 9.5 29 16 29C22.5 29 28 25 28 19C28 12 22 8 16 3Z" />
              <circle cx="16" cy="18" r="3" fill="currentColor" stroke="none" />
              <path d="M16 8C13 11 11 13 11 16" strokeLinecap="round" />
              <path d="M16 8C19 11 21 13 21 16" strokeLinecap="round" />
            </svg>
            <span>What Katie Seas</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${
                  isActive(item.href) ? 'text-ocean after:w-full' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:text-ocean transition-colors"
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-white/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`font-display text-3xl font-light transition-all duration-300 hover:text-ocean ${
                isActive(item.href) ? 'text-ocean' : ''
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
