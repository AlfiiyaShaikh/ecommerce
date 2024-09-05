import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        toast.success("Password reset link sent to your email!", {
            position: "top-center"
        });
        console.log(data);
    };

    const onError = (errors) => {
        toast.error("Please provide a valid email address.", {
            position: "top-center"
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
                            placeholder="Enter your email"
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

                    <div className="form-control mt-6 text-center">
                        <button className="btn" style={{ backgroundColor: '#BED754', color: '#FCFCFC' }}>Send Reset Link</button>
                    </div>

                    <div className="text-center mt-4">
                        <p>Remembered your password? <a href="/login" className="link link-hover text-blue-500">Login here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
