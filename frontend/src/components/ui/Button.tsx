import { motion } from 'framer-motion';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
};

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const colors = {
    primary: 'bg-secondary hover:bg-yellow-600 text-black',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-black',
    accent: 'bg-accent hover:bg-orange-600 text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: '2px 2px 0px 0px #000' }}
      whileTap={{ scale: 0.98, boxShadow: '1px 1px 0px 0px #000' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`px-6 py-2 font-semibold border-2 border-black rounded-md shadow-3d focus:outline-none ${colors[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;