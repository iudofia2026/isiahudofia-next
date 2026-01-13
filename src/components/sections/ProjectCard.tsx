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
      className="group block"
    >
      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-brand hover:-translate-y-1">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden bg-neutral-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display font-semibold text-heading-md text-neutral-900 group-hover:text-brand-blue transition-colors">
              {project.title}
            </h3>
            <span className="text-body-sm text-neutral-500 font-mono">
              {project.year}
            </span>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-brand-blue-light text-brand-blue text-body-xs rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-body-sm text-neutral-600 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
