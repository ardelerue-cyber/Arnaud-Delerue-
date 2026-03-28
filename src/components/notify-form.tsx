"use client";

import * as React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NotifyFormProps = {
  className?: string;
};

export function NotifyForm({ className }: NotifyFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Merci. Vous serez informé des prochaines représentations.");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        type="email"
        name="email"
        required
        placeholder="Votre email"
        aria-label="Votre email"
      />
      <Button
        type="submit"
        className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
      >
        Être prévenu
      </Button>
    </form>
  );
}
