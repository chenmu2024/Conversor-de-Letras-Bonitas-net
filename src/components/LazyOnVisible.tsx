import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyOnVisibleProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
}

/**
 * LazyOnVisible defers rendering heavy client-side interactive modules
 * until they approach the browser viewport via IntersectionObserver.
 * Keeps initial DOM size and unused JavaScript execution low.
 */
export const LazyOnVisible: React.FC<LazyOnVisibleProps> = ({
  children,
  fallback = null,
  rootMargin = '300px',
  minHeight = '80px',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={!isVisible ? { minHeight } : undefined}
    >
      {isVisible ? children : fallback}
    </div>
  );
};
