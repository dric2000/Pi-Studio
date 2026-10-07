"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { unlock, type UnlockState } from "@/app/acces/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AccessForm() {
  const searchParams = useSearchParams();
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlock, {});

  return (
    <form action={action} className="w-full max-w-sm">
      <input type="hidden" name="suite" value={searchParams.get("suite") ?? "/"} />
      <label htmlFor="password" className="label-mono text-muted-foreground">
        Mot de passe
      </label>
      <div className="mt-2 flex items-end gap-3">
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={!!state.error}
          aria-describedby={state.error ? "password-error" : undefined}
          className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-lg shadow-none focus-visible:border-foreground focus-visible:ring-0 aria-invalid:border-foreground aria-invalid:ring-0 dark:bg-transparent dark:aria-invalid:border-foreground dark:aria-invalid:ring-0"
        />
        <Button type="submit" size="xl" disabled={pending} aria-label="Entrer">
          {pending ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
        </Button>
      </div>
      {state.error && (
        <p id="password-error" role="alert" className="mt-3 text-sm">
          ✕ {state.error}
        </p>
      )}
    </form>
  );
}
