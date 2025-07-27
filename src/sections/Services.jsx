import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const text = `I create modern, responsive websites and
    web applications that deliver exceptional
    user experiences and business results.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);


  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Web Development • Design • Optimization"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />



      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-start justify-between gap-4 font-light">
            <div className="flex flex-col gap-6 flex-1">
              <h2 className="text-4xl lg:text-5xl">{service.title}</h2>

              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>

              {/* Service Items - Clean list view */}
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex items-center">
                      <span className="mr-12 text-lg text-white/30 flex-shrink-0">
                        0{itemIndex + 1}
                      </span>
                      <span className="flex-1">{item.title}</span>
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
