"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import type { RadioPlayerState } from "@/hooks/useRadioPlayer";
import { getCurrentShow, getNextShow } from "@/lib/schedule";
import type { ShowScheduleItem } from "@/types/radio";

interface RadioContextValue extends RadioPlayerState {
  currentShow: ShowScheduleItem;
  nextShow: ShowScheduleItem;
}

const RadioPlayerContext = createContext<RadioContextValue | null>(null);

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentShow, setCurrentShow] = useState<ShowScheduleItem>(() =>
    getCurrentShow()
  );
  const [nextShow, setNextShow] = useState<ShowScheduleItem>(() =>
    getNextShow()
  );

  useEffect(() => {
    const updateLineup = () => {
      setCurrentShow(getCurrentShow());
      setNextShow(getNextShow());
    };
    updateLineup();
    const interval = setInterval(updateLineup, 60000);
    return () => clearInterval(interval);
  }, []);

  const player = useRadioPlayer(
    process.env.NEXT_PUBLIC_STREAM_URL,
    `${currentShow.title} (${currentShow.presenter})`
  );

  return (
    <RadioPlayerContext.Provider
      value={{
        ...player,
        currentShow,
        nextShow,
      }}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadio(): RadioContextValue {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) {
    throw new Error("useRadio must be used within a RadioPlayerProvider");
  }
  return ctx;
}
