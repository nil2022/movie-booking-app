import './App.css'

function App() {

  const clientSidePort = import.meta.env.VITE_CLIENT_PORT
  const VITE_URL = import.meta.env.VITE_CRM_BACKEND_URL
  const VITE_CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN

  console.log('Environment Value: ', clientSidePort, VITE_URL, VITE_CORS_ORIGIN)

  return (
    <>
     <h1 className='text-3xl font-bold text-center antialiased'>
     Movie Booking App
     </h1>
    </>
  )
}

export default App
