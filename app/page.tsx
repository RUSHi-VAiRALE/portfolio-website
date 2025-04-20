"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import demoImage from "@/public/image.png";
import demoImage1 from "@/public/demoBlinks.png"
import demoImage2 from "@/public/demoBlinks2.png"
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB",
  "PostgreSQL", "Tailwind CSS", "GraphQL", "AWS", "Docker", "Git"
];

// Update the media type definition to handle both string URLs and imported images
type MediaItem = {
  type: "image" | "video";
  url: string | any;
  alt?: string;
  poster?: string;
};

const projects = [
  {
    title: "Blinks AI",
    description: "A full-stack application built with Next.js and Tailwind CSS.",
    media: [
      {
        type: "image",
        url: demoImage, // This is fine as is - it's a StaticImageData object
        alt: "Project 1 screenshot"
      },
      {
        type: "image",
        url: demoImage1,
        alt: "Project 1 code view"
      },
      {
        type: "image",
        url: demoImage2,
        alt: "Project 1 dashboard"
      },
      {
        type: "video",
        url: "https://cdn.pixabay.com/video/2025/04/20/272984.mp4",
        poster: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
      },
    ],
    github: "https://github.com/yourusername/project1",
    demo: "https://blinks-ai.com"
  },
  {
    title: "Project 2",
    description: "An e-commerce platform with real-time updates",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
        alt: "Project 2 screenshot"
      },
      {
        type: "video",
        url: "https://cdn.pixabay.com/video/2024/12/04/244839_tiny.mp4",
        poster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
        alt: "Project 2 mobile view"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1000",
        alt: "Project 2 analytics"
      }
    ],
    github: "https://github.com/yourusername/project2",
    demo: "https://project2.demo.com"
  },
];

// Create a VideoPlayer component to handle video playback
const VideoPlayer = ({ src, poster, className }: { src: string; poster?: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const { pauseAutoplay, resumeAutoplay } = useCarousel();
  
  // Handle video time update to show progress
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  }, []);
  
  // Handle video play event
  const handlePlay = useCallback(() => {
    // Pause the carousel autoplay when video starts playing
    videoRef.current?.setAttribute('playsinline', '');
    videoRef.current?.setAttribute('preload', 'auto');
    pauseAutoplay();
  }, [pauseAutoplay]);
  
  // Handle video end event
  const handleEnded = useCallback(() => {
    // Reset progress
    setProgress(0);
    
    // Resume carousel autoplay
    resumeAutoplay();
    
    // Small delay before moving to next slide
    setTimeout(() => {
      const carousel = document.querySelector('[data-carousel]');
      if (carousel) {
        const nextButton = carousel.querySelector('[data-carousel-next]');
        if (nextButton) {
          (nextButton as HTMLButtonElement).click();
        }
      }
    }, 500);
  }, [resumeAutoplay]);
  
  // Handle video error
  const handleError = useCallback(() => {
    console.error("Video failed to load:", src);
    setError(true);
    // Resume carousel autoplay when video fails
    resumeAutoplay();
  }, [src, resumeAutoplay]);
  
  return (
    <div className="relative w-full h-full">
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <div className="text-center p-4">
            <p className="text-white mb-2">Video could not be loaded</p>
            <img 
              src={poster || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1000"} 
              alt="Video placeholder" 
              className="max-w-full max-h-full object-contain mx-auto"
            />
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className={className}
            preload="auto"
            autoPlay
            muted
            playsInline
            onPlay={handlePlay}
            onEnded={handleEnded}
            onError={handleError}
            onTimeUpdate={handleTimeUpdate}
          />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800/30">
            <div 
              className="h-full bg-purple-500 transition-all duration-100" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-4 mx-auto text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
          >
            Hi, I'm <span>Rushikesh Vairale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            A Full Stack Developer passionate about building modern web applications
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600" asChild>
              <a href="https://github.com/RUSHi-VAiRALE" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 hover:bg-purple-100 dark:border-purple-800 dark:hover:bg-purple-900/50" asChild>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800" asChild>
              <a href="mailto:rushivairale932@gmail.com">
                <Mail className="mr-2 h-5 w-5" /> Contact
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm dark:bg-black/5">
        <div className="container px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Badge variant="secondary" className="text-lg py-2 px-4 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/50 dark:hover:bg-purple-800/50">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-purple-200/20 dark:bg-black/20 dark:border-purple-800/20">
                  <Carousel
                    opts={{
                      loop: true,
                      align: "start",
                    }}
                    className="w-full"
                    data-carousel={true}
                    autoplay={true}
                    interval={5000}
                  >
                    <CarouselContent>
                      {project.media.map((item, mediaIndex) => (
                        <CarouselItem key={mediaIndex}>
                          <AspectRatio ratio={16 / 9}>
                            {item.type === "image" ? (
                              typeof item.url === "string" ? (
                                <img
                                  src={item.url}
                                  alt={item.alt || ""}
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                />
                              ) : (
                                <Image
                                  src={item.url}
                                  alt={item.alt || ""}
                                  fill
                                  className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                              )
                            ) : (
                              <VideoPlayer
                                src={item.url as string}
                                poster={item.poster}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </AspectRatio>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full px-2 z-10">
                      <CarouselPrevious className="relative left-0 translate-y-0 h-8 w-8 opacity-70 hover:opacity-100" />
                      <CarouselNext className="relative right-0 translate-y-0 h-8 w-8 opacity-70 hover:opacity-100" data-carousel-next />
                    </div>
                  </Carousel>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> View Code
                        </a>
                      </Button>
                      <Button variant="outline" className="border-purple-200 hover:bg-purple-100 dark:border-purple-800 dark:hover:bg-purple-900/50" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}