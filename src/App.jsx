import { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Projects from "./sections/Projects";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import SkipToContent from "./components/SkipToContent";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <SkipToContent />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
        <div
          id="main-content"
          tabIndex="-1"
          className={`${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000 focus:outline-none`}
        >
          <Navbar />
          <main role="main">
            <Hero />
            <ServiceSummary />
            <Services />
            <About />
            <Projects />
            <ContactSummary />
            <Contact />
          </main>
        </div>
      </ReactLenis>
    </ErrorBoundary>
  );
};

export default App;
