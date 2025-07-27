import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Icon } from "@iconify/react/dist/iconify.js";

const Skills3DFallback = ({ skills }) => {
  const containerRef = useRef();
  const marqueeRef = useRef();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Safety check for skills prop
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-white/50">
        <p>No skills data available</p>
      </div>
    );
  }

  // Skill to icon mapping with colors
  const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();

    if (name.includes('react') || name.includes('next')) {
      return { icon: 'logos:react', color: '#61DAFB', bg: 'from-blue-500/20 to-cyan-400/20' };
    }
    if (name.includes('javascript') || name.includes('typescript')) {
      return { icon: 'logos:javascript', color: '#F7DF1E', bg: 'from-yellow-500/20 to-orange-400/20' };
    }
    if (name.includes('node') || name.includes('express')) {
      return { icon: 'logos:nodejs-icon', color: '#68A063', bg: 'from-green-500/20 to-emerald-400/20' };
    }
    if (name.includes('php') || name.includes('laravel')) {
      return { icon: 'logos:laravel', color: '#FF2D20', bg: 'from-red-500/20 to-pink-400/20' };
    }
    if (name.includes('database') || name.includes('sql')) {
      return { icon: 'logos:postgresql', color: '#336791', bg: 'from-purple-500/20 to-indigo-400/20' };
    }
    if (name.includes('ui') || name.includes('ux') || name.includes('design')) {
      return { icon: 'logos:figma', color: '#F24E1E', bg: 'from-pink-500/20 to-rose-400/20' };
    }
    // Default fallback
    return { icon: 'mdi:code-tags', color: '#6B7280', bg: 'from-gray-500/20 to-gray-400/20' };
  };

  useGSAP(() => {
    if (!marqueeRef.current) return;

    // Initial loading animation for all skill cards
    const skillCards = marqueeRef.current.querySelectorAll('.skill-card');

    // Set initial state - hidden and scaled down
    gsap.set(skillCards, {
      opacity: 0,
      scale: 0.5,
      y: 50,
      rotation: -10
    });

    // Animate cards in with stagger effect
    const loadingTimeline = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });

    loadingTimeline.to(skillCards, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        from: "start",
        ease: "power2.out"
      },
      ease: "back.out(1.7)"
    });

    // Create seamless marquee animation after loading
    const marqueeAnimation = gsap.to(marqueeRef.current, {
      x: "-33.333%", // Move by 1/3 since we have 3 copies
      duration: 20,
      ease: "none",
      repeat: -1,
      delay: 2 // Start after loading animation
    });

    // Pause/resume functionality
    const handleMouseEnter = () => {
      setIsPaused(true);
      gsap.to(marqueeAnimation, { timeScale: 0.1, duration: 0.5 });
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
      gsap.to(marqueeAnimation, { timeScale: 1, duration: 0.5 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup function
    return () => {
      loadingTimeline.kill();
      marqueeAnimation.kill();
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill any remaining GSAP animations
      if (marqueeRef.current) {
        gsap.killTweensOf(marqueeRef.current);
      }
    };
  }, []);

  const handleSkillClick = (skillIndex, copyIndex) => {
    const uniqueIndex = `${skillIndex}-${copyIndex}`;
    setSelectedSkill(selectedSkill === uniqueIndex ? null : uniqueIndex);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] relative overflow-hidden bg-gradient-to-br from-black/20 to-black/40 rounded-lg cursor-pointer"
    >
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center">
            {/* Animated Loading Spinner */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>

            {/* Loading Text with Typewriter Effect */}
            <div className="text-white/80 text-sm font-medium">
              <span className="inline-block animate-pulse">Loading Tech Stack</span>
              <span className="inline-block animate-bounce ml-1">...</span>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marquee Container */}
      <div
        ref={marqueeRef}
        className="flex items-center h-full gap-8 will-change-transform"
        style={{ width: '300%' }} // 3x width for 3 copies
      >
        {/* Render 3 copies of skills for seamless loop */}
        {[0, 1, 2].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-12 min-w-full">
            {skills.map((skill, skillIndex) => {
              const skillData = getSkillIcon(skill.name);
              const uniqueKey = `${skill.name}-${copyIndex}`;
              const isSelected = selectedSkill === `${skillIndex}-${copyIndex}`;

              return (
                <div
                  key={uniqueKey}
                  className="flex-shrink-0 group relative"
                  onClick={() => handleSkillClick(skillIndex, copyIndex)}
                >
                  {/* Logo Container */}
                  <div className={`
                    skill-card relative bg-gradient-to-br ${skillData.bg} backdrop-blur-sm
                    rounded-3xl p-8 w-[140px] h-[140px]
                    flex flex-col items-center justify-center
                    transform transition-all duration-500 ease-out
                    hover:scale-110 hover:-translate-y-3 hover:rotate-3
                    ${isSelected ? 'scale-110 -translate-y-3 rotate-3' : ''}
                    cursor-pointer border-2 border-white/10 hover:border-white/30
                    shadow-2xl hover:shadow-3xl
                    group-hover:bg-white/5
                  `}
                  style={{
                    boxShadow: `0 20px 40px ${skillData.color}20, 0 0 0 1px ${skillData.color}10`
                  }}>
                    {/* Main Logo */}
                    <Icon
                      icon={skillData.icon}
                      className="w-16 h-16 mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ color: skillData.color }}
                    />



                    {/* Skill Name */}
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-sm leading-tight">
                        {skill.name.split('/')[0]} {/* Show first part if there's a slash */}
                      </h3>
                      {skill.name.includes('/') && (
                        <p className="text-white/60 text-xs mt-1">
                          {skill.name.split('/')[1]}
                        </p>
                      )}
                    </div>

                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                      style={{ backgroundColor: skillData.color }}
                    />

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-300" />
                  </div>

                  {/* Floating Orbs */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full opacity-60 animate-pulse"
                        style={{
                          backgroundColor: skillData.color,
                          top: `${15 + i * 50}%`,
                          right: `${-5 + i * 10}%`,
                          animationDelay: `${i * 0.8}s`,
                          animationDuration: '3s'
                        }}
                      />
                    ))}
                  </div>

                  {/* Progress Ring (visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.2"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={skillData.color}
                        strokeWidth="2"
                        strokeDasharray={`${skill.level * 2.83} 283`}
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Gradient Overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10" />



      {/* Selected Skill Details */}
      {selectedSkill && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white z-20 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Icon icon="mdi:star-circle" className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-bold">Technology Showcase</h4>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
            >
              <Icon icon="mdi:close" className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:speedometer" className="w-4 h-4 text-green-400" />
              <span className="text-white/70 text-sm">
                {isPaused ? "Marquee slowed down" : "Smooth animation active"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:palette" className="w-4 h-4 text-purple-400" />
              <span className="text-white/70 text-sm">Official brand colors</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills3DFallback;
