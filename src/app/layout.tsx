import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixco",
  description: "Download Pictures for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between pl-6 pr-4 pb-4 pt-4 sticky top-0 z-10 bg-white">

            <h1 className="font-bold text-3xl">Pixco</h1>
            <UserButton />
          </header>
          <SignedOut></SignedOut>
          <SignedIn></SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
