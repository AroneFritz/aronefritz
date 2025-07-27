import { Icon } from "@iconify/react/dist/iconify.js";

const LoadingSpinner = ({ 
  size = "medium", 
  color = "white", 
  message = "Loading...",
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  const colorClasses = {
    white: "text-white",
    black: "text-black",
    primary: "text-blue-500"
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
        <Icon 
          icon="lucide:loader-2" 
          className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin mb-4`}
        />
        <p className={`${colorClasses[color]} text-lg font-light tracking-wide`}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Icon 
        icon="lucide:loader-2" 
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
      />
      {message && (
        <span className={`${colorClasses[color]} font-light`}>
          {message}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
