import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const text = `Full-Stack Web Developer crafting modern,
responsive websites and web applications
that drive business growth`;

  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    // Animate scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });




  }, []);

  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen">
      {/* Spline Background - Interactive */}
      <figure
        className="absolute inset-0 overflow-hidden"
        style={{ width: "100vw", height: "100vh" }}
      >
        <iframe
          src='https://my.spline.design/r4xbot-q6BWatwUvZA9aM9qAcOACepH/'
          width='130%'
          height='130%'
          style={{
            border: 'none',
            position: 'absolute',
            top: '-15%',
            left: '-15%'
          }}
          title="Spline 3D Background"
        />
      </figure>



      {/* Subtitle at top left */}
      <div className="absolute top-8 left-8 z-20" style={{ pointerEvents: 'none' }}>
        <p className="text-sm font-light tracking-[0.5rem] uppercase text-black">
          Frontend • Backend • Full-Stack
        </p>
      </div>

      {/* Text Content Overlay - Non-interactive background */}
      <div
        className="relative z-10"
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ pointerEvents: 'none' }}>
          <AnimatedHeaderSection
            title={"Arone Fritz"}
            text={text}
            textColor={"text-black"}
            showGreeting={true}
          />
        </div>
      </div>



      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ pointerEvents: 'auto' }}
      >
        <span className="text-sm text-black/70 font-light tracking-wider">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
