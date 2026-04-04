import { Link, useNavigate } from "react-router"
import image from "../assets/Image"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../Config/config"

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName]   = useState("")
    const [email, setEmail]         = useState("")
    const [password, setPassword]   = useState("")
    const [error, setError]         = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setError("")
        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                firstName,
                lastName,
                email,
                password,
            })
            navigate("/signin")
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const serverMessage = error?.response?.data?.message
                setError(serverMessage || "Something went wrong. Please try again.")
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return (
        <div className="relative top-30 left-50 w-275 h-125 border border-slate-400 py-8 px-12.5 rounded-sm overflow-hidden">
            <img src={image} alt="img" className="absolute h-130 left-162.5 bottom-1.25 bg-transparent" />
            <div className="text-2xl font-semibold mb-5">
                Ready to share and store <br />
                your notes?
            </div>

            <div className="text-[15px] mb-5">
                Signup and start storing <br />
                your thoughts in second brain.
            </div>

            <div className="flex flex-col gap-5 w-82.5">

                {/* FIX 1: Split "Full name" into firstName + lastName */}
                <div className="flex gap-3">
                    <div className="flex flex-col group flex-1">
                        <label htmlFor="firstName" className="text-[14px] group-focus-within:text-blue-500">First name</label>
                        <input
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            className="placeholder:text-[13px] text-[14px] py-0.5 px-0.5 outline-none border-b-2 border-slate-300 group-focus-within:text-blue-500 group-focus-within:border-blue-400"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col group flex-1">
                        <label htmlFor="lastName" className="text-[14px] group-focus-within:text-blue-500">Last name</label>
                        <input
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            className="placeholder:text-[13px] text-[14px] py-0.5 px-0.5 outline-none border-b-2 border-slate-300 group-focus-within:text-blue-500 group-focus-within:border-blue-400"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col group">
                    <label htmlFor="Email" className="text-[14px] group-focus-within:text-blue-500">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        name="Email"
                        className="placeholder:text-[13px] text-[14px] py-0.5 px-0.5 outline-none border-b-2 border-slate-300 group-focus-within:text-blue-500 group-focus-within:border-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col group">
                    <label htmlFor="Password" className="text-[14px] group-focus-within:text-blue-500">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        name="Password"
                        className="placeholder:text-[13px] text-[14px] py-0.5 px-0.5 outline-none border-b-2 border-slate-300 group-focus-within:text-blue-500 group-focus-within:border-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <p className="mt-3 text-[13px] text-red-500">{error}</p>
            )}

            <button
                className="mt-4 w-35 bg-black text-white py-2 rounded-full transition-all duration-300 hover:bg-blue-500 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                onClick={handleSubmit}
            >
                Sign up
            </button>

            <p className="mt-4 text-[13px] text-slate-500">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-500 hover:underline cursor-pointer">
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default Signup