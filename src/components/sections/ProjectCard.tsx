'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  year: string;
  image: string;
  technologies: string[];
  liveUrl: string | null;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link
      href={project.liveUrl || '#'}
      className="group block flex flex-col h-full"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100 mb-3">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-0"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Overlay on hover - like original */}
        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-all duration-300" />
      </div>

      {/* Project Number - Matching original's bracket style */}
      <div className="flex items-center justify-between text-neutral-400">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 10 38" fill="none">
            <path d="M9.50195 0.599609V3.40039H3.40234V34.5996H9.50195V37.4004H0.601562V0.599609H9.50195Z" fill="currentColor" className="text-brand-blue"/>
          </svg>
          <span className="text-sm font-mono">0{project.id}</span>
          <svg className="w-4 h-4" viewBox="0 0 9 38" fill="none">
            <path d="M-0.00195312 0.599609V3.40039H6.09766V34.5996H-0.00195312V37.4004H8.89844V0.599609H-0.00195312Z" fill="currentColor" className="text-brand-blue"/>
          </svg>
        </div>
        <div className="text-sm font-medium text-neutral-300 group-hover:text-brand-blue transition-colors">
          {project.title.toLowerCase().replace(' ', ' ')}
        </div>
        <svg className="w-4 h-4" viewBox="0 0 14 11" fill="none">
          <path d="M13.5869 5.20312L8.25098 10.4053L7.83301 9.97559L7.41406 9.5459L11.2529 5.80273H0V4.60254H11.2529L7.41406 0.859375L7.83301 0.429688L8.25098 0L13.5869 5.20312Z" fill="currentColor"/>
        </svg>
      </div>
    </Link>
  );
};
