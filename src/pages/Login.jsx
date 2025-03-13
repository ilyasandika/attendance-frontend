import { useState } from "react";
import show from "../assets/icons/show.svg";
import hide from "../assets/icons/hide.svg";
import axios from "axios";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                employeeId,
                password,
            });

            const token = response.data.payload.token;

            localStorage.setItem("token", token);

            window.location.href = "/dashboard";
        } catch (err) {
            console.log("error");
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="bg-white shadow-xl mt-10 mx-auto w-8/12 h-full flex">
            <div className="bg-background w-7/12 h-full px-10 pb-20 pt-40">
                <img src="/images/loginpage.svg" className="w-8/10 mx-auto" alt="Login Illustration" />
            </div>

            <div className="bg-white w-5/12 h-full px-10 pt-25 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-center font-bold text-3xl">Welcome to</h1>
                    <h2 className="text-center">Please enter your credentials</h2>
                </div>

                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex flex-col gap-8">
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            className="border-b border-primary p-2 font-semibold focus:outline-none placeholder-primary/80 focus:ring-0"
                            onChange={(e) => {
                                setEmployeeId(e.target.value);
                            }}
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="border-b border-primary p-2 w-full font-semibold focus:outline-none placeholder-primary/80 focus:ring-0 pr-10"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? show : hide} className="w-6 h-6" alt="Toggle Password Visibility" />
                            </button>
                        </div>

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
    );
};

export default Login;
