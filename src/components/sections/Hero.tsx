'use client';

import React from 'react';
import heroData from '@/data/hero.json';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Name Section */}
        <div className="mb-8">
          <h1 className="font-display text-display-2xl md:text-display-xl leading-tight">
            {heroData.firstName}
          </h1>
          <h1 className="font-display text-display-2xl md:text-display-xl leading-tight mt-2">
            {heroData.lastName}
          </h1>
        </div>

        {/* Info Section */}
        <div className="space-y-2 mb-8">
          <p className="text-body-lg md:text-heading-md text-neutral-600">
            {heroData.subtitle}
          </p>
          <p className="text-body-lg md:text-heading-md text-neutral-600">
            {heroData.location}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          variant="link"
          size="lg"
          onClick={() => {
            const element = document.getElementById(heroData.ctaLink.replace('#', ''));
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          [{heroData.ctaText}]
        </Button>
      </div>
    </section>
  );
};
