import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  padding = 'lg',
}) => {
  const paddingStyles = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  };

  return (
    <section
      id={id}
      className={`w-full ${paddingStyles[padding]} ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
};
