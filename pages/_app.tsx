import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'
import { AuthProvider } from '../utils/context/JWTContext'
import AuthGuard from './AuthGuard'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  const router = useRouter()

  const code = router.pathname

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {code !== '/auth' ? (
          <AuthProvider>
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </AuthProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </div>
  )
}

export default MyApp
