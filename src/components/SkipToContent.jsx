import { useRef } from 'react';

const SkipToContent = () => {
  const skipLinkRef = useRef(null);

  const handleSkip = (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      ref={skipLinkRef}
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
