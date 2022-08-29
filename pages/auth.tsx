import React from 'react'
import { useRouter } from "next/router";

function Auth() {
  var router = useRouter();

  var code = router.query["code"];

  return (
    <div>{`Sphere's zoom app has been added to your Zoom`}</div>
  )
}

export default Auth