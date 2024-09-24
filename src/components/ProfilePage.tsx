import { useEffect, useState } from "react";
import Axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on mount
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setEmail(response.data.email);
        setUsername(response.data.username);
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    fetchData();
  }, []);



  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">User Name</label>
          <p className="text-gray-200">{username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Email Address</label>
          <p className="text-gray-200">{email}</p>
        </div>
        <form className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none p-2"
              placeholder="Enter new password"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-md p-2 transition duration-200"
            onClick={() => navigate("/forgotPassword")}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
