import { useState } from 'react'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import { User } from './interfaces'

import './App.scss'

function App() {
  const [user, setUser] = useState<User>({
    username: '',
    organization: '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    if (name === 'organization') {
      setUser({
        ...user,
        organization: e.target.value,
      })
    } else {
      setUser({
        ...user,
        username: e.target.value,
      })
    }
  }

  const renderContent = () => {
    if (isFormSubmitted) {
      return <LandingPage user={user} />
    } else {
      return (
        <Login
          user={user}
          handleLogin={handleLogin}
          setIsFormSubmitted={setIsFormSubmitted}
        />
      )
    }
  }

  return <div>{renderContent()}</div>
}

export default App
