import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 15,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cosmic-primary/30 rounded-full animate-particle-float"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Additional decorative elements */}
      <div
        className="absolute top-1/3 left-1/3 w-32 h-32 border border-cosmic-primary/10 rounded-full animate-spin"
        style={{ animationDuration: "30s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-cosmic-secondary/10 rounded-full animate-spin"
        style={{ animationDuration: "40s", animationDirection: "reverse" }}
      ></div>
    </div>
  );
};

export default FloatingParticles;
