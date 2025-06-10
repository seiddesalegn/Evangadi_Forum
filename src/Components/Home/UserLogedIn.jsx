import React, { useContext } from 'react'
import { AppStates } from '../../App'

function Home() {
  const {user} = useContext(AppStates)

  return (
    <div>
        <h2>welcome {user}</h2>
    </div>
  )
}

export default Home
