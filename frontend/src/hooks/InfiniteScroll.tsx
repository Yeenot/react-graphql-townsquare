import { useCallback, useEffect, useState } from "react";

// Reusable custom hook for handling infinite scrolling
const useInfiniteScroll = (callback: () => any, extraDeps: any[]) => {
  const [isReachedBottom, setIsReachedBottom] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  // Create a callback out of the callback provided to add provided dependencies for rendering control.
  const stableCallback = useCallback(callback,  [callback, ...extraDeps]);

  useEffect(() => {
    /**
     * This function is responsible for determining if the user has scrolled to the bottom and if so,
     * it will execute the provided callback. 
     */
    const handleScroll = async () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      
      /**
       * If the user has reached the bottom and if the callback is not yet finished executing,
       * then execute the provided callback. I have added an extra validation to prevent multiple
       * execution of the callback if the user scrolls fast to the top and scrolls to the bottom again.
       */
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        if (!isReachedBottom) {
          setIsReachedBottom(true);

          // Need to make sure that the callback is not yet executed to prevent multiple executions.
          if (!inProgress) {
            setInProgress(true);
            await stableCallback();
            setInProgress(false);
          }
        }
      } else {
        // If the user scroll back to the top, the mark as not at the bottom.
        if (isReachedBottom) {
          setIsReachedBottom(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isReachedBottom, inProgress, stableCallback]);
}

export default useInfiniteScroll;