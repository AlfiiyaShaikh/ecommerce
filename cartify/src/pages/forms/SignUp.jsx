import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Sign up failed');
            }

            toast.success("Sign up successful!", {
                position: "top-center"
            });
            navigate('/login'); // Redirect to login page
        } catch (error) {
            toast.error("Sign up failed: " + error.message, {
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
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="username"
                            className="input input-bordered"
                            {...register("name", { required: "Username is required" })}
                        />

                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    </div>

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

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="confirm password"
                            className="input input-bordered"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value =>
                                    value === getValues('password') || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                    </div>

                    <div className="form-control mt-6 text-center">
                        <button className="btn" style={{ backgroundColor: '#BED754', color: '#FCFCFC' }}>Sign Up</button>
                    </div>

                    <div className="text-center mt-4">
                        <p>Already have an account? <a href="/login" className="link link-hover text-blue-500">Login here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
