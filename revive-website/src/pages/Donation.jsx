import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import './Donation.css';

const Donation = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const projects = [
    { id: 1, name: t('donation.project1') },
    { id: 2, name: t('donation.project2') },
    { id: 3, name: t('donation.project3') }
  ];

  return (
    <div className="donation-page">
      <div className="page-header">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp}>{t('donation.title')}</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="header-desc">
            {t('donation.desc')}
          </motion.p>
        </div>
      </div>

      <section className="donation-section section-padding bg-light">
        <div className="container">
          <motion.div className="donation-form-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2>{t('donation.formTitle')}</h2>
            <form className="donation-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>{t('donation.projectName')}</label>
                <select required defaultValue="">
                  <option value="" disabled>{t('donation.projectName')}</option>
                  {projects.map(proj => (
                    <option key={proj.id} value={proj.id}>{proj.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('donation.amount')}</label>
                <input type="number" min="1" placeholder="50" required />
              </div>

              <div className="form-group">
                <label>{t('donation.name')}</label>
                <input type="text" placeholder={t('donation.name')} required />
              </div>

              <div className="form-group">
                <label>{t('donation.email')}</label>
                <input type="email" placeholder={t('donation.email')} required />
              </div>

              <button type="submit" className="btn-primary donate-submit-btn">
                {t('donation.donateBtn')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donation;
