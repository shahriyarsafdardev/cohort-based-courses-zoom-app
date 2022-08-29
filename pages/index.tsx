import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import axios from '../utils/axios';


export default function Home() {

  const [user, setUser] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (event: any) => {

    event.preventDefault()
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    const endpoint = '/users/login.json'

    await axios.post(endpoint, data).then((response) => {
      setUser(response.data.user)
      setIsLoggedIn(true);
    })
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!loggedIn &&
          <form onSubmit={handleSubmit}>
            <label htmlFor="first">Email</label>
            <input type="text" id="email" name="email" required />

            <label htmlFor="last">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Submit</button>
          </form>
        }
      </main>
    </div>
  )
}
