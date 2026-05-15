import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <div className="section-shell relative flex flex-col h-full w-full">
      {/* Mobile fallback: gradient background on sm, hidden on md+ */}
      <div className="md:hidden absolute inset-0 -z-20 bg-gradient-to-b from-[rgba(10,6,31,0.8)] via-[rgba(6,2,24,0.9)] to-[rgba(10,6,31,0.95)]" />
      
      {/* Video background: hidden on sm, visible on md+ */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden md:block rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};
