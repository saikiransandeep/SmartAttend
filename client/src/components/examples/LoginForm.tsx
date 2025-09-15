import { LoginForm } from '../LoginForm'

export default function LoginFormExample() {
  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    console.log('Login credentials:', credentials)
  }

  return <LoginForm onLogin={handleLogin} />
}