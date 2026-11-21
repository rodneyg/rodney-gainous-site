import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = "relative inline-flex min-h-10 items-center justify-center font-medium transition-[background-color,box-shadow,transform,color,border-color] duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-border",
    ghost: "bg-transparent text-foreground hover:bg-muted border border-border hover:border-primary/50"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const buttonVariants = {
    hover: { scale: 1.01 },
    tap: { scale: 0.96 },
    disabled: { scale: 1, opacity: 0.6 }
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && "cursor-not-allowed",
        className
      )}
      variants={buttonVariants}
      whileHover={disabled || loading ? "disabled" : "hover"}
      whileTap={disabled || loading ? "disabled" : "tap"}
      disabled={disabled || loading}
      {...props}
    >
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="size-4 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {!loading && leftIcon && (
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {leftIcon}
          </motion.span>
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <motion.span
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {rightIcon}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default EnhancedButton;
