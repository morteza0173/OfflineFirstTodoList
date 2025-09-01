"use client";
import { cn } from "@/lib/utils";
import { LucideSearch } from "lucide-react";
import React, { useRef, useState } from "react";

interface CustomInputProps extends React.ComponentProps<"input"> {
  label: string;
  icon?: React.ReactNode;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type = "text", label, icon, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(props.value ?? "");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={cn("relative w-full", className)}>
        <div
          className={cn(
            "flex h-16 items-center border border-input rounded-md px-3 py-2 bg-background transition-colors duration-200 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50",
            focused || value ? "ring-2 ring-ring" : ""
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {icon ? (
            <span
              className={cn(
                "ml-2 text-muted-foreground flex-shrink-0",
                (focused || value) && "text-ring"
              )}
            >
              {icon}
            </span>
          ) : (
            <span className="ml-2 text-muted-foreground flex-shrink-0">
              <LucideSearch size={18} />
            </span>
          )}
          <div className="relative flex-1">
            <input
              ref={(node) => {
                if (typeof ref === "function") ref(node);
                else if (ref)
                  (
                    ref as React.MutableRefObject<HTMLInputElement | null>
                  ).current = node;
                inputRef.current = node;
              }}
              type={type}
              className="relative w-full h-full bg-transparent outline-none border-none pt-6 px-3 m-0 z-10 text-foreground font-bold"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              placeholder=" "
              {...props}
            />
            <label
              className={cn(
                "absolute top-3 right-3 text-muted-foreground pointer-events-none transition-all duration-200 bg-background ",
                (focused || value) && "top-0 text-sm"
              )}
            >
              {label}
            </label>
          </div>
        </div>
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";

export default CustomInput;
