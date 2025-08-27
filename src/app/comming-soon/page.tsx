"use client";

import type React from "react";
import { Clock, Rocket, Star } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-radial"></div>
      <FloatingParticles />

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cosmic-primary rounded-full blur-3xl opacity-10 animate-pulse-glow"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cosmic-secondary rounded-full blur-3xl opacity-10 animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl animate-fade-in text-center">
          {/* Header Icon */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto cosmic-glass rounded-3xl flex items-center justify-center animate-float cosmic-glow">
                <Rocket className="w-16 h-16 text-cosmic-primary" />
              </div>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-cosmic-secondary rounded-full flex items-center justify-center animate-scale-bounce">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-8 leading-tight">
              Coming Soon
            </h1>
            <p className="text-muted-foreground text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto mb-8">
              Something amazing is brewing in the digital cosmos
            </p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              We&apos;re crafting an extraordinary experience that will redefine
              how you interact with technology. Stay tuned for the revolution.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="cosmic-glass rounded-2xl p-6 border border-cosmic-primary/20">
              <div className="w-16 h-16 bg-cosmic-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-cosmic-primary" />
              </div>
              <h3 className="font-semibold text-cosmic-primary mb-2 text-xl">
                Innovation
              </h3>
              <p className="text-muted-foreground">
                Cutting-edge technology meets elegant design
              </p>
            </div>

            <div className="cosmic-glass rounded-2xl p-6 border border-cosmic-primary/20">
              <div className="w-16 h-16 bg-cosmic-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-cosmic-secondary" />
              </div>
              <h3 className="font-semibold text-cosmic-secondary mb-2 text-xl">
                Excellence
              </h3>
              <p className="text-muted-foreground">
                Crafted with attention to every detail
              </p>
            </div>

            <div className="cosmic-glass rounded-2xl p-6 border border-cosmic-primary/20">
              <div className="w-16 h-16 bg-cosmic-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-cosmic-primary" />
              </div>
              <h3 className="font-semibold text-cosmic-primary mb-2 text-xl">
                Performance
              </h3>
              <p className="text-muted-foreground">
                Lightning fast and incredibly smooth
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="text-center border-t border-border/30 pt-8">
            <p className="text-muted-foreground text-lg">
              Get ready for something extraordinary
              <br />
              <span className="text-cosmic-primary font-medium">
                The future is being written
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
