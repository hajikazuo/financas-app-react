"use client";

import { useEffect } from "react";
import { useToastManager } from "@/components/ui/toast";

type GlobalToastProps = {
  message: string | null;
  type?: "error" | "success" | "info" | "warning";
};

export function GlobalToast({ message, type = "info" }: GlobalToastProps) {
  const toastManager = useToastManager();

  useEffect(() => {
    if (!message) return;

    toastManager.add({
      id: "global-toast",
      type,
      description: message,
      priority: type === "error" ? "high" : "low",
    });
  }, [message, toastManager, type]);

  return null;
}
