import { useState } from "react";
import show from "../assets/icons/show.svg";
import hide from "../assets/icons/hide.svg";
import axios from "axios";
import AuthServices from "../services/AuthServices.js";
import TextBox from "../Components/Form/TextBox.jsx";
import {useErrors} from "../hooks/useErrors.jsx";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const {fieldErrors, generalError, setErrors, clearErrors} = useErrors();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await AuthServices.login({ employeeId, password });
            const token = response.data.payload.token;
            const user = response.data.payload.user;

            localStorage.setItem("token", token);
            localStorage.setItem("id", user.id);
            localStorage.setItem("employeeId", user.employeeId);
            localStorage.setItem("role", user.role)
            localStorage.setItem("name", user.name);

            window.location.href = "/dashboard";
        } catch (err) {
            setErrors(err);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-xl w-10/12 max-w-5xl flex">
                <div className="bg-background w-7/12 h-full px-10 pb-20 pt-40">
                    <img src="/images/loginpage.svg" className="w-8/10 mx-auto" alt="Login Illustration" />
                </div>

                <div className="bg-white w-5/12 h-full px-10 pt-25 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center font-bold text-3xl">Welcome to</h1>
                        <h2 className="text-center">Please enter your credentials</h2>
                    </div>

                    <form onSubmit={handleLogin}>

                        <div className="flex flex-col gap-8">
                            <div className={`w-full space-y-2 ${fieldErrors?.employeeId && "animate-shake" }`}>
                                <input
                                    type="text"
                                    name="employeeId"
                                    placeholder="Employee ID"
                                    className={`w-full border-b border-primary p-2 font-semibold focus:outline-none placeholder-primary/80 focus:ring-0 ${fieldErrors?.employeeId && " border-red-500" }`}
                                    onChange={(e) => {
                                        setEmployeeId(e.target.value);
                                        clearErrors();
                                    }}

                                />
                                {fieldErrors?.employeeId && (
                                    <span className="text-red-500 text-sm mt-1">{fieldErrors?.employeeId}</span>
                                )}
                            </div>



                            <div className={`w-full space-y-2 ${fieldErrors?.employeeId && "animate-shake" }`}>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        className="border-b border-primary p-2 w-full font-semibold focus:outline-none placeholder-primary/80 focus:ring-0 pr-10"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            clearErrors();
                                        }}

                                    />

                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        <img src={showPassword ? show : hide} className="w-6 h-6" alt="Toggle Password Visibility" />
                                    </button>
                                </div>

                                {fieldErrors?.password && (
                                    <span className="text-red-500 text-sm mt-1">{fieldErrors?.password}</span>
                                )}
                            </div>


                            {generalError && (
                                <div className="text-red-500 text-sm  bg-red-500/10 px-4 py-2 rounded">
                                    <span>{generalError}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center text-sm px-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="w-4 h-4 accent-primary"
                                    />
                                    Remember Me
                                </label>
                                <a href="#" className="text-primary hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-primary text-white font-semibold py-3 rounded-4xl hover:bg-primary/80 transition">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Login;
