import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`p-6 bg-white border-2 border-black rounded-lg shadow-3d ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;