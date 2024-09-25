import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Sidebar = () => {
    const navigate = useNavigate();

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
    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Admin Dashboard
            </div>
            <nav className="mt-6 flex-grow">
                <Link
                    to="/dashboard"
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-700"
                >
                    Dashboard
                </Link>
                <Link
                    to="/user-management"
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-700"
                >
                    User Management
                </Link>
                <Link
                    to="/event-management"
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-700"
                >
                    Event Management
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Link
                    to="/logout"
                    className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-red-600"
                    onClick={handleLogout}
                >
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
