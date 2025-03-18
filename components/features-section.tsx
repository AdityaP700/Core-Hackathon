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
      icon: <Palette className="h-10 w-10 text-violet-500" />,
      title: "Color Trading",
      description:
        "Trade unique digital colors as assets on our secure blockchain platform. Each color has its own rarity and value.",
    },
    {
      icon: <Bitcoin className="h-10 w-10 text-amber-500" />,
      title: "BTC Integration",
      description: "Seamlessly trade colors using Bitcoin with low transaction fees and fast confirmation times.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
      title: "AI Analytics",
      description: "Get personalized recommendations and insights powered by our advanced AI algorithms.",
    },
    {
      icon: <Shield className="h-10 w-10 text-green-500" />,
      title: "Secure Platform",
      description: "Your assets are protected with industry-leading security measures and transparent transactions.",
    },
  ]
  
  // Steps data
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
      title: "Make Transactions",
    },
    {
      step: "04",
      title: "Get AI Insights",
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
          // Animate the step indicator
          gsap.to(ref.current.querySelector(".step-indicator"), {
            backgroundColor: index === steps.length - 1 ? "#22c55e" : "#7c3aed",
            color: "#ffffff",
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Animate the title
          gsap.to(ref.current.querySelector(".step-title"), {
            color: "#7c3aed",
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Update the progress line
          gsap.to(".progress-line", {
            height: `${(index + 1) / steps.length * 100}%`,
            duration: 0.5,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          if (index > 0) {
            // Revert to previous step
            gsap.to(ref.current.querySelector(".step-indicator"), {
              backgroundColor: "#ffffff",
              color: "#000000",
              duration: 0.5,
              ease: "power2.out"
            });
            
            gsap.to(ref.current.querySelector(".step-title"), {
              color: "#000000",
              duration: 0.5,
              ease: "power2.out"
            });
            
            gsap.to(".progress-line", {
              height: `${index / steps.length * 100}%`,
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
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Platform Features</h2>
          <p className="text-muted-foreground">
            ColorFi combines the best of Web3 technology with an intuitive user experience
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/40 bg-background/60 backdrop-blur">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20" ref={stepsContainerRef}>
          <div className="mx-auto mb-12 max-w-[800px] text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="text-muted-foreground">Get started with ColorFi in just a few simple steps</p>
          </div>

          <div className="relative">
            {/* Timeline container with z-index to keep it behind text */}
            <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0">
              {/* Background line */}
              <div className="w-0.5 h-full bg-border"></div>
              {/* Progress indicator */}
              <div className="progress-line absolute top-0 w-0.5 bg-primary transition-all duration-700"></div>
            </div>
            
            <div className="grid gap-24">
              {steps.map((item, index) => (
                <div 
                  key={index} 
                  ref={stepRefs[index]}
                  className="relative min-h-[100px] transition-all duration-500 text-center"
                >
                  {/* Circle indicator with z-index to keep it above the line */}
                  <div className="step-indicator absolute left-1/2 top-0 -translate-x-1/2 flex h-10 w-10 items-center 
                                justify-center rounded-full border z-10 bg-background text-foreground transition-colors duration-300">
                    {item.step}
                  </div>
                  
                  {/* Title with background to prevent line from intersecting */}
                  <div className="mt-16 relative z-10">
                    <h3 className="step-title text-xl font-bold inline-block px-4 bg-muted/30">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}