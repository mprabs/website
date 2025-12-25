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
      className={`bg-vscode-bg border border-vscode-border shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
        isMaximized
          ? "fixed inset-0 z-[9999] rounded-none flex flex-col"
          : `rounded-xl ${containerClassName}`
      }`}
    >
      {/* Standardized Header */}
      <div className="bg-vscode-surface px-4 py-2 flex items-center justify-between border-b border-vscode-border select-none flex-shrink-0">
        {/* Left: Traffic Light Buttons */}
        <div className="flex items-center gap-1.5 w-24">
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

        {/* Center: Title & Icon */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-vscode-muted font-mono truncate px-4">
          {Icon && <Icon className="text-vscode-accent flex-shrink-0" />}
          <span className="truncate">{title}</span>
        </div>

        {/* Right: Spacer for balance */}
        <div className="w-24 hidden sm:block"></div>
      </div>

      {/* Content Area */}
      <div
        className={`${className} ${
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
