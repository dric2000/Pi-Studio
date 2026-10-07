import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Signature du studio : le π du logo (microtypographie, blanc sur transparent) suivi de « STUDIO »
 * en capitales mono. Tout se dimensionne sur la taille de police du parent (classes text-*).
 */
export function PiMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 leading-none", className)}>
      <Image
        src="/media/brand/logo-mark.png"
        alt=""
        width={597}
        height={593}
        className="h-[2.4em] w-auto"
      />
      <span className="label-mono">Studio</span>
    </span>
  );
}
