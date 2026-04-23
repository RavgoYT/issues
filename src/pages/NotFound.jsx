// src/pages/NotFound.jsx
import { motion } from 'framer-motion'

export default function NotFound({ message = "This form doesn't exist or isn't available." }) {
  return (
    <div className="app">
      <motion.div
        className="form-shell"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ justifyContent: 'center' }}
      >
        <div className="submit-screen">
          <div className="submit-icon" style={{ fontSize: 24 }}>✕</div>
          <div className="submit-title">Not available.</div>
          <div className="submit-subtitle">{message}</div>
        </div>
      </motion.div>
    </div>
  )
}