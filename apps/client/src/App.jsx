import './App.css'
import { useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {

  // const clientSidePort = import.meta.env.VITE_CLIENT_PORT
  // const databaseURL = import.meta.env.VITE_DATABASE_URL
  // const VITE_URL = import.meta.env.VITE_CRM_BACKEND_URL
  // const VITE_CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN

  // console.log('Environment Value: ', clientSidePort, VITE_URL, VITE_CORS_ORIGIN, databaseURL)

  // const navigate = useNavigate('')

  return (
    <>
      <h1 className='text-3xl font-bold text-center antialiased'>
        Movie Booking App
      </h1>
      <Register />
      <Login />
    </>
  )
}

export default App
