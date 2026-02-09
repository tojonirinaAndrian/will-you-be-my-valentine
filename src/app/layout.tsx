import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Will you be my valentine ?",
  description: "Will you be my valentine ?",
};
const imagesLinks: string[] = [
  "/gifs/1.gif",
  "/gifs/2.gif",
  "/gifs/3.gif",
  "/gifs/4.gif",
  "/gifs/5.gif",
  "/gifs/6.gif",
  "/gifs/7.gif"
]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {imagesLinks.map(link => (
          <link key={link} rel="preload" as="image" href={link} />
        ))}
      </Head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
