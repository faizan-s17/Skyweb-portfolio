import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  liveDemo: string;
  github: string;
};

const ProjectCardComponent = ({
  src,
  alt,
  title,
  description,
  liveDemo,
  github,
}: ProjectCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-[#2A0E61] bg-[#0a061f]/70 shadow-[0_10px_30px_rgba(0,0,0,0.26)] interactive-surface hover:border-[#4f2ea6] hover:shadow-[0_0_28px_rgba(112,66,248,0.25)]">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          loading="lazy"
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative p-5 md:p-6">
        <h3 className="text-2xl font-semibold text-white section-title">{title}</h3>
        <p className="mt-3 text-gray-300 leading-relaxed section-subtitle">{description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={liveDemo}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 interactive-button hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Live Demo
          </Link>
          <Link
            href={github}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-purple-500/50 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-200 interactive-button hover:bg-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            GitHub
          </Link>
        </div>
      </div>
    </article>
  );
};

export const ProjectCard = memo(ProjectCardComponent);
