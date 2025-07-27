import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Ready to bring your web project to life?
    WE’D love to hear from you and discus further!`;
  const items = [
    "Web Developer • React Expert",
    "Responsive Design • Modern UI",
    "Full-Stack Solutions • API Development",
    "Performance Optimization • SEO Ready",
    "Custom Web Applications • E-commerce",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAvailable] = useState(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Let's Build Your Web Presence"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        {/* Availability Status */}
        <div className="px-10 mb-8">
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-white font-medium">
              {isAvailable ? 'Available for new projects' : 'Currently booked'}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 px-10 mb-10">
          {/* Contact Information */}
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none">
              <div className="social-link">
                <h2>E-mail</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <a
                  href="mailto:lamanilaoarone30@gmail.com"
                  className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-300"
                >
                  lamanilaoarone30@gmail.com
                </a>
              </div>
              <div className="social-link">
                <h2>Phone</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <a
                  href="tel:+639128388819"
                  className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-300"
                >
                  +639128388819
                </a>
              </div>
              <div className="social-link">
                <h2>Social Media</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <div className="flex flex-wrap gap-2">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                    >
                      {"{ "}
                      {social.name}
                      {" }"}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-medium text-white mb-6">Send a Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors duration-300"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 p-4 bg-white text-black rounded-lg hover:bg-white/90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="lucide:loader-2" className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Icon icon="lucide:send" className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Message sent successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
