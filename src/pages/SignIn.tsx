import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import toast from "react-hot-toast"
import { jwtDecode } from "jwt-decode"

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        Axios.post("http://localhost:3000/auth/signin", { email, password }).then((response) => {
            if (response.data.status) {
                navigate("/home")
                toast.success("Log in successfully")
                const token = response.data.token;
                const decodedToken = jwtDecode(token)
                const userId = decodedToken.id
                localStorage.setItem("currentUserId", userId)
            } else {
                toast.error(response.data.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="/src/assets/education.svg"
                        className="mx-auto h-20 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to EUCOSSAMeets
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white placeholder-gray-500 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="/ForgotPassword" className="font-semibold text-teal-600 hover:text-teal-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white placeholder-gray-500 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Not a member?{' '}
                        <button className="font-semibold leading-6 text-teal-600 hover:text-teal-500" onClick={() => navigate("/signup")}>
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>

        </>
    )
}

export default SignIn
