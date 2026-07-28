import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaGlobe } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/programs', label: t('nav.programs') },
    { to: '/about', label: t('nav.about') },
    { to: '/donation', label: t('nav.donation') },
    { to: '/ai-courses', label: t('nav.aiCourses') },
    { to: '/contact', label: t('nav.contact') },
  ];

  // Framer-motion variants for mobile menu
  const isRtl = language === 'ar';
  const slideFrom = isRtl ? 320 : -320;

  const menuVariants = {
    closed: { x: slideFrom, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      x: slideFrom,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" className="navbar-logo-link" aria-label="REVIVE Home">
        <div className="navbar-logo-wrapper">
          <img
            src={logo}
            alt="REVIVE Logo"
            className="navbar-logo-img"
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <ul className="navbar-links">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Language Switcher (desktop) */}
      <div className="lang-switcher">
        <button
          className="lang-btn"
          onClick={toggleLanguage}
          aria-label="Switch language"
        >
          <FaGlobe className="globe-icon" />
          {language === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>

      {/* Hamburger */}
      <button
        className={`hamburger${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="exit"
              onClick={closeMobile}
            />
            <motion.div
              className="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <ul className="mobile-menu-links">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-lang-switcher">
                <button
                  className="lang-btn mobile-lang-btn"
                  onClick={() => { toggleLanguage(); closeMobile(); }}
                >
                  <FaGlobe className="globe-icon" />
                  {language === 'ar' ? 'English' : 'عربي'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
