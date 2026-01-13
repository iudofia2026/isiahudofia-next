'use client';

import React from 'react';
import heroData from '@/data/hero.json';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-end px-4 md:px-8 lg:px-16 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Name Section - Stacked like original */}
        <div className="mb-8">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            {heroData.firstName}
          </h1>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mt-1">
            {heroData.lastName}
          </h1>
        </div>

        {/* Info Section - Right aligned like original */}
        <div className="space-y-1 md:space-y-2 mb-8">
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 font-light">
            {heroData.subtitle}
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 font-light">
            {heroData.location}
          </p>
        </div>

        {/* CTA Button - Bracket style like original */}
        <button
          onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-hover transition-colors group"
        >
          <span className="text-lg md:text-xl">[</span>
          <span className="text-lg md:text-xl font-medium group-hover:ml-1 transition-all">
            {heroData.ctaText}
          </span>
          <span className="text-lg md:text-xl">]</span>
        </button>
      </div>
    </section>
  );
};
