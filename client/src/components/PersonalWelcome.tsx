import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function PersonalWelcome() {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  if (!visible) return null;
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 mb-8 rounded-lg shadow-sm border border-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3 
        className="text-lg font-medium text-blue-800 mb-2"
        variants={itemVariants}
      >
        {t('personalWelcome.greeting')}
      </motion.h3>
      <motion.p 
        className="text-blue-600"
        variants={itemVariants}
      >
        {t('personalWelcome.message')}
      </motion.p>
    </motion.div>
  );
}