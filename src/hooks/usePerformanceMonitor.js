import { useEffect, useState } from 'react';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
  });

  useEffect(() => {
    // Monitor page load performance
    const measureLoadTime = () => {
      if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      }
    };

    // Monitor memory usage (if available)
    const measureMemory = () => {
      if (performance.memory) {
        const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
        setMetrics(prev => ({ ...prev, memoryUsage }));
      }
    };

    // Monitor render performance
    const measureRenderTime = () => {
      const renderStart = performance.now();
      requestAnimationFrame(() => {
        const renderTime = performance.now() - renderStart;
        setMetrics(prev => ({ ...prev, renderTime }));
      });
    };

    // Initial measurements
    setTimeout(measureLoadTime, 1000);
    measureMemory();
    measureRenderTime();

    // Set up periodic monitoring
    const interval = setInterval(() => {
      measureMemory();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// Hook for lazy loading images
export const useLazyLoading = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};
