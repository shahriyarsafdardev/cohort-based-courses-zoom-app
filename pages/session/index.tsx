import React from 'react'
import SessionTab from './SessionTab'
import AuthGuard from '../AuthGuard'

function index() {
  return (
      <AuthGuard>
        <SessionTab />
      </AuthGuard>
  )
}

export default index
