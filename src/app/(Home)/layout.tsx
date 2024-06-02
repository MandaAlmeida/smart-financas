"use client";
import TransactionsProvider from "@/contexts/TransactionsContext";
import { GlobalStyle } from "@/styles/globals";
import { defaultTheme } from "@/styles/themes/default";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>{children}</TransactionsProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
}
