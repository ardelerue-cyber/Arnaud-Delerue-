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
}: NotifyFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setIsSuccess(false);
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success(successMessage);
    event.currentTarget.reset();
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
    </form>
  );
}
