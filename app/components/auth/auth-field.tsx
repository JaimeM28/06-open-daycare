import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function AuthField({
  id,
  label,
  className = "",
  ...inputProps
}: AuthFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-muted"
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={`w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] text-foreground placeholder:text-[#B6A99B] focus-visible:border-[#F2A78E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      />
    </div>
  );
}
