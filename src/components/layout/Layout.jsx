import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp, Globe, Menu, MessageSquare, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { company } from '../../data/company';
import { whatsappUrl } from '../../lib/forms';
import { useConsent } from '../../context/ConsentContext';
import CookieBanner from '../CookieBanner';
import './Layout.css';

const ThreeBackground = lazy(() => import('../ThreeBackground'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

// Skip the decorative 3D layer on low-end devices (few cores / little memory).
function isLowPowerDevice() {
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  return cores <= 2 || memory <= 2;
}

export default function Layout() {
  const { lang, setLang, t } = useLanguage();
  const { openSettings } = useConsent();
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('wgf-portfolio-theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [enable3d, setEnable3d] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    setEnable3d(!reduced && !mobile && !isLowPowerDevice() && supportsWebGL());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light-mode');
    else root.classList.remove('light-mode');
    localStorage.setItem('wgf-portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['/', t.nav.home],
    ['/portfolio', t.nav.portfolio],
    ['/technology', t.nav.technology],
    ['/markets', t.nav.markets],
    ['/about', t.nav.about],
    ['/founder', t.nav.founder],
    ['/investors', t.nav.investors],
    ['/partners', t.nav.partners],
    ['/contact', t.nav.contact],
  ];

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        {lang === "PT" ? "Saltar para o conteúdo" : lang === "FR" ? "Aller au contenu" : "Skip to content"}
      </a>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-glow-2" />
      {enable3d && (
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      )}

      <header className="main-header glass-effect">
        <Link to="/" className="logo-container" aria-label={company.name}>
          <img src={company.assets.symbol3d} alt="WGF Technologies" className="logo-symbol" />
        </Link>

        <nav className="main-nav desktop-nav" aria-label="Primary">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary nav-cta">
            {t.nav.cta}
          </Link>
        </nav>

        <div className="header-tools">
          <div className="lang-switcher-container" role="group" aria-label="Language">
            <Globe size={16} className="lang-icon" aria-hidden />
            {['PT', 'EN', 'FR'].map((code) => (
              <button
                key={code}
                type="button"
                className={`lang-btn ${lang === code ? 'active' : ''}`}
                aria-pressed={lang === code}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLang(code);
                }}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-drawer glass-effect">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <main id="main-content" className="page-main" key={lang} tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-row">
              <img src={company.assets.symbol3d} alt="" className="footer-brand-img" />
              <div className="footer-brand">WGF Technologies</div>
            </div>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            {links.slice(1).map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <Link to="/privacy">{t.footer.privacy}</Link>
            <Link to="/terms">{t.footer.terms}</Link>
            <Link to="/cookies">{t.footer.cookies}</Link>
            <button type="button" className="footer-link-btn" onClick={openSettings}>
              {t.consent.settings}
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.rights}</p>
          <p>{t.footer.location}</p>
        </div>
      </footer>

      <div className="floating-actions-container">
        <a
          href={whatsappUrl('Hello WGF Technologies, I would like to connect.')}
          target="_blank"
          rel="noreferrer"
          className="floating-action-btn whatsapp-float-btn"
          title="WhatsApp"
          aria-label="WhatsApp"
        >
          <MessageSquare size={22} />
        </a>
        {showTop && (
          <button
            type="button"
            className="floating-action-btn back-to-top-btn"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>

      <CookieBanner />
    </div>
  );
}
