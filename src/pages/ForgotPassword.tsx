import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Axios from "axios"
import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        Axios.post("http://localhost:3000/auth/forgot-password", { email, }).then((response) => {
            console.log(response.data);

            if (response.data.status) {
                toast.success("Check your Email to reset your password")
                navigate("/")
            } else {
                toast.error("Invalid Email address")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center p-6">
            <div className="bg-gray-900 shadow-xl rounded-lg p-8 max-w-md w-full">
                <h1 className="text-white text-3xl font-bold text-center mb-6">Forgot Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                        type="submit"
                    >
                        Send Reset Link
                    </Button>
                </form>
            </div>
        </div>


    )
}

export default ForgotPassword
