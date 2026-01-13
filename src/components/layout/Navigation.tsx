'use client';

import React from 'react';
import Link from 'next/link';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Name Link - Bracket style like original */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-1 text-sm text-neutral-400 hover:text-brand-blue transition-colors group"
          >
            <span className="text-brand-blue">[</span>
            <span className="font-medium group-hover:ml-0.5 transition-all">Isiah Udofia</span>
            <span className="text-brand-blue">]</span>
          </Link>

          {/* Navigation Links - Bracket style like original */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              href="/"
              className="hidden md:flex items-center gap-1 text-sm text-neutral-400 hover:text-brand-blue transition-colors group"
            >
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">[</span>
              <span className="font-medium group-hover:ml-0.5 transition-all">Work</span>
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">]</span>
            </Link>
            <Link
              href="/info"
              className="hidden md:flex items-center gap-1 text-sm text-neutral-400 hover:text-brand-blue transition-colors group"
            >
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">[</span>
              <span className="font-medium group-hover:ml-0.5 transition-all">Info</span>
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">]</span>
            </Link>
            <Link
              href="/resume"
              className="hidden md:flex items-center gap-1 text-sm text-neutral-400 hover:text-brand-blue transition-colors group"
            >
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">[</span>
              <span className="font-medium group-hover:ml-0.5 transition-all">Resume</span>
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">]</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-400"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
