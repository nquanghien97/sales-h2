import * as React from "react";

const ButtonIcon = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {

    return (
      <button
        className={`outline-0 cursor-pointer border-transparent duration-300 rounded-full p-2 flex justify-center items-center min-h-8 min-w-8 bg-transparent hover:bg-[#f0f0f0] ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };
