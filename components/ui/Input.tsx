import * as React from "react"

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode
  className?: string
  label?: string
  addon?: string | React.JSX.Element
  minWidthLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, name, label, addon, minWidthLabel, placeholder = "", ...props }, ref) => {
    return (
      <div className={`flex items-center ${className || ""}`}>
        {label && <p className={`whitespace-nowrap mr-2 text-[#2563eb]`} style={{ width: minWidthLabel }}>{label}</p>}
        <div
          className={
            `w-full rounded-xl border flex bg-white`
          }
        >
          {icon && (
            <div className="flex items-center ml-2">
              {icon}
            </div>
          )}
          <input
            className="outline-0 w-full rounded-xl p-2"
            {...props}
            placeholder={placeholder}
            type={type}
            ref={ref}
            name={name}
            autoComplete="off"
          />
          {addon && (<span className="">{addon}</span>)}
        </div>
      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }
