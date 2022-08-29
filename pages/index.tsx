import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import axios from '../utils/axios';
import { AuthProvider } from '../utils/context/JWTContext'
import AuthGuard from './AuthGuard';
import SessionTab from './SessionTab';

export default function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AuthProvider>
          <AuthGuard>
            <SessionTab />
          </AuthGuard>
        </AuthProvider>
      </main>
    </div>
  )
}
