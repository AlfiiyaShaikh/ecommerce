import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(user));

            if (user.user?.role === 'Admin') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

            toast.success("Login successful!", {
                position: "top-center"
            });
        } catch (error) {
            toast.error("Login failed: " + error.message, {
                position: "top-right"
            });
        }
    };

    const onError = (errors) => {
        toast.error("Please fill the details properly", {
            position: "top-right"
        });
        console.log(errors);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <ToastContainer />
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>

                    <div className="form-control mt-6 text-center">
                        <button className="btn" style={{ backgroundColor: '#BED754', color: '#FCFCFC' }}>Login</button>
                    </div>
                    <div className="text-center mt-4">
                        <p>Forgot Password? <a href="/forgot-password" className="link link-hover text-red-600">Click Here</a></p>
                    </div>
                    <div className="text-center mt-4">
                        <p>Don't have an account? <a href="/signup" className="link link-hover text-blue-500">Sign up here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
