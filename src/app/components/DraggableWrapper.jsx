"use client";

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggableWrapper = () => {
  const nodeRef = useRef(null);
  
  const [bounds, setBounds] = useState({ 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0 
  });
  
  useEffect(() => {
    const handleResize = () => {
      if (nodeRef.current) {
        const windowWidth = nodeRef.current.offsetWidth;
        const windowHeight = nodeRef.current.offsetHeight;
        const headerHeight = 56; // adjust later
        
        setBounds({ 
          top: 0,
          left: 0, 
          right: window.innerWidth - windowWidth,
          bottom: window.innerHeight - headerHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-[12]">
      <Draggable 
        nodeRef={nodeRef} 
        handle=".handle" 
        bounds={bounds}
      >
        <div 
          ref={nodeRef} 
          className="rounded-2xl shadow-2xl overflow-hidden bg-purple-800" 
          style={{ width: "400px", height: "300px" }}
        >
          <div className="handle p-4 bg-purple-600 text-white cursor-grab">
            <p className="font-bold">Drag Me!</p>
          </div>
          <div className="p-4 flex-grow">
            <p className="text-white">This is the content of the draggable window. This content can be hidden when dragged below the viewport.</p>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableWrapper;
