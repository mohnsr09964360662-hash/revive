import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/donation', label: t('nav.donation') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const programLinks = [
    { to: '/programs', label: t('footer.educationProgram') },
    { to: '/programs', label: t('footer.psychosocialProgram') },
    { to: '/ai-courses', label: t('nav.aiCourses') },
    { to: '/programs', label: t('footer.communityProgram') },
  ];

  const socialLinks = [
    { href: 'https://www.facebook.com/share/1AsJViC2Py/', icon: <FaFacebookF />, className: 'facebook', label: 'Facebook' },
    { href: '#', icon: <FaInstagram />, className: 'instagram', label: 'Instagram' },
    { href: 'https://wa.me/963981896383', icon: <FaWhatsapp />, className: 'whatsapp', label: 'WhatsApp' },
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Column 1: About */}
        <div className="footer-col">
          <div className="footer-logo-wrapper">
            <img
              src={logo}
              alt="REVIVE Logo"
              className="footer-logo-img"
            />
          </div>
          <p className="footer-about-text">
            {t('footer.description')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>{t('footer.quickLinks')}</h3>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Programs */}
        <div className="footer-col">
          <h3>{t('footer.programs')}</h3>
          <ul className="footer-links">
            {programLinks.map((link, i) => (
              <li key={link.label + i}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-col">
          <h3>{t('footer.contactUs')}</h3>

          <div className="footer-contact-item">
            <span className="footer-contact-icon">
              <FaPhone />
            </span>
            <span className="footer-contact-text">
              <a href="tel:+963981896383">+963 981 896 383</a>
            </span>
          </div>



          <div className="footer-contact-item">
            <span className="footer-contact-icon">
              <FaEnvelope />
            </span>
            <span className="footer-contact-text">
              <a href="mailto:info@revive-sy.org">info@revive-sy.org</a>
            </span>
          </div>

          <div className="footer-contact-item">
            <span className="footer-contact-icon">
              <FaMapMarkerAlt />
            </span>
            <span className="footer-contact-text">
              {t('footer.location')}
            </span>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className={`footer-social-link ${social.className}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        © {new Date().getFullYear()} <span>REVIVE</span>. {t('footer.rights')}
      </div>
    </footer>
  );
};

export default Footer;
