import "../assets/main.css";
import "../plugins/axios";
import type { AppProps } from "next/app";
import { ManagedUIContext } from "../components/ui/context";
import Layout from "@components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

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
