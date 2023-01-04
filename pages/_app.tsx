import "../assets/main.css";
import "../plugins/axios";
import type { AppProps } from "next/app";
import { ManagedUIContext } from "../components/ui/context";
import Layout from "@components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ManagedUIContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </QueryClientProvider>
    </>
  );
}
