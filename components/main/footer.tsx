import Link from "next/link";

import { FOOTER_DATA } from "@/constants";
import { personalInfo, contactInfo } from "@/data";

export const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-gray-200 px-4 py-8">
      <div className="max-w-6xl w-full glass-panel rounded-xl mx-auto px-6 py-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          {/* Left: Site / Contact */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h3>
            <p className="text-gray-300 mb-4">{personalInfo.tagline}</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-gray-200 hover:text-white transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>

          {/* Middle + Right: FOOTER_DATA columns (e.g., Social Media, Quick Links) */}
          {FOOTER_DATA.map((column) => (
            <div key={column.title} className="flex flex-col items-start">
              <h4 className="font-semibold text-lg mb-3 text-white">{column.title}</h4>
              <div className="flex flex-col gap-3">
                {column.data.map(({ icon: Icon, name, link }) => {
                  const isInternal = link.startsWith("#") || link.startsWith("/");
                  return (
                    <Link
                      key={`${column.title}-${name}`}
                      href={link}
                      target={isInternal ? undefined : "_blank"}
                      rel={isInternal ? undefined : "noreferrer noopener"}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      {Icon ? (
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(112,66,248,0.12)] transition-colors">
                          <Icon className="w-5 h-5 text-white" />
                        </span>
                      ) : (
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
                      )}
                      <span className="text-sm">{name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-t border-purple-500/10 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Designed &amp; built with care.</p>
          <p className="text-sm text-gray-400">&copy; {personalInfo.name} {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
