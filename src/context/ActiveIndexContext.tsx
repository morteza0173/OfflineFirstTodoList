"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ActiveIndexContextType = {
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
};

const ActiveIndexContext = createContext<ActiveIndexContextType | undefined>(
  undefined
);

export const ActiveIndexProvider = ({ children }: { children: ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ActiveIndexContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </ActiveIndexContext.Provider>
  );
};

export const useActiveIndex = () => {
  const ctx = useContext(ActiveIndexContext);
  if (!ctx)
    throw new Error("useActiveIndex must be used inside ActiveIndexProvider");
  return ctx;
};
