import Head from 'next/head'
import ChatInterface from '../components/ChatInterface'

export default function Home() {
  return (
    <>
      <Head>
        <title>Persona AI Chat</title>
        <meta name="description" content="Chat with AI personas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChatInterface />
    </>
  )
}