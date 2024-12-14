import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

// Define props interface
interface ResizableDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const ResizableDrawer: React.FC<ResizableDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const [drawerWidth, setDrawerWidth] = useState(window.innerWidth * 0.4); // Default width: 40% of window
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newWidth = windowWidth - e.clientX; // Calculate the new drawer width
      const minWidth = windowWidth * 0.25; // 25% of window width
      const maxWidth = windowWidth * 0.75; // 75% of window width

      // Clamp the width within the allowed range
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setDrawerWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div>
      {/* Right-side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
        style={{ width: drawerWidth }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Close
        </button>

        {/* Drawer Content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold">Resizable Drawer</h2>
          <p className="mt-4 text-sm">
            Resize the drawer by dragging the left edge.
          </p>
        </div>

        {/* Drag Handle */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            cursor: "ew-resize",
            background: "rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default ResizableDrawer;
