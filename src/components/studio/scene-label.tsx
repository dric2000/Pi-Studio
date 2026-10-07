import { cn } from "@/lib/utils";

type SceneLabelProps = {
  number: number;
  title: string;
  className?: string;
};

/** Repère de section façon découpage technique : « SC. 01 — Services ». */
export function SceneLabel({ number, title, className }: SceneLabelProps) {
  return (
    <div className={cn("flex items-center gap-4 text-muted-foreground", className)}>
      <span className="label-mono text-foreground">SC. {String(number).padStart(2, "0")}</span>
      <span aria-hidden className="h-px w-10 bg-border" />
      <span className="label-mono">{title}</span>
    </div>
  );
}
