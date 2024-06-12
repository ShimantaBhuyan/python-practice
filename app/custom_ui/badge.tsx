import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <div className={className + " px-2 py-1 text-xs font-medium rounded-full"}>
      {children}
    </div>
  );
};

export default Badge;
