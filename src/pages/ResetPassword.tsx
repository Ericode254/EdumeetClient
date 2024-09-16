import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const { token } = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        Axios.post("http://localhost:3000/auth/resetpassword/"+token, { password, }).then((response) => {
            if (response.data.status) {
                toast.success("Password Reset Successful")
                navigate("/signin")
            }
            toast.error(response.data.message)
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit}>
                <h1 className="text-white p-3 text-2xl">New Password</h1>
                <Input type="password" placeholder="Password" className="w-auto text-white placeholder:text-white" onChange={(e) => setPassword(e.target.value)}/>
                <Button className="bg-indigo-500 mt-3" type="submit">Reset</Button>
            </form>
        </div>
    )
}

export default ResetPassword
