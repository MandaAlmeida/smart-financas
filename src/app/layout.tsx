import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--fonst-inter",
});

export const metadata: Metadata = {
  title: { template: "%s | SmartFinance", default: "SmartFinance" },
  description: "Comece hoje a gerenciar melhor sua vida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={roboto.variable} lang="pt-BR">
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
