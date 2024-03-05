import { useState } from 'react'
import { User } from '../interfaces'

interface LoginProps {
  user: User
  handleLogin: (e: React.ChangeEvent<HTMLInputElement>) => void
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({
  user,
  handleLogin,
  setIsFormSubmitted,
}: LoginProps) {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (password === 'password') {
      setIsFormSubmitted(true)
    }
    setPasswordError('Incorrect password, please try again')
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <label>
          <span>Organization:</span>
          <input
            min={4}
            max={20}
            name="organization"
            onChange={(e) => handleLogin(e)}
            value={user.organization}
          />
        </label>
        <label>
          <span>Username:</span>
          <input
            min={4}
            max={20}
            name="username"
            onChange={(e) => handleLogin(e)}
            value={user.username}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {passwordError && <span className="error">{passwordError}</span>}
        <button>Login</button>
      </form>
    </div>
  )
}
