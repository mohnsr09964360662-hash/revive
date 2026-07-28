import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaEye, FaBullseye, FaHeart } from 'react-icons/fa';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp}>{t('about.title')}</motion.h1>
        </div>
      </div>

      <section className="about-story section-padding">
        <div className="container section-container">
          <motion.div className="about-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <img src="/assets/img1.jpeg" alt={t('about.ourStory')} />
          </motion.div>
          <motion.div className="about-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="section-title">{t('about.ourStory')}</h2>
            <p className="section-desc">{t('about.storyText')}</p>
          </motion.div>
        </div>
      </section>

      <section className="about-vms bg-light section-padding">
        <div className="container">
          <div className="vms-grid">
            <motion.div className="vms-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="vms-icon"><FaEye /></div>
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionDesc')}</p>
            </motion.div>
            <motion.div className="vms-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="vms-icon"><FaBullseye /></div>
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionDesc')}</p>
            </motion.div>
            <motion.div className="vms-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="vms-icon"><FaHeart /></div>
              <h3>{t('about.values')}</h3>
              <p>{t('about.valuesDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
