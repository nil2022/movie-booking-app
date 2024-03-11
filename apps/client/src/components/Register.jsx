import React from "react"
import { Button } from '@chakra-ui/react'
import axios from "axios"

function Register() {
    const [loading, setLoading] = React.useState(false)
    const [values, setValues] = React.useState({
        fullName: "",
        email: "",
        password: "",
        userId: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        setValues({
            ...values, [e.target.id]: e.target.value
        })
    }

    const handleRegistration = async(e) => {
        e.preventDefault()

        const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL
        setLoading(true)
        // Handle registration here
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/signup`, values)
            setLoading(false)

            console.log('Response:', response)
        } catch (error) {
            setLoading(false)
            console.log('Error:', error)
        }

        console.log('Values:', values)
    }

    // console.log('Values:', values)

    return (
        <>
            <div className="m-5 p-8">
                Register Component
                <br />
                <label className="text-xl font-bold">Name: </label>
                <input type="text" placeholder="John Doe" id="fullName"
                    className="border border-black rounded-sm focus:outline-none hover:bg-slate-300 transition-all duration-500"
                    value={values.fullName}
                    onChange={handleChange}
                />
                <br />
                <label className="text-xl font-bold">Email: </label>
                <input type="email" placeholder="john@email.com" id="email"
                    className="border border-black rounded-sm focus:outline-none hover:bg-slate-300 transition-all duration-500"
                    value={values.email}
                    onChange={handleChange}
                />
                <br />
                <label className="text-xl font-bold">Password: </label>
                <input type="password" placeholder="Password" id="password"
                    className="border border-black rounded-sm focus:outline-none hover:bg-slate-300 transition-all duration-500"
                    value={values.password}
                    onChange={handleChange}
                />
                <br />
                <label className="text-xl font-bold">Username: </label>
                <input type="text" placeholder="Username" id="userId"
                    className="border border-black rounded-sm focus:outline-none hover:bg-slate-300 transition-all duration-500"
                    value={values.userId}
                    onChange={handleChange}
                />
                <br />
                <Button
                    isLoading={loading}
                    loadingText='Processing...'
                    colorScheme='blue'
                    variant='outline'
                    className="border-2 px-10 mx-5 my-2 text-xl font-bold antialiased shadow-md hover:bg-slate-300 
                    transition-all duration-500 rounded-lg focus:outline-none"
                    onClick={handleRegistration}
                >
                    Register
                </Button>
            </div>
        </>
    )
}

export default Register