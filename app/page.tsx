import dynamic from "next/dynamic";

import { Hero } from "@/components/main/hero";

const sectionFallback = (minHeight: string) => (
  <div className={`w-full ${minHeight}`} aria-hidden />
);

const About = dynamic(() => import("@/components/main/about").then((m) => m.About), {
  loading: () => sectionFallback("min-h-[520px]"),
});

const Services = dynamic(() => import("@/components/main/services").then((m) => m.Services), {
  loading: () => sectionFallback("min-h-[640px]"),
});

const Skills = dynamic(() => import("@/components/main/skills").then((m) => m.Skills), {
  loading: () => sectionFallback("min-h-[620px]"),
});

const Encryption = dynamic(
  () => import("@/components/main/encryption").then((m) => m.Encryption),
  {
    loading: () => sectionFallback("min-h-[720px]"),
  }
);

const Projects = dynamic(() => import("@/components/main/projects").then((m) => m.Projects), {
  loading: () => sectionFallback("min-h-[680px]"),
});

const Contact = dynamic(() => import("@/components/main/contact").then((m) => m.Contact), {
  loading: () => sectionFallback("min-h-[720px]"),
});

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-10 md:gap-20">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Encryption />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
