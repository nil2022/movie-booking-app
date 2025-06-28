import React from "react";
import { Button, useToast } from '@chakra-ui/react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Register() {
    const toast = useToast();
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState({
        fullName: "",
        email: "",
        password: "",
        userId: ""
    });
    const [errors, setErrors] = React.useState({
        fullName: "",
        email: "",
        password: "",
        userId: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues({
            ...values,
            [id]: value
        });
        if (errors[id]) {
            setErrors({
                ...errors,
                [id]: ""
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!values.fullName.trim()) {
            newErrors.fullName = "Name is required";
            valid = false;
        }

        if (!values.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = "Please enter a valid email";
            valid = false;
        }

        if (!values.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (values.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        if (!values.userId.trim()) {
            newErrors.userId = "Username is required";
            valid = false;
        } else if (values.userId.length < 3) {
            newErrors.userId = "Username must be at least 3 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL;
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/signup`, values);
            
            toast({
                title: "Registration successful",
                description: "Your account has been created!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setValues({
                fullName: "",
                email: "",
                password: "",
                userId: ""
            });
        } catch (error) {
            let errorMessage = "An error occurred during registration";
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            toast({
                title: "Registration failed",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Create an Account</h2>
            
            <form onSubmit={handleRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label htmlFor="fullName" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'medium' }}>Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="John Doe"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: `1px solid ${errors.fullName ? '#e53e3e' : '#e2e8f0'}`, borderRadius: '0.375rem' }}
                        value={values.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#e53e3e' }}>{errors.fullName}</p>}
                </div>
                
                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'medium' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: `1px solid ${errors.email ? '#e53e3e' : '#e2e8f0'}`, borderRadius: '0.375rem' }}
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#e53e3e' }}>{errors.email}</p>}
                </div>
                
                <div>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'medium' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: `1px solid ${errors.password ? '#e53e3e' : '#e2e8f0'}`, borderRadius: '0.375rem' }}
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#e53e3e' }}>{errors.password}</p>}
                </div>
                
                <div>
                    <label htmlFor="userId" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'medium' }}>Username</label>
                    <input
                        type="text"
                        id="userId"
                        placeholder="johndoe123"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: `1px solid ${errors.userId ? '#e53e3e' : '#e2e8f0'}`, borderRadius: '0.375rem' }}
                        value={values.userId}
                        onChange={handleChange}
                    />
                    {errors.userId && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#e53e3e' }}>{errors.userId}</p>}
                </div>
                
                <Button
                    type="submit"
                    isLoading={loading}
                    loadingText="Registering..."
                    colorScheme="blue"
                    width="full"
                    mt={4}
                >
                    Register
                </Button>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#3182ce', textDecoration: 'underline' }}>
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;