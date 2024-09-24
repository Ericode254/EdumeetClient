import { useEffect, useState } from 'react';
import Axios from 'axios';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [activeEvents, setActiveEvents] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const usersResponse = await Axios.get('http://localhost:3000/auth/users', { withCredentials: true });
                const eventsResponse = await Axios.get('http://localhost:3000/events/events', { withCredentials: true });

                setTotalUsers(usersResponse.data.length);
                setActiveEvents(eventsResponse.data.length);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="flex h-screen justify-center items-center"><p className="text-white">Loading...</p></div>;
    }

    if (error) {
        return <div className="flex h-screen justify-center items-center"><p className="text-red-500">{error}</p></div>;
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-4xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold">Overview</h2>
                    <p className="mt-2">Use the sidebar to manage users and other admin tasks.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-3xl">{totalUsers}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Active Events</h3>
                        <p className="text-3xl">{activeEvents}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
