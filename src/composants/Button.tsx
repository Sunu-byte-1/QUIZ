import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    disabled,
    children,
    className = '',
    ...props 
  }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantStyles = {
      primary: 'bg-primary-dark dark:bg-primary-500 text-white hover:shadow-lg hover:shadow-primary-dark/50 dark:hover:shadow-primary-500/50 active:scale-95',
      secondary: 'bg-secondary-dark dark:bg-secondary-500 text-white hover:shadow-lg hover:shadow-secondary-dark/50 dark:hover:shadow-secondary-500/50 active:scale-95',
      accent: 'bg-accent-orange dark:bg-accent-orange-dark text-white hover:shadow-lg hover:shadow-accent-orange/50 dark:hover:shadow-accent-orange-dark/50 active:scale-95',
      ghost: 'bg-transparent text-primary-dark dark:text-primary-500 border-2 border-primary-dark dark:border-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
