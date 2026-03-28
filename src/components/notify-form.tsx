"use client";

import * as React from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NotifyFormProps = {
  className?: string;
  submitLabel?: string;
  successMessage?: string;
  successTitle?: string;
  pendingLabel?: string;
  inlineFeedback?: boolean;
  inputClassName?: string;
  buttonClassName?: string;
  successClassName?: string;
  source?: string;
};

export function NotifyForm({
  className,
  submitLabel = "Être informé",
  successMessage = "Merci. Vous serez informé des prochaines représentations.",
  successTitle = "Inscription confirmée",
  pendingLabel = "Envoi en cours...",
  inlineFeedback = false,
  inputClassName,
  buttonClassName,
  successClassName,
  source = "site",
}: NotifyFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    setIsSubmitting(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Une erreur est survenue.");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(data.message ?? successMessage);
      event.currentTarget.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Une erreur est survenue.";
      setIsSubmitting(false);
      setErrorMessage(message);
      toast.error(message);
    }
  };

  if (inlineFeedback && isSuccess) {
    return (
      <div
        className={cn(
          "space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4",
          successClassName
        )}
        aria-live="polite"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          {successTitle}
        </p>
        <p className="text-base text-white sm:text-lg">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        type="email"
        name="email"
        required
        placeholder="Votre email"
        aria-label="Votre email"
        disabled={isSubmitting}
        className={cn(inputClassName)}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto",
          buttonClassName
        )}
      >
        {isSubmitting ? pendingLabel : submitLabel}
      </Button>
      {errorMessage ? (
        <p className="text-sm text-red-300 sm:basis-full" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
