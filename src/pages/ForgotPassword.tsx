import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        Axios.post("http://localhost:3000/auth/forgot-password", { email, }).then((response) => {
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
        <div className="h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit}>
                <h1 className="text-white p-3 text-2xl">Forgot Password</h1>
                <Input type="email" placeholder="Email" className="w-auto text-white placeholder:text-white" onChange={(e) => setEmail(e.target.value)}/>
                <Button className="bg-indigo-500 mt-3" type="submit">Send</Button>
            </form>
        </div>
    )
}

export default ForgotPassword
