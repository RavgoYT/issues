// src/components/PageTransition.jsx
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function PageTransition({ children, pageKey, direction }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pageKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
