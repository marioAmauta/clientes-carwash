import "./styles.css";

import { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

import { SITE_TITLE } from "@/lib/constants";

import { ButtonBackToTop } from "./button-back-to-top";
import { Header } from "./header";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE
  }
};

export const viewport: Viewport = {
  themeColor: "#034da9"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className="grid min-h-screen-dynamic grid-rows-pancake-stack">
        <Header />
        <main className="container mx-auto space-y-8 p-4 pb-12 pt-8 lg:space-y-12 lg:py-8">{children}</main>
        <ButtonBackToTop />
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
