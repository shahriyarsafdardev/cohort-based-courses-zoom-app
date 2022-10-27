import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'
import { AuthProvider } from '../utils/context/JWTContext'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </main>
    </div>
  )
}

export default MyApp
