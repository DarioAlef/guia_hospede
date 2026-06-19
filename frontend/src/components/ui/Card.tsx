interface CardProps {
  children: React.ReactNode;
  variant?: "light" | "navy";
  className?: string;
}

export function Card({
  children,
  variant = "light",
  className = "",
}: CardProps) {
  const base = "rounded-2xl shadow-sm p-6";
  const variants: Record<"light" | "navy", string> = {
    light: "bg-seazone-card text-gray-800",
    navy: "bg-seazone-navy text-white",
  };
  return (
    <div
      className={`${base} ${variants[variant]}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
