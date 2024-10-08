import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from 'axios'
import toast from "react-hot-toast"

const SignUp = () => {
    const navigate = useNavigate()

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        Axios.post("http://localhost:3000/auth/signup", { username, email, password }).then(response => {
            if (response.data.status) {
                toast.success("User created successfully")
                navigate("/")
            } else {
                toast.error(response.data.message)
            }
        }).catch(err => {
            console.log(err);

        })
    }

    return (
        <>
            <div className="h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="EduMeet logo"
                        src="/src/assets/education.svg"
                        className="mx-auto h-20 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign Up to EUCOSSAMeets
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium leading-6 text-white">
                                User name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="user"
                                    name="user"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>

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
                                    className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-gray-800 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <button className="font-semibold leading-6 text-teal-600 hover:text-teal-500" onClick={() => navigate("/")}>
                            Sign in
                        </button>
                    </p>
                </div>
            </div>

        </>
    )
}

export default SignUp
