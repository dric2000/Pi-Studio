import { cn } from "@/lib/utils";

/** Repère « ● REC » discret, point blanc qui clignote doucement. */
export function RecIndicator({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("label-mono inline-flex items-center gap-2", className)}>
      <span className="size-1.5 rounded-full bg-foreground motion-safe:animate-pulse" />
      REC
    </span>
  );
}
