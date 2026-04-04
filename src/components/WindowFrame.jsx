import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const WindowFrame = ({
  title,
  icon: Icon,
  children,
  className = "",
  containerClassName = "",
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = (e) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  // Prevent scrolling when maximized
  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMaximized]);

  const windowContent = (
    <div
      className={`w-full max-w-full bg-vscode-bg border border-vscode-border shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
        isMaximized
          ? "fixed inset-0 z-[9999] rounded-none flex flex-col"
          : `rounded-xl ${containerClassName}`
      }`}
    >
      {/* Standardized Header */}
      <div className="bg-vscode-surface px-3 sm:px-4 py-2 flex items-center border-b border-vscode-border select-none flex-shrink-0">
        {/* Left: Traffic Light Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0 sm:w-24">
          <div
            className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer"
            title="Close"
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer"
            title="Minimize"
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-[#27c93f] cursor-pointer hover:bg-[#2ed649] transition-colors"
            onClick={toggleMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          ></div>
        </div>

        {/* Title: left on mobile, centered on larger screens */}
        <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:px-4 text-xs sm:text-sm text-vscode-muted font-mono sm:justify-center">
          {Icon && <Icon className="text-vscode-accent flex-shrink-0" />}
          <span className="truncate text-left">{title}</span>
        </div>

        {/* Right: Spacer for balance */}
        <div className="hidden sm:block w-24 flex-shrink-0"></div>
      </div>

      {/* Content Area */}
      <div
        className={`min-w-0 ${className} ${
          isMaximized ? "flex-1 flex flex-col overflow-auto" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );

  if (isMaximized) {
    return createPortal(windowContent, document.body);
  }

  return windowContent;
};

export default WindowFrame;
