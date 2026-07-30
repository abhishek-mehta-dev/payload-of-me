import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import BlogsSection from "@/components/BlogsSection";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      <Preloader />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <BlogsSection />
      <Contact />
    </div>
  );
}
