import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaBrain, FaRobot, FaPython, FaEye, FaCommentDots, FaMicrochip } from 'react-icons/fa';
import './AICourses.css';

const AICourses = () => {
  const { t } = useLanguage();

  const courses = [
    {
      id: 1,
      icon: <FaBrain />,
      title: t('ai.fundamentals'),
      desc: t('ai.fundamentalsDesc'),
      level: t('ai.beginner'),
      duration: '4 Weeks'
    },
    {
      id: 2,
      icon: <FaMicrochip />,
      title: t('ai.ml'),
      desc: t('ai.mlDesc'),
      level: t('ai.intermediate'),
      duration: '6 Weeks'
    },
    {
      id: 3,
      icon: <FaPython />,
      title: t('ai.python'),
      desc: t('ai.pythonDesc'),
      level: t('ai.beginner'),
      duration: '5 Weeks'
    },
    {
      id: 4,
      icon: <FaEye />,
      title: t('ai.cv'),
      desc: t('ai.cvDesc'),
      level: t('ai.advanced'),
      duration: '8 Weeks'
    },
    {
      id: 5,
      icon: <FaCommentDots />,
      title: t('ai.nlp'),
      desc: t('ai.nlpDesc'),
      level: t('ai.advanced'),
      duration: '8 Weeks'
    },
    {
      id: 6,
      icon: <FaRobot />,
      title: t('ai.robotics'),
      desc: t('ai.roboticsDesc'),
      level: t('ai.intermediate'),
      duration: '10 Weeks'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="ai-page">
      <div className="ai-header">
        <div className="particles"></div>
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="glowing-text">
            {t('ai.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="ai-desc">
            {t('ai.desc')}
          </motion.p>
        </div>
      </div>

      <section className="courses-section section-padding">
        <div className="container">
          <motion.div className="courses-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {courses.map(course => (
              <motion.div key={course.id} className="glass-card" variants={fadeInUp}>
                <div className="course-icon">{course.icon}</div>
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <div className="course-meta">
                  <span className="badge">{course.level}</span>
                  <span className="duration">{course.duration}</span>
                </div>
                <button className="btn-register">{t('ai.registerBtn')}</button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AICourses;
