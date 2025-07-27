import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import Skills3DFallback from "../components/Skills3DFallback";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const text = `Passionate web developer specializing in
    modern JavaScript frameworks and
    responsive web design solutions`;
  const aboutText = `Specialized in creating dynamic, responsive websites using React, Next.js, and modern web technologies. From interactive user interfaces to robust backend systems, I deliver web solutions that perform.
  When I’m not shipping:
🌐 Frontend Development (React, Vue.js, TypeScript, HTML, CSS)
⚙️ Backend Development (Node.js, Express, APIs, PHP)
📱 Responsive Design (Mobile-first, CSS Grid/Flexbox)
🚀 Performance Optimization (SEO, Core Web Vitals)
☁️ Deployment & Hosting (Vercel, Netlify, Github)`;
  const imgRef = useRef(null);
  const skillBarsRef = useRef([]);
  const timelineRef = useRef([]);
  const [activeTab, setActiveTab] = useState("skills");
  const [showCVModal, setShowCVModal] = useState(false);

  const skills = [
    { name: "React/Next.js", level: 95 },
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "Node.js/Express", level: 85 },
    { name: "PHP/Laravel", level: 80 },
    { name: "Database Design", level: 85 },
    { name: "UI/UX Design", level: 75 },
  ];

  const timeline = [
    { year: "2024", title: "Senior Full-Stack Developer", description: "Leading complex web projects and mentoring junior developers" },
    { year: "2023", title: "Full-Stack Developer", description: "Developed multiple e-commerce and business applications" },
    { year: "2022", title: "Frontend Developer", description: "Specialized in React and modern frontend technologies" },
    { year: "2021", title: "Started Web Development Journey", description: "Began learning programming and web technologies" },
  ];
  useGSAP(() => {
    // Clean up any existing ScrollTriggers for this component
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && (
        trigger.trigger.id === "about" ||
        trigger.trigger === imgRef.current ||
        skillBarsRef.current.includes(trigger.trigger) ||
        timelineRef.current.includes(trigger.trigger)
      )) {
        trigger.kill();
      }
    });

    const triggers = [];

    // About section scale animation
    const aboutTrigger = ScrollTrigger.create({
      trigger: "#about",
      start: "bottom 80%",
      end: "bottom 20%",
      scrub: true,
      markers: false,
      animation: gsap.to("#about", {
        scale: 0.95,
        ease: "power1.inOut",
      })
    });
    triggers.push(aboutTrigger);

    // Image reveal animation
    if (imgRef.current) {
      gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      const imgTrigger = ScrollTrigger.create({
        trigger: imgRef.current,
        animation: gsap.to(imgRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "power4.out",
        })
      });
      triggers.push(imgTrigger);
    }

    // Animate skill bars only if skills tab is active
    if (activeTab === "skills") {
      skillBarsRef.current.forEach((bar, index) => {
        if (bar && skills[index]) {
          const skillTrigger = ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            animation: gsap.fromTo(bar,
              { width: "0%" },
              {
                width: `${skills[index].level}%`,
                duration: 1.5,
                delay: index * 0.2,
                ease: "power2.out",
              }
            )
          });
          triggers.push(skillTrigger);
        }
      });
    }

    // Animate timeline items only if timeline tab is active
    if (activeTab === "timeline" && timelineRef.current.length > 0) {
      const timelineTrigger = ScrollTrigger.create({
        trigger: timelineRef.current[0],
        start: "top 80%",
        animation: gsap.from(timelineRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        })
      });
      triggers.push(timelineTrigger);
    }

    // Cleanup function
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [activeTab]);
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built for the web"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col items-center justify-between gap-12 px-10 pb-16 lg:flex-row lg:gap-16 lg:items-start">
        <div className="flex flex-col items-center lg:w-2/5">
          <div ref={imgRef} className="relative w-full max-w-xs mb-6">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl scale-110 opacity-50"></div>
            <img
              src="images/afbl.jpeg"
              alt="Arone Fritz - Full Stack Developer"
              className="relative w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* View CV Button */}
          <button
            onClick={() => setShowCVModal(true)}
            className="group flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
          >
            <svg
              className="w-5 h-5 text-white group-hover:text-white/90 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-white font-medium text-sm tracking-wide group-hover:text-white/90 transition-colors duration-300">
              View CV
            </span>
          </button>
        </div>

        <div className="lg:w-3/5 w-full lg:pl-8">
          <AnimatedTextLines text={aboutText} className="text-base font-light tracking-wide md:text-lg lg:text-xl text-white/70 mb-8 leading-relaxed" />

          {/* Tab Navigation */}
          <div className="flex gap-3 mb-6">
            {["skills", "timeline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white mb-3">Technical Skills</h3>
              <div className="bg-black/10 rounded-xl p-3 border border-white/5">
                <Skills3DFallback key="skills-component" skills={skills} />
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white mb-3">Career Journey</h3>
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  ref={(el) => (timelineRef.current[index] = el)}
                  className="flex gap-3 p-3 bg-white/5 rounded-lg border border-white/5"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{item.year}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base">{item.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CV Preview Modal */}
      {showCVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Arone Fritz Lamanilao - CV</h3>
              <div className="flex items-center gap-3">
                {/* Download Button */}
                <a
                  href="/afbl CV.pdf"
                  download="Arone-Fritz-Lamanilao-CV.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </a>
                {/* Close Button */}
                <button
                  onClick={() => setShowCVModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-full">
              <iframe
                src="/afbl CV.pdf"
                className="w-full h-full border-0"
                title="Arone Fritz Lamanilao CV"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
