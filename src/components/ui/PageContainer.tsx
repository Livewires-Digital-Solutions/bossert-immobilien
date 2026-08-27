import React from "react";

export default function PageContainer({
  children,
  className = "",
  withBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}) {
  return (
    <div className={`w-full px-6 md:px-10 max-w-[1400px] mx-auto ${className}`}>
      {withBorder ? (
        <div className="-ml-5 md:-ml-8 pl-5 md:pl-8 border-l border-[var(--bronze)]/30">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
