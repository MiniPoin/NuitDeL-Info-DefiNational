import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 1,
  ease = 'power2.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const isHorizontal = direction === 'horizontal';
    const movement = reverse ? -distance : distance;

    gsap.fromTo(
      element,
      {
        x: isHorizontal ? movement : 0,
        y: isHorizontal ? 0 : movement,
        opacity: animateOpacity ? initialOpacity : 1,
        scale: scale !== 1 ? scale : 1,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: element,
          start: `top ${threshold * 100}%`,
          toggleActions: 'play none none none',
        },
      }
    );
  }, [distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay]);

  return <div ref={elementRef}>{children}</div>;
};

export default AnimatedContent;