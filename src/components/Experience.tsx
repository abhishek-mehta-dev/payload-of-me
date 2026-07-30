"use client";

import { useRef } from "react";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Code,
  Award,
  TrendingUp,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const experiences = [
  {
    title: "MERN Stack Developer",
    company: "Current Position",
    period: "2024 - Present",
    description:
      "Working as a Full-stack developer, building scalable web applications using the MERN stack. Focusing on backend development, API design, and system performance optimization.",
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "RESTful APIs",
    ],
    type: "work",
    icon: Briefcase,
    status: "current",
  },
  {
    title: "Master's in Computer Applications",
    company: "Chandigarh University",
    period: "2022 - 2024",
    description:
      "Completed advanced studies in computer applications with focus on software development, algorithms, and system design. Gained strong foundation in programming and software engineering principles.",
    technologies: [
      "Python",
      "Data Structures",
      "Algorithms",
      "Software Engineering",
      "Database Systems",
      "Machine Learning",
    ],
    type: "education",
    icon: GraduationCap,
    status: "completed",
  },
];

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Timeline line draws in as the section scrolls
      gsap.from(".exp-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-timeline",
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
        tl.from(item.querySelector(".exp-node"), {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2.5)",
        })
          .from(
            item.querySelector(".exp-card"),
            { opacity: 0, x: -60, duration: 0.7, ease: "power3.out" },
            "-=0.15",
          )
          .from(
            item.querySelectorAll(".exp-tag"),
            {
              opacity: 0,
              y: 12,
              stagger: 0.04,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.3",
          );
      });

      gsap.from(".exp-pill", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-pill", start: "top 92%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="experience"
      ref={rootRef}
      className="section-responsive relative overflow-hidden"
    >
      <div className="container-responsive">
        <SectionHeading
          index="03"
          label="Journey"
          title="Experience &"
          accent="Education"
          subtitle="My professional journey and educational background in software development"
        />

        <div className="exp-timeline relative max-w-4xl">
          {/* Timeline line */}
          <div className="exp-line absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand/60 to-brand/20" />

          <div className="space-y-10 sm:space-y-14">
            {experiences.map((exp) => (
              <div key={exp.title} className="exp-item relative pl-12 sm:pl-16">
                {/* Node */}
                <div className="exp-node absolute left-0 sm:left-1 top-1 w-8 h-8 rounded-full bg-background border-2 border-brand flex items-center justify-center">
                  <exp.icon className="h-3.5 w-3.5 text-brand" />
                </div>

                {/* Card */}
                <div className="exp-card panel panel-hover p-6 sm:p-8 relative overflow-hidden">
                  {exp.status === "current" && (
                    <span className="absolute top-5 right-5 flex items-center gap-2 font-mono text-xs text-brand">
                      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                      current
                    </span>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground font-medium mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-brand border border-brand/30 bg-brand/5 rounded-md px-3 py-1.5 self-start whitespace-nowrap">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="exp-tag px-3 py-1 rounded-md border border-line bg-surface text-sm text-muted-foreground hover:text-foreground hover:border-brand/50 transition-colors duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    {exp.type === "work" ? (
                      <TrendingUp className="h-4 w-4 text-brand" />
                    ) : (
                      <Award className="h-4 w-4 text-brand" />
                    )}
                    {exp.type === "work"
                      ? "Professional Experience"
                      : "Academic Achievement"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="exp-pill inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-line bg-card font-mono text-sm">
            <Briefcase className="h-5 w-5 text-brand" />
            <span className="text-muted-foreground">
              Ready for New Challenges
            </span>
            <Code className="h-5 w-5 text-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
