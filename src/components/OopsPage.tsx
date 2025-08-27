"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Home, Info, Lock } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-cosmic-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cosmic-radial"></div>
      <FloatingParticles />

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-primary rounded-full blur-3xl opacity-10 animate-pulse-glow"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-secondary rounded-full blur-3xl opacity-10 animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl animate-fade-in text-center">
          {/* Header Icon */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto cosmic-glass rounded-2xl flex items-center justify-center animate-float cosmic-glow">
                <Shield className="w-12 h-12 text-cosmic-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-cosmic-secondary rounded-full flex items-center justify-center animate-scale-bounce">
                <Lock className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6 leading-tight">
              Oops! Repository Access Restricted
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              This GitHub repository contains proprietary code and sensitive
              information that requires special access permissions.
            </p>
          </div>

          {/* Info Section */}
          <div className="cosmic-glass rounded-2xl p-8 mb-12 border border-cosmic-primary/20 max-w-xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-cosmic-primary/20 rounded-lg flex items-center justify-center">
                  <Info className="w-6 h-6 text-cosmic-primary" />
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-cosmic-primary mb-3 text-lg">
                  Why is this private?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  This project contains client-specific implementations, API
                  configurations, or proprietary business logic that cannot be
                  shared publicly for security and confidentiality reasons.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 max-w-md mx-auto mb-12">
            <Button
              onClick={handleGoBack}
              className="w-full bg-cosmic-gradient hover:shadow-cosmic-glow transition-all duration-300 text-white font-medium py-6 text-lg rounded-xl"
              size="lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={handleHome}
              variant="secondary"
              className="w-full cosmic-glass hover:bg-cosmic-surface/80 transition-all duration-300 py-6 text-lg rounded-xl"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
