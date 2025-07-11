import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

/**
 * Simple card with shadow, rounded corners and optional hover-lift.
 * Usage: <Card hover className="p-6"> … </Card>
 */
export default function Card({ children, className = '', hover = true, ...rest }) {
  return (
    <motion.div
      whileHover={hover ? { translateY: -4 } : false}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={clsx('bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow', className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}