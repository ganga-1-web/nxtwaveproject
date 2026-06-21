import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Login.css'
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {
      email,
      password,
    }
    const url =
      'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.data.token)
      navigate('/')
    } else {
      setErrorMsg(data.message)
    }
  }
  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="logo">Go Business</h1>
        <p className="subtitle">
          Sign in to open your referral dashboard.
        </p>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login-btn"
          >
            Sign In
          </button>
          <p className="error">{errorMsg}</p>
        </form>
      </div>
    </div>
  )
}
export default Login