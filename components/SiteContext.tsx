"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CamperModel } from "@/lib/types";

interface SiteState {
  orderOpen: boolean;
  orderModel: CamperModel | "";
  detailOpen: boolean;
  detailModel: CamperModel | null;
  videoOpen: boolean;
  openOrder: (model?: CamperModel | "") => void;
  closeOrder: () => void;
  openDetail: (model: CamperModel) => void;
  closeDetail: () => void;
  openVideo: () => void;
  closeVideo: () => void;
}

const SiteContext = createContext<SiteState | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderModel, setOrderModel] = useState<CamperModel | "">("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailModel, setDetailModel] = useState<CamperModel | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const value = useMemo<SiteState>(
    () => ({
      orderOpen,
      orderModel,
      detailOpen,
      detailModel,
      videoOpen,
      openOrder: (model: CamperModel | "" = "") => {
        setOrderModel(model);
        setOrderOpen(true);
      },
      closeOrder: () => setOrderOpen(false),
      openDetail: (model: CamperModel) => {
        setDetailModel(model);
        setDetailOpen(true);
      },
      closeDetail: () => setDetailOpen(false),
      openVideo: () => setVideoOpen(true),
      closeVideo: () => setVideoOpen(false),
    }),
    [orderOpen, orderModel, detailOpen, detailModel, videoOpen]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteState {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
