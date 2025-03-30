import React from "react";
import LayoutClient from "@/layout/layout-client";
import CarouselImage from "@/components/app/carousel";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const HomeClient = () => {
  const [lang] = useTranslation("client");
  const isMobile = useIsMobile();

  return (
    <LayoutClient>
      <motion.p
        className='mb-2 text-lg md:text-xl font-semibold tracking-tighter md:tracking-wide'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}>
        {lang("home.header")}
      </motion.p>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}>
        <CarouselImage delay={5000} height={isMobile ? 180 : 400} />
      </motion.div>

      <motion.p
        className='text-lg md:text-xl mt-3'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}>
        {lang("home.tip-h")}
      </motion.p>
      <motion.p
        className='mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}>
        {lang("home.tip-con")}
      </motion.p>

      <motion.div
        className='space-y-6'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}>
        {[1, 2, 3].map((_, index) => (
          <React.Fragment key={index}>
            <motion.p
              className='text-base md:text-lg font-semibold text-blue-600 dark:text-blue-400'
              variants={fadeInRight}>
              {lang("home.find-h")}
            </motion.p>
            <motion.p
              className='text-sm sm:text-base text-justify text-gray-600 dark:text-gray-300'
              variants={fadeInRight}>
              {lang("home.find-con")}
            </motion.p>
          </React.Fragment>
        ))}
      </motion.div>
    </LayoutClient>
  );
};

export default HomeClient;
