import { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin' | 'publisher';
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await Axios.get<User[]>('http://localhost:3000/auth/users', { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users.");
            }
        };

        fetchUsers();
    }, []);

    // Handle role update
    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'publisher') => {
        setLoading(true);
        try {
            const response = await Axios.put(`http://localhost:3000/auth/user/${userId}/role`, { role: newRole }, { withCredentials: true });

            if (response.data.status) {
                toast.success("Role updated successfully");
                setUsers(prevUsers => prevUsers.map(user => user._id === userId ? { ...user, role: newRole } : user));
            } else {
                toast.error("Failed to update role: " + response.data.message);
            }
        } catch (error) {
            toast.error("Error updating role");
            console.error("Error during role update:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle user deletion with confirmation toast
    const handleDeleteUser = (userId: string) => {
        toast.custom((t) => (
            <div className={`bg-gray-800 border border-gray-700 p-4 rounded flex justify-between items-center ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                <span className="text-gray-200">Are you sure you want to delete this user?</span>
                <div className="flex space-x-2">
                    <button
                        onClick={async () => {
                            // Dismiss the confirmation toast
                            toast.dismiss(t.id);

                            setLoading(true); // Set loading
                            try {
                                const response = await Axios.delete(`http://localhost:3000/auth/user/${userId}`, { withCredentials: true });
                                if (response.data.status) {
                                    toast.success("User deleted successfully");
                                    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                                } else {
                                    toast.error("Failed to delete user: " + response.data.message);
                                }
                            } catch (error) {
                                toast.error("Error deleting user");
                                console.error("Error during user deletion:", error);
                            } finally {
                                setLoading(false); // Reset loading
                            }
                        }}
                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)} // Just dismiss the toast
                        className="bg-gray-500 hover:bg-gray-400 text-white py-1 px-3 rounded"
                    >
                        No
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex bg-gray-900 text-gray-200 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6">User Management</h1>

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                    <table className="min-w-full bg-gray-800 text-gray-200">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="py-3 px-4 text-left">User ID</th>
                                <th className="py-3 px-4 text-left">Username</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-600 transition duration-200">
                                    <td className="py-3 px-4">{user._id}</td>
                                    <td className="py-3 px-4">{user.username}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <select
                                            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                            defaultValue={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin' | 'publisher')}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="publisher">Publisher</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <button
                                            onClick={() => handleRoleChange(user._id, user.role)}
                                            disabled={loading}
                                            className={`bg-indigo-600 hover:bg-indigo-500 text-white py-1 px-3 rounded transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            disabled={loading}
                                            className={`bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
