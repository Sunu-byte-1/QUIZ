import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg 
        shadow-md 
        border border-gray-200 dark:border-gray-700 
        p-4 sm:p-6 
        transition-all duration-300
        ${hover ? 'hover:shadow-lg hover:border-primary-dark dark:hover:border-primary-500 cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`mb-4 border-b border-gray-200 dark:border-gray-700 pb-4 ${className}`}>
    {children}
  </div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`text-xl sm:text-2xl font-bold text-primary-dark dark:text-primary-500 ${className}`}>
    {children}
  </h3>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 ${className}`}>
    {children}
  </div>
);

export default Card;
