"use client"
import { Bitcoin, Palette, Shield, Sparkles, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function FeaturesSection() {
  const features = [
    {
      icon: <Palette className="h-10 w-10 text-fuchsia-500" />,
      title: "Color Betting Arena",
      description:
        "Place strategic bets on magical colors with dynamic odds and real-time multipliers. Each color represents a unique opportunity for rewards.",
    },
    {
      icon: <Bitcoin className="h-10 w-10 text-amber-500" />,
      title: "Instant BTC Payouts",
      description: "Experience lightning-fast Bitcoin transactions with automated smart contract settlements and instant winning distributions.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
      title: "Live Win Predictions",
      description: "Get real-time win probability insights and strategic betting recommendations from our advanced AI oracle system.",
    },
    {
      icon: <Shield className="h-10 w-10 text-green-500" />,
      title: "Enchanted Security",
      description: "Your magical assets are protected with powerful spells and transparent blockchain enchantments.",
    },
  ]
  
  // Steps data with fantasy-themed titles
  const steps = [
    {
      step: "01",
      title: "Connect Your Wallet",
    },
    {
      step: "02",
      title: "Choose Your Colors",
    },
    {
      step: "03",
      title: "Place Your Bets",
    },
    {
      step: "04",
      title: "Collect Winnings",
    },
  ];

  const stepsContainerRef = useRef(null);
  const stepRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: stepsContainerRef.current,
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1, 
        markers: false, 
      }
    });
    
    // Animate each step
    stepRefs.forEach((ref, index) => {
      // Create a scroll trigger for each step
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
        onEnter: () => {
          // Animate the step indicator with more fantasy-inspired colors
          gsap.to(ref.current.querySelector(".step-indicator"), {
            backgroundColor: index === steps.length - 1 ? "#9333ea" : "#7c3aed",
            color: "#ffffff",
            boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
            duration: 0.5,
            ease: "power2.out"
          });
          
          gsap.to(ref.current.querySelector(".step-title"), {
            color: "#8b5cf6",
            textShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
            duration: 0.5,
            ease: "power2.out"
          });
          
          gsap.to(".progress-line", {
            height: `${(index + 1) / steps.length * 100}%`,
            boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
            duration: 0.5,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          if (index > 0) {
            // Revert to previous step
            gsap.to(ref.current.querySelector(".step-indicator"), {
              backgroundColor: "#2e1065",
              color: "#a78bfa",
              boxShadow: "none",
              duration: 0.5,
              ease: "power2.out"
            });
            
            gsap.to(ref.current.querySelector(".step-title"), {
              color: "#a78bfa",
              textShadow: "none",
              duration: 0.5,
              ease: "power2.out"
            });
            
            gsap.to(".progress-line", {
              height: `${index / steps.length * 100}%`,
              boxShadow: "0 0 5px rgba(139, 92, 246, 0.3)",
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      });
    });
    
    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: stepsContainerRef });

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-purple-900/10 to-indigo-900/10 relative">
      {/* Fantasy-themed background elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              backgroundColor: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <div className="inline-block mb-4">
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500">Mystical Features</h2>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
          </div>
          <p className="text-muted-foreground">
            ColorFi combines ancient magic with modern Web3 technology for a truly enchanted experience
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-violet-500/20 bg-background/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="mb-2 rounded-full bg-violet-950/30 w-14 h-14 flex items-center justify-center">{feature.icon}</div>
                <CardTitle className="text-lg text-purple-100">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-purple-200/70">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24" ref={stepsContainerRef}>
          <div className="mx-auto mb-12 max-w-[800px] text-center">
            <div className="relative inline-block">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">The Magical Journey</h2>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
            </div>
            <p className="text-muted-foreground">Begin your mystical adventure with ColorFi in just a few simple enchantments</p>
          </div>

          <div className="relative">
            {/* Magical timeline container with enhanced styling */}
            <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0">
              {/* Background line with magical styling */}
              <div className="w-1 h-full bg-gradient-to-b from-violet-800/30 via-purple-600/30 to-indigo-800/30 rounded-full"></div>
              {/* Progress indicator with glowing effect */}
              <div className="progress-line absolute top-0 w-1 bg-gradient-to-b from-violet-500 via-purple-400 to-fuchsia-500 rounded-full transition-all duration-700"></div>
            </div>
            
            <div className="grid gap-28">
              {steps.map((item, index) => (
                <div 
                  key={index} 
                  ref={stepRefs[index]}
                  className="relative min-h-[120px] transition-all duration-500 text-center"
                >
                  {/* Enhanced circle indicator */}
                  <div className="step-indicator absolute left-1/2 top-0 -translate-x-1/2 flex h-12 w-12 items-center 
                                justify-center rounded-full border-2 border-violet-500/50 z-10 bg-violet-900/70 text-violet-300 transition-colors duration-500
                                shadow-md">
                    {item.step}
                  </div>
                  
                  {/* Improved title with background to prevent line from intersecting */}
                  <div className="mt-20 relative z-10">
                    <h3 className="step-title text-xl font-bold inline-block px-6 py-2 bg-background/50 backdrop-blur-sm rounded-full
                                 text-purple-300 border border-violet-500/20 shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
      `}</style>
    </section>
  )
}