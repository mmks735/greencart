import React, { useState, useRef } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ZoomableImage.module.css';

export default function ZoomableImage({ src, alt, width = 600 }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef(null);
  const imageSrc = useBaseUrl(src);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className={styles.imageContainer}
      style={{ maxWidth: `${width}px` }}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      ref={imageRef}
    >
      <img 
        src={imageSrc} 
        alt={alt} 
        className={styles.thumbnail}
      />
      
      {isZoomed && (
        <div 
          className={styles.magnifier}
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
        />
      )}
      
      <div className={styles.zoomHint}>
        {isZoomed ? '🔍 Move to zoom' : '🔍 Hover to zoom'}
      </div>
    </div>
  );
}
