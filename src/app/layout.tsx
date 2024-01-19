"use client";

import { DarkModeButton } from "../components/DarkModeButton";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DarkModeButton />
      {children}
    </Providers>
  );
}
