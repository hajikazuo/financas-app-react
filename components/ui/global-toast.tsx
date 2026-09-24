"use client";

import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/toast";

type GlobalToastProps = {
  message: string | null;
  type?: "error" | "success" | "info" | "warning";
};

export function GlobalToast({ message, type = "info" }: GlobalToastProps) {
  const lastToast = useRef<string | null>(null);

  useEffect(() => {
    if (!message) {
      lastToast.current = null;
      return;
    }

    const toastKey = `${type}:${message}`;

    if (lastToast.current === toastKey) return;

    lastToast.current = toastKey;

    toast.add({
      id: "global-toast",
      type,
      description: message,
      priority: type === "error" ? "high" : "low",
    });
  }, [message, type]);

  return null;
}
