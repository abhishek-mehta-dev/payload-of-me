"use client";

import { useRef } from "react";
import { GraduationCap, Code, Target } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const infoCards = [
  {
    icon: GraduationCap,
    title: "Education",
    primary: "Master's in Computer Applications",
    secondary: "Chandigarh University, 2024",
  },
  {
    icon: Code,
    title: "Current Role",
    primary: "MERN Stack Developer",
    secondary: "Full-Stack Development",
  },
  {
    icon: Target,
    title: "Focus Areas",
    primary: "Backend Development & System Performance",
    secondary: "DevOps & Cloud Technologies",
  },
];

const paragraphs = [
  "As a dedicated software developer with a strong foundation in backend and Full-stack development, I bring expertise in building scalable and efficient web applications. I completed my Master's in Computer Applications in 2024 from Chandigarh University.",
  "Since graduation, I have been working as a MERN Stack Developer, sharpening my skills in dynamic and challenging environments. With a strong focus on backend development, I am passionate about leveraging my skills to create innovative solutions and enhance system performance.",
  "I am continuously expanding my knowledge in AI development, DevOps practices, and cloud technologies to stay at the forefront of modern software development",
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Line-by-line reveal of the bio copy
      const splits = gsap.utils
        .toArray<HTMLElement>(".about-para")
        .map((el) => new SplitText(el, { type: "lines", mask: "lines" }));

      splits.forEach((split, i) => {
        if (!split.lines?.length || !split.elements?.[0]) return;
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: split.elements[0],
            start: "top 85%",
            once: true,
          },
          delay: i * 0.05,
        });
      });

      const subtitle = rootRef.current?.querySelector(".about-subtitle");
      if (subtitle) {
        gsap.from(subtitle, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: subtitle, start: "top 88%", once: true },
        });
      }

      const cardsRoot = rootRef.current?.querySelector(".about-cards");
      const cards = gsap.utils.toArray<HTMLElement>(".about-card");
      if (cardsRoot && cards.length) {
        // Use y (not x) so cards never shift/clip past the container on mobile
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: cardsRoot, start: "top 80%", once: true },
          },
        );
      }

      const pill = rootRef.current?.querySelector(".about-pill");
      if (pill) {
        gsap.from(pill, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: pill, start: "top 92%", once: true },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="about"
      ref={rootRef}
      className="section-responsive relative overflow-x-clip"
    >
      <div className="container-responsive">
        <SectionHeading index="01" label="About" title="About" accent="Me" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Bio */}
          <div className="lg:col-span-3 min-w-0">
            <h3 className="about-subtitle font-display text-2xl sm:text-3xl font-semibold mb-8">
              Dedicated Full-Stack{" "}
              <span className="text-brand">Developer</span>
            </h3>
            <div className="space-y-6">
              {paragraphs.map((text) => (
                <p
                  key={text.slice(0, 24)}
                  className="about-para text-muted-foreground leading-relaxed text-base sm:text-lg"
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="about-pill mt-10 inline-flex max-w-full flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 rounded-full border border-line bg-card font-mono text-xs sm:text-sm">
              <Code className="h-4 w-4 shrink-0 text-brand" />
              <span className="text-muted-foreground">
                Always Learning, Always Growing
              </span>
              <span className="w-2 h-2 shrink-0 rounded-full bg-brand animate-pulse" />
            </div>
          </div>

          {/* Info cards — keep aligned with bio padding; no horizontal GSAP shift */}
          <div className="about-cards lg:col-span-2 w-full min-w-0 space-y-4">
            {infoCards.map(({ icon: Icon, title, primary, secondary }, i) => (
              <div
                key={title}
                className="about-card panel panel-hover w-full max-w-full p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 p-2.5 rounded-md bg-brand/10 border border-brand/25">
                      <Icon className="h-5 w-5 text-brand" />
                    </span>
                    <h4 className="font-display font-semibold">{title}</h4>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    0{i + 1}
                  </span>
                </div>
                <p className="font-medium text-foreground break-words">{primary}</p>
                <p className="text-sm text-muted-foreground mt-1">{secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
