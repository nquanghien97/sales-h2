import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "danger"  | "primary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold border border-gray-300 transition duration-300 outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50";
    
    const variantClasses = {
      default: "bg-white text-gray-900 shadow-sm hover:bg-gray-100",
      danger: "bg-red-500 text-white shadow-sm hover:bg-red-600",
      primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-500",
    }[variant];
    
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-10 px-8",
      icon: "h-9 w-9",
    }[size];
    return (
      <Comp
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
