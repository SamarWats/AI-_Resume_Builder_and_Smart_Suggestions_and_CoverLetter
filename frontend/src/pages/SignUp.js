import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.css'; // Import the CSS file

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();


    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (formData.password !== formData.confirmPassword) {
        //   setMessage("Passwords do not match");
        //   return;
        // }

        if (!formData.firstName || !formData.email || !formData.password) {
            setMessage("Please fill all fields");
            return;
        }


        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name: formData.firstName,
                email: formData.email,
                password: formData.password,
            });


            setMessage(res.data.message || "Registration successful");

            // reset form
            setFormData({
                firstName: "",
                email: "",
                password: "",
            });

            // redirect to login
            navigate("/login");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error registering");
        }
    };

    return (
        <div className="min-h-screen bg-[#e6f0fb] flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex flex-col md:flex-row overflow-hidden">
                {/* Left side form */}
                <div className="bg-white flex-1 px-10 py-12 md:py-16 md:px-14 rounded-l-[16px]">
                    <div className="flex items-center space-x-3 mb-8">
                        <img alt="AI Resume Builder logo with brain and letter R in blue" className="w-8 h-8" height="32" src="https://storage.googleapis.com/a1aa/image/873262ec-37f4-4c81-0613-2a5e48e2a6d8.jpg" width="32" />
                        <h1 className="text-blue-600 font-semibold text-lg leading-none">
                            AI Resume Builder
                        </h1>
                    </div>
                    <h2 className="text-slate-900 font-extrabold text-2xl mb-8">
                        Create Your Account
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input className="w-full border border-blue-300 rounded-lg px-4 py-3 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            //   className="w-full border border-blue-300 rounded-lg px-4 py-3"
                            placeholder="First Name"
                            required
                            type="text" />

                        <input className="w-full border border-blue-300 rounded-lg px-4 py-3 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" required name="email"
                            value={formData.email}
                            onChange={handleChange}
                            //   className="w-full border border-blue-300 rounded-lg px-4 py-3"
                            //   placeholder="Email"
                            //   required
                            type="email" />
                        <input className="w-full border border-blue-300 rounded-lg px-4 py-3 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" name="password"
                            value={formData.password}
                            onChange={handleChange}
                            //   className="w-full border border-blue-300 rounded-lg px-4 py-3"
                            placeholder="Password"
                            required
                            type="password" />

                        {/* <input className="w-full border border-blue-300 rounded-lg px-4 py-3 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                            type="password" /> */}

                        {/* Show message */}
                        {message && <p className="text-sm text-red-500">{message}</p>}


                        {/* <p className="text-xs text-slate-700 flex items-center gap-1 mb-2">
              <span className="inline-block w-3 h-3 bg-[#008080] rounded-sm"></span>
              Password Strength: Medium
            </p> */}
                        <label className="inline-flex items-center space-x-2 text-slate-700 text-sm mb-6 cursor-pointer select-none">
                            <input className="w-4 h-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-400" type="checkbox" />
                            <span>
                                I agree to the Terms and Privacy Policy
                            </span>
                        </label>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 text-lg transition-colors" type="submit">
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6">
                        <p className="text-center text-slate-700 text-sm">
                            Or sign up with
                        </p>
                    </div>

                    <div className="flex items-center justify-center space-x-6 mt-8">
                        <hr className="border-gray-300 flex-grow" />
                        <button aria-label="Sign up with Google" className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                            <i className="fab fa-google text-blue-600 text-lg"></i>
                        </button>
                        <button aria-label="Sign up with LinkedIn" className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                            <i className="fab fa-linkedin-in text-blue-600 text-lg"></i>
                        </button>
                        <button aria-label="Sign up with Facebook" className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                            <i className="fab fa-facebook-f text-blue-600 text-lg"></i>
                        </button>
                        <hr className="border-gray-300 flex-grow" />
                    </div>
                    <p className="text-center text-slate-800 mt-6 text-sm">
                        Already have an account?{" "}
                        <a className="font-semibold text-blue-700 hover:underline" href="#">
                            Log in
                        </a>
                    </p>
                </div>
                {/* Right side info */}
                <div className="flex-1 bg-[#7da9e8] rounded-r-[16px] px-10 py-16 md:py-20 md:px-14 flex flex-col justify-center text-white">
                    <h3 className="font-extrabold text-3xl leading-tight mb-10">
                        Build Your
                        <br />
                        Future
                    </h3>
                    <ul className="space-y-6 text-lg font-normal">
                        <li className="flex items-center gap-4">
                            <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
                                <i className="fas fa-check text-white text-sm"></i>
                            </div>
                            <span>
                                Smart AI Matching
                            </span>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
                                <i className="fas fa-check text-white text-sm"></i>
                            </div>
                            <span>
                                Custom Templates
                            </span>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="bg-blue-600 rounded-full p-2 flex items-center justify-center">
                                <i className="fas fa-check text-white text-sm"></i>
                            </div>
                            <span>
                                Instant Download
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SignUp;