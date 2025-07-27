import { useState, useCallback } from 'react';

export const useErrorBoundary = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const handleAsync = useCallback(async (asyncFunction) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    error,
    isLoading,
    resetError,
    handleAsync,
  };
};
