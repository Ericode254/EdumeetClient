import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Axios from "axios"
import { SyntheticEvent, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const { token } = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        Axios.post("http://localhost:3000/auth/resetpassword/" + token, { password, }).then((response) => {
            if (response.data.status) {
                toast.success("Password Reset Successful")
                navigate("/")
            }
            toast.error(response.data.message)
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center p-6">
            <div className="bg-gray-900 shadow-xl rounded-lg p-8 max-w-md w-full">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter your new password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                        type="submit"
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default ResetPassword
