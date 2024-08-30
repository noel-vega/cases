/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9ltCxYc4xku
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input as ShadInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { nanoid } from "nanoid";
type Props = {
  className?: string;
  placeholder?: string;
  icon?: JSX.Element;
};
export function Input(props: Props) {
  const id = nanoid();
  return (
    <label htmlFor={id} className={cn("relative w-full", props.className)}>
      {props.icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {props.icon}
        </div>
      )}
      <ShadInput
        id={id}
        type="search"
        placeholder={props.placeholder}
        className={cn(
          "w-full rounded-md border border-muted-foreground/50 bg-transparent py-2 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary bg-white ",
          { "pl-10": props.icon }
        )}
      />
    </label>
  );
}

export function InputIcon({
  icon,
  placeholder,
  className,
}: {
  icon: JSX.Element;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <Input
        placeholder="Search"
        className="w-full rounded-md border border-muted-foreground/50 bg-transparent py-2 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
