"use client";

import React, { useEffect, useState } from 'react';
import { RiBook2Line, RiGithubLine, RiPuzzle2Line } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface FooterProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (onVisibilityChange) {
          onVisibilityChange(visible);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, [onVisibilityChange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <footer 
      id="footer" 
      className="w-full py-6"
    >
      <motion.div 
        className="w-full max-w-[623px] mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            className="text-[#1e1e1e] text-center text-xl md:text-2xl leading-tight mb-6"
            variants={itemVariants}
          >
            Ready to supercharge your AI agents? Dive into Astreus and start building powerful conversational experiences.
          </motion.div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <Button 
                  icon={<RiBook2Line size={20} />}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium relative">
                    Documentation
                    <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-[#1e1e1e] transform -translate-y-1/2"></span>
                  </span>
                </Button>
                <div className="absolute -top-3 -right-2 bg-[#1e1e1e] text-white text-xs px-2 py-1 transform rotate-3">
                  Coming Soon
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <Button 
                  icon={<RiPuzzle2Line size={20} />}
                  href="/plugins"
                  target="_self"
                >
                  Plugin Library
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="mx-auto"
            >
              <Button 
                icon={<RiGithubLine size={20} />}
                href="https://github.com/astreus-ai"
                {...{ target: "_blank" }}
              >
                View on GitHub
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center text-lg text-[#1e1e1e] mt-8"
            variants={itemVariants}
          >
            <p>Astreus is open source.</p>
            <p>Build your best AI agents and shoot for the stars!</p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
