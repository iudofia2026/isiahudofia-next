'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-sm text-neutral-400">
          © {currentYear} Isiah Udofia
        </p>
      </div>
    </footer>
  );
};
