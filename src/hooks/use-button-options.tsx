"use client";

import { useEffect, useState } from "react";

export function useButtonOptions({ isPending }: { isPending: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isPending) {
      setIsOpen(false);
    }
  }, [isPending]);

  return { isOpen, setIsOpen };
}
