import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleLogout = () => {
        Axios.get("http://localhost:3000/auth/logout").then((response) => {
            if (response.data.status) {
                localStorage.clear();
                toast.success("Logged Out Successfully");
                navigate("/");
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const getUserRole = async () => {
        const userId = localStorage.getItem("currentUserId");

        try {
            const response = await Axios.get(`http://localhost:3000/auth/user/${userId}`, { withCredentials: true });
            return response.data.role;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        const fetchRole = async () => {
            const role = await getUserRole();
            if (role) {
                setRole(role);
            }
        };

        fetchRole();
    }, [])

    return (
        <div className="navbar bg-transparent">
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
                        <li><a href="/home" className="text-yellow-400 text-lg">Home</a></li>
                        <li><a href="/Meets" className="text-yellow-400 text-lg">Meets</a></li>
                        {(role === 'admin' || role === 'publisher') && (
                            <li><a href="/eventform" className="text-yellow-400 text-lg">Post Meet</a></li>
                        )}
                        {role === 'admin' && (
                            <li><a href="/dashboard" className="text-yellow-400 text-lg">Dashboard</a></li>
                        )}
                        <li><a href="/Profile" className="text-yellow-400 text-lg">Profile</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a href="/home" className="btn btn-ghost text-xl text-yellow-400">EUCOSSAMeets</a>
            </div>
            <div className="navbar-end">
                <Button className="mr-5 bg-indigo-500" onClick={handleLogout}> LogOut </Button>
            </div>
        </div>
    )
}

export default Navbar
