import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href="/" className="text-yellow-400 text-lg">Home</a></li>
                        <li><a href="/Meets" className="text-yellow-400 text-lg">Meets</a></li>
                        <li><a href="/Profile" className="text-yellow-400 text-lg">Profile</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a href="/" className="btn btn-ghost text-xl text-yellow-400">Edumeet</a>
            </div>
            <div className="navbar-end">
                <Button className="mr-5 bg-indigo-500" onClick={() => navigate("/signup")}> SignUp </Button>
                <Button className="bg-indigo-500" onClick={() => navigate("/signin")}>  SignIn </Button>
            </div>
        </div>
    )
}

export default Navbar
