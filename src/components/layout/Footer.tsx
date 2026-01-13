'use client';

import React from 'react';
import contactData from '@/data/contact.json';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-8 md:py-12">
      <div className="max-w-container-xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-body-sm text-neutral-600">
            © {currentYear} {contactData.social?.portfolio ? 'Isiah Udofia' : 'Portfolio'}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {contactData.social?.github && (
              <a
                href={contactData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-brand-blue transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.348 3.347-.898 4.667-.24.34-.516.64-.834.888-1.207 2.876 2.513 6.586 1.916 8.428-1.073.24-.66.468-1.298.667-1.99 2.22 1.636 4.712 1.636 8.017 0 6.017-3.767 10.985-9.49 10.985-.826 0-1.626-.115-2.383-.33-.513 1.607-1.997 2.724-3.753 2.724-2.259 0-4.092-1.833-4.092-4.092 0-.904.263-1.747.72-2.438-.135-.27-.25-.554-.344-.84l.007-.007c.78 1.361 2.245 2.276 3.925 2.276 2.455 0 4.447-1.992 4.447-4.447 0-.34-.035-.673-.101-.992-.363-1.78-1.458-3.322-3.527-3.322z" clipRule="evenodd" />
                </svg>
              </a>
            )}

            {contactData.social?.linkedin && (
              <a
                href={contactData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-brand-blue transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}

            {contactData.social?.portfolio && (
              <a
                href={contactData.social.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-brand-blue transition-colors"
                aria-label="Portfolio"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
