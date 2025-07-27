import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Projects = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const filterButtonsRef = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const text = `Featured web development projects showcasing
    modern design, responsive layouts, and
    cutting-edge functionality.`;

  // Get all unique technologies for filtering
  const allTechnologies = ["all", ...new Set(
    projects.flatMap(project =>
      project.frameworks.map(framework => framework.name)
    )
  )];

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });

    // Animate filter buttons
    gsap.from(filterButtonsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: filterButtonsRef.current[0],
      },
    });
  }, [filteredProjects]);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  const handleFilterChange = (technology) => {
    setSelectedFilter(technology);

    if (technology === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        project.frameworks.some(framework => framework.name === technology)
      );
      setFilteredProjects(filtered);
    }

    // Animate project cards when filter changes
    gsap.from("#project", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  };

  return (
    <section id="projects" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Responsive • Interactive • Performance-Optimized"}
        title={"Projects"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 px-10 mb-8">
        {allTechnologies.map((tech, index) => (
          <button
            key={tech}
            ref={(el) => (filterButtonsRef.current[index] = el)}
            onClick={() => handleFilterChange(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedFilter === tech
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            {tech === "all" ? "All Projects" : tech}
          </button>
        ))}
      </div>

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title and action buttons */}
            <div className="flex justify-between items-center px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <div className="flex gap-3 items-center">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-all duration-300 md:group-hover:bg-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon icon="lucide:external-link" className="w-5 h-5" />
                  </a>
                )}
                <button className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-all duration-300 md:group-hover:bg-white/20">
                  <Icon icon="lucide:github" className="w-5 h-5" />
                </button>
                <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
              </div>
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80" />
            {/* framework with tooltips */}
            <div className="flex px-10 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <span
                  key={framework.id}
                  className="relative text-black transition-colors duration-500 md:group-hover:text-white hover:text-gray-600 cursor-help"
                  title={`Technology: ${framework.name}`}
                >
                  {framework.name}
                </span>
              ))}
            </div>
            {/* mobile preview image */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute bg-center px-14 rounded-xl"
              />
              {/* Mobile action buttons overlay */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
                  >
                    <Icon icon="lucide:external-link" className="w-5 h-5 text-black" />
                  </a>
                )}
                <button className="p-3 bg-white/90 rounded-full hover:bg-white transition-all duration-300">
                  <Icon icon="lucide:github" className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* desktop Floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block hidden opacity-0 rounded-lg shadow-2xl"
        >
          {currentIndex !== null && filteredProjects[currentIndex] && (
            <div className="relative">
              <img
                src={filteredProjects[currentIndex].image}
                alt="preview"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-medium text-lg">
                  {filteredProjects[currentIndex].name}
                </h3>
                <p className="text-white/80 text-sm">
                  {filteredProjects[currentIndex].frameworks.map(f => f.name).join(" • ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
