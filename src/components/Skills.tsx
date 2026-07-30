"use client";

import { useRef } from "react";
import { VscAzure } from "react-icons/vsc";
import { Code, Database, Server, Brain, Wrench } from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiGo,
  SiTypescript,
  SiGnubash,
  SiExpress,
  SiNodedotjs,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiLangchain,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiOpenapiinitiative,
  SiApollographql,
  SiLinux,
  SiNginx,
  SiDocker,
  SiGithubactions,
  SiAwsamplify,
  SiGooglecloud,
  SiKubernetes,
  SiTensorflow,
  SiOpenai,
  SiNestjs,
} from "react-icons/si";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Server,
    skills: [
      { name: "Express.js", icon: SiExpress, color: "#888888" },
      { name: "Nest.js", icon: SiNestjs, color: "#e73665" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Django", icon: SiDjango, color: "#44B78B" },
      { name: "Django Rest Framework", icon: SiDjango, color: "#A30000" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#888888" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "LangChain", icon: SiLangchain, color: "#0FA958" },
    ],
  },
  {
    title: "Database Management",
    icon: Database,
    skills: [
      { name: "SQL", icon: SiMysql, color: "#336791" },
      { name: "NoSQL", icon: SiMongodb, color: "#47A248" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "API Development",
    icon: Wrench,
    skills: [
      { name: "RESTful Services", icon: SiOpenapiinitiative, color: "#6BA539" },
      {
        name: "Third-party API Integrations",
        icon: SiApollographql,
        color: "#7c62d1",
      },
    ],
  },
  {
    title: "Server & Infrastructure",
    icon: Server,
    skills: [
      { name: "Linux Fundamentals", icon: SiLinux, color: "#FFD41F" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Github Actions", icon: SiGithubactions, color: "#2088FF" },
    ],
  },
  {
    title: "Emerging Technologies",
    icon: Brain,
    skills: [
      { name: "Machine Learning Basics", icon: SiTensorflow, color: "#FF6F00" },
      { name: "DevOps Tools", icon: SiKubernetes, color: "#326CE5" },
      { name: "AI Agents", icon: SiOpenai, color: "#8f7bd8" },
      { name: "AWS", icon: SiAwsamplify, color: "#FF9900" },
      { name: "Azure", icon: VscAzure, color: "#0078D4" },
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
    ],
  },
];

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
        tl.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
        }).from(
          card.querySelectorAll(".skill-badge"),
          {
            opacity: 0,
            y: 14,
            scale: 0.92,
            stagger: 0.045,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25",
        );
      });

      gsap.from(".skills-pill", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skills-pill", start: "top 92%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="skills"
      ref={rootRef}
      className="section-responsive relative overflow-hidden bg-surface/40"
    >
      <div className="container-responsive">
        <SectionHeading
          index="02"
          label="Skills"
          title="Technical"
          accent="Expertise"
          subtitle="A comprehensive overview of my technical skills and expertise across various domains"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map(({ title, icon: Icon, skills }, index) => (
            <div key={title} className="skill-card panel panel-hover p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-md bg-brand/10 border border-brand/25">
                    <Icon className="h-5 w-5 text-brand" />
                  </span>
                  <h3 className="font-display font-semibold leading-tight">
                    {title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground shrink-0">
                  0{index + 1}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map(({ name, icon: SkillIcon, color }) => (
                  <span
                    key={name}
                    className="skill-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-line bg-surface text-sm font-medium text-muted-foreground hover:text-foreground hover:border-brand/50 transition-colors duration-300 cursor-default"
                  >
                    <SkillIcon color={color} className="shrink-0 text-base" />
                    {name}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>{skills.length} Skills</span>
                <span className="w-2 h-2 rounded-full bg-brand" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <div className="skills-pill inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-line bg-card font-mono text-sm">
            <Brain className="h-5 w-5 text-brand" />
            <span className="text-muted-foreground">
              Always Learning New Technologies
            </span>
            <Code className="h-5 w-5 text-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
