import Head from 'next/head'
import NavBar from './navbar'

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {

  return <>
    <Head>
      <title>Foody</title>
    </Head>
    <header><NavBar /></header>
    <main style={{ paddingBottom: '50px' }}>{children}</main>
  </>
}