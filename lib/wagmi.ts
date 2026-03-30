"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient } from "@tanstack/react-query";
import { baseMainnet } from "@/lib/base-chain";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-walletconnect-project-id";

export const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME || "CheckIn Base",
  projectId,
  chains: [baseMainnet],
  ssr: true,
});

export const queryClient = new QueryClient();


