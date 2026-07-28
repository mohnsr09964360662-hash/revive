import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaProjectDiagram,
  FaHandsHelping,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaHeartbeat,
  FaLaptopCode,
  FaPaintBrush,
  FaArrowRight,
  FaBrain,
  FaMicrochip,
  FaRobot,
} from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import './Home.css';
import logo from '../assets/logo.png';
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';

/* -------------------------------------------------- */
/* Reusable animated counter hook                     */
/* -------------------------------------------------- */
function useCountUp(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

/* -------------------------------------------------- */
/* Stat Item with IntersectionObserver                */
/* -------------------------------------------------- */
function StatItem({ icon, number, suffix, label, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(number, 2000, inView);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

/* ================================================== */
/* HOME PAGE COMPONENT                                */
/* ================================================== */
export default function Home() {
  const { t, isRTL } = useLanguage();

  /* ---------- Hero animation variants ---------- */
  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  /* ---------- Programs data ---------- */
  const programs = [
    {
      img: img1,
      icon: <FaGraduationCap />,
      titleKey: 'home.programs.education.title',
      titleFallbackAr: 'التعليم والدعم الأكاديمي',
      titleFallbackEn: 'Education & Academic Support',
      descKey: 'home.programs.education.desc',
      descFallbackAr:
        'نوفر برامج تعليمية شاملة تشمل دروس التقوية والمنح الدراسية ودورات تطوير المهارات.',
      descFallbackEn:
        'Comprehensive educational programs including tutoring, scholarships, and skills development courses.',
    },
    {
      img: img2,
      icon: <FaHeartbeat />,
      titleKey: 'home.programs.health.title',
      titleFallbackAr: 'الصحة والدعم النفسي',
      titleFallbackEn: 'Health & Psychosocial Support',
      descKey: 'home.programs.health.desc',
      descFallbackAr:
        'خدمات صحية ونفسية للأفراد والعائلات تشمل الاستشارات والعلاج والتوعية الصحية.',
      descFallbackEn:
        'Health and psychosocial services for individuals and families including counseling, therapy, and health awareness.',
    },
    {
      img: img3,
      icon: <FaLaptopCode />,
      titleKey: 'home.programs.technology.title',
      titleFallbackAr: 'التكنولوجيا والابتكار',
      titleFallbackEn: 'Technology & Innovation',
      descKey: 'home.programs.technology.desc',
      descFallbackAr:
        'دورات في البرمجة والذكاء الاصطناعي والتصميم الرقمي لتمكين الشباب تقنياً.',
      descFallbackEn:
        'Programming, AI, and digital design courses to empower youth through technology.',
    },
    {
      img: img4,
      icon: <FaPaintBrush />,
      titleKey: 'home.programs.culture.title',
      titleFallbackAr: 'الثقافة والفنون',
      titleFallbackEn: 'Culture & Arts',
      descKey: 'home.programs.culture.desc',
      descFallbackAr:
        'أنشطة ثقافية وفنية تعزز الهوية وتنمي المواهب من خلال الرسم والموسيقى والمسرح.',
      descFallbackEn:
        'Cultural and artistic activities that strengthen identity and nurture talents through art, music, and theater.',
    },
  ];

  /* ---------- AI courses data ---------- */
  const aiCourses = [
    {
      icon: <FaBrain />,
      titleAr: 'أساسيات الذكاء الاصطناعي',
      titleEn: 'AI Fundamentals',
      descAr: 'تعرف على مفاهيم الذكاء الاصطناعي الأساسية وتطبيقاته في الحياة اليومية والمجالات المختلفة.',
      descEn:
        'Learn core AI concepts and their applications in everyday life and various fields.',
    },
    {
      icon: <FaMicrochip />,
      titleAr: 'تعلم الآلة',
      titleEn: 'Machine Learning',
      descAr: 'استكشف خوارزميات تعلم الآلة وكيفية بناء نماذج ذكية لحل المشكلات الحقيقية.',
      descEn:
        'Explore machine learning algorithms and how to build intelligent models to solve real problems.',
    },
    {
      icon: <FaRobot />,
      titleAr: 'الروبوتات وإنترنت الأشياء',
      titleEn: 'Robotics & IoT',
      descAr: 'تعلم تصميم وبرمجة الروبوتات وربط الأجهزة الذكية في مشاريع عملية مبتكرة.',
      descEn:
        'Learn to design and program robots and connect smart devices in innovative practical projects.',
    },
  ];

  /* ---------- Card stagger animation ---------- */
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  /* ---------- helper to resolve translation key with fallback ---------- */
  const txt = (key, fallbackAr, fallbackEn) => {
    const resolved = t(key);
    // If the t() function just returns the key unchanged, use fallback
    if (resolved === key || !resolved) {
      return isRTL ? fallbackAr : fallbackEn;
    }
    return resolved;
  };

  /* ================================================ */
  /* RENDER                                           */
  /* ================================================ */
  return (
    <div className="home-page">
      {/* ====================== HERO ====================== */}
      <section className="hero-section">
        {/* Watermark */}
        <div className="hero-watermark" />

        {/* Floating particles */}
        <div className="hero-particles">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="hero-particle" />
          ))}
        </div>

        {/* Floating shapes */}
        <div className="hero-shape hero-shape--square" />
        <div className="hero-shape hero-shape--triangle" />
        <div className="hero-shape hero-shape--circle" />
        <div className="hero-shape hero-shape--diamond" />

        {/* Content */}
        <motion.div
          className="hero-content"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={logo}
            alt="REVIVE Logo"
            className="hero-logo"
            variants={heroItem}
          />

          <motion.h1 className="hero-title" variants={heroItem}>
            {isRTL ? 'مؤسسة إحياء' : 'REVIVE Foundation'}
          </motion.h1>

          <motion.p className="hero-subtitle" variants={heroItem}>
            {isRTL ? 'مخيم اليرموك' : 'Yarmouk Camp'}
          </motion.p>

          <motion.p className="hero-vision" variants={heroItem}>
            {isRTL
              ? 'نعمل على بناء مجتمع متمكّن ومستدام من خلال التعليم والتكنولوجيا والدعم الاجتماعي لتمكين الأفراد وتحقيق التنمية الشاملة.'
              : 'Building an empowered and sustainable community through education, technology, and social support to enable individuals and achieve comprehensive development.'}
          </motion.p>

          <motion.div variants={heroItem}>
            <Link to="/programs" className="hero-cta">
              {isRTL ? 'اكتشف برامجنا' : 'Discover Our Programs'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Wave divider */}
        <div className="hero-wave">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64 C288,120 720,0 1440,64 L1440,120 L0,120 Z"
              fill="#27a768"
            />
          </svg>
        </div>
      </section>

      {/* ====================== STATS ====================== */}
      <section className="stats-section">
        <div className="stats-container">
          <StatItem
            icon={<FaUsers />}
            number={500}
            suffix="+"
            label={isRTL ? 'مستفيد' : 'Beneficiaries'}
            delay={0}
          />
          <StatItem
            icon={<FaProjectDiagram />}
            number={15}
            suffix="+"
            label={isRTL ? 'برنامج' : 'Programs'}
            delay={0.1}
          />
          <StatItem
            icon={<FaHandsHelping />}
            number={50}
            suffix="+"
            label={isRTL ? 'متطوع' : 'Volunteers'}
            delay={0.2}
          />
          <StatItem
            icon={<FaMapMarkerAlt />}
            number={4}
            suffix=""
            label={isRTL ? 'مجالات رئيسية' : 'Main Areas'}
            delay={0.3}
          />
        </div>
      </section>

      {/* ====================== PROGRAMS ====================== */}
      <section className="programs-section">
        <div className="programs-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              {isRTL ? 'برامجنا' : 'Our Programs'}
            </h2>
            <div className="section-underline" />
            <p className="section-description">
              {isRTL
                ? 'نقدم مجموعة متنوعة من البرامج المصممة لتلبية احتياجات مجتمعنا وتمكين أفراده.'
                : 'We offer a diverse range of programs designed to meet the needs of our community and empower its members.'}
            </p>
          </motion.div>

          <motion.div
            className="programs-grid"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="program-card"
                variants={cardVariants}
              >
                <div className="program-card-image-wrapper">
                  <img
                    src={program.img}
                    alt={isRTL ? program.titleFallbackAr : program.titleFallbackEn}
                    className="program-card-image"
                    loading="lazy"
                  />
                  <div className="program-card-badge">{program.icon}</div>
                </div>
                <div className="program-card-body">
                  <h3 className="program-card-title">
                    {txt(program.titleKey, program.titleFallbackAr, program.titleFallbackEn)}
                  </h3>
                  <p className="program-card-desc">
                    {txt(program.descKey, program.descFallbackAr, program.descFallbackEn)}
                  </p>
                  <Link to="/programs" className="program-card-link">
                    {isRTL ? 'اقرأ المزيد' : 'Learn More'}
                    <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ====================== CTA ====================== */}
      <section className="cta-section">
        {/* Pattern overlay */}
        <div className="cta-pattern" />

        {/* Decorative circles */}
        <div className="cta-decor cta-decor--1" />
        <div className="cta-decor cta-decor--2" />
        <div className="cta-decor cta-decor--3" />
        <div className="cta-decor cta-decor--4" />

        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="cta-title">
            {isRTL ? 'انضم إلينا' : 'Join Us'}
          </h2>
          <p className="cta-text">
            {isRTL
              ? 'كن جزءاً من رحلتنا في بناء مجتمع أفضل. سواء كنت متطوعاً أو مستفيداً أو شريكاً، معاً نصنع الفرق.'
              : 'Be part of our journey in building a better community. Whether you\'re a volunteer, beneficiary, or partner — together we make a difference.'}
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn cta-btn--primary">
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </Link>
            <Link to="/programs" className="cta-btn cta-btn--outline">
              {isRTL ? 'برامجنا' : 'Our Programs'}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
