import React, { useEffect, useRef } from 'react';

const Loading = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let startAngle = 0;

    const drawLoadingAnimation = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    
      const radius = canvas.width / 6;
    
      context.beginPath();
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        startAngle,
        startAngle + (2 * Math.PI) / 3
      );
      context.strokeStyle = '#007bff';
      context.lineWidth = 10;
      context.stroke();
    
      startAngle += Math.PI / 30; // Adjust the speed of animation here
    
      requestAnimationFrame(drawLoadingAnimation);
    };

    drawLoadingAnimation();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={60}
      height={60}
      style={{ display: 'block', margin: '0 auto' }}
    />
  );
};

export default Loading;