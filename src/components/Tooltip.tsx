import React from "react";

interface TooltipProps {
  content?: string;
  id?: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content = "Contenido",
  id = "tooltip-default",
  children
}) => {
  return (
    <div className="relative group">
      {children}
      <div
        id={id}
        role="tooltip"
        className="absolute w-64 z-10 invisible group-hover:visible group-hover:opacity-100 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 dark:bg-gray-700"
      >
        {content}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};

export default Tooltip;