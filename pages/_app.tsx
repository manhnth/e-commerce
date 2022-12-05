import '../assets/main.css'
import '../plugins/axios'
import type { AppProps } from 'next/app'
import { ManagedUIContext } from '../components/ui/context'
import Layout from '@components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ManagedUIContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
