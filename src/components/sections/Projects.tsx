'use client';

import React from 'react';
import projectsData from '@/data/projects.json';
import { ProjectCard } from './ProjectCard';
import { Section } from '@/components/ui/Section';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" padding="lg">
      <div className="mb-12">
        <h2 className="font-display text-display-lg mb-4">Featured Projects</h2>
        <p className="text-body-lg text-neutral-600">
          A selection of my recent work in design and development
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};
