import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'xl',
}) => {
  const sizeStyles = {
    sm: 'max-w-container-sm',
    md: 'max-w-container-md',
    lg: 'max-w-container-lg',
    xl: 'max-w-container-xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 md:px-8 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
};
