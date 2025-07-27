import { useRef, useState } from 'react';
import { useLazyLoading } from '../hooks/usePerformanceMonitor';
import LoadingSpinner from './LoadingSpinner';

const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = null,
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const imgRef = useRef(null);
  const isVisible = useLazyLoading(imgRef);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    onError();
  };

  return (
    <div ref={imgRef} className={`relative ${className}`} {...props}>
      {!isVisible && (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
      )}
      
      {isVisible && !hasError && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              {placeholder || <LoadingSpinner size="small" color="black" message="" />}
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
      
      {hasError && (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
