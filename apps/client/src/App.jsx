import './App.css'

function App() {

  const environmentValue = import.meta.env.VITE_PORT
  const VITE_URL = import.meta.env.VITE_CRM_BACKEND_URL
  const VITE_CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN

  console.log('Environment Value: ', environmentValue, VITE_URL, VITE_CORS_ORIGIN)

  return (
    <>
     <h1 className='text-3xl font-bold text-center antialiased'>
     Movie Booking App
     {' '}
     {environmentValue}
     {' '}
     {VITE_URL}
     </h1>
    </>
  )
}

export default App
