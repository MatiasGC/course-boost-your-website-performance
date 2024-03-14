import Top from "@/components/top";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Top/>
      <Component {...pageProps} />
    </>
  );
}
