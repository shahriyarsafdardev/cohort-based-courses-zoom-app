import React from 'react'
import { useRouter } from 'next/router'

function Auth() {
  const router = useRouter()

  const code = router.query['code']

  return <div>{`Sphere's zoom app has been added to your Zoom`}</div>
}

export default Auth
