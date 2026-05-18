import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20 px-5 md:px-10"
    >
      <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 pb-14 md:pb-16 section-title">
        Recent Client Work
      </h1>
      <p className="text-base md:text-lg text-gray-300 max-w-2xl text-center mb-12 section-subtitle">
        Websites built for real businesses. Each one designed to help get more calls, enquiries, bookings, and sales.
      </p>
      <div className="h-full w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            alt={project.imageAlt}
            title={project.title}
            description={project.description}
            liveDemo={project.liveDemo}
            github={project.github}
          />
        ))}
      </div>
    </section>
  );
};
