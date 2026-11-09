import { cn } from "#/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "text" | "circle" | "block";
}

export function Skeleton({
  shape = "block",
  className,
  ...props
}: SkeletonProps) {
  const shapeClasses = {
    text: "h-3 w-full rounded",
    circle: "size-10 rounded-full shrink-0",
    block: "h-[120px] w-full rounded-2xl",
  }[shape];

  return (
    <div
      className={cn("animate-pulse bg-neutral-200/70", shapeClasses, className)}
      {...props}
    />
  );
}
