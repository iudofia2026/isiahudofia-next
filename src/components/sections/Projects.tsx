'use client';

import React from 'react';
import projectsData from '@/data/projects.json';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-2xl mx-auto">
        {/* Grid Layout - Matching original 10-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
