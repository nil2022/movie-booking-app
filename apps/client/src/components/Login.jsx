import React from "react";
import { Button, useToast } from '@chakra-ui/react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState({
        email: "",
        password: ""
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
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL;
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/login`, values);
            
            toast({
                title: "Login successful",
                description: "You've been logged in!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/");
        } catch (error) {
            let errorMessage = "An error occurred during login";
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            toast({
                title: "Login failed",
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Login to Your Account</h2>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                
                <Button
                    type="submit"
                    isLoading={loading}
                    loadingText="Logging in..."
                    colorScheme="blue"
                    width="full"
                    mt={4}
                >
                    Login
                </Button>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#3182ce', textDecoration: 'underline' }}>
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;