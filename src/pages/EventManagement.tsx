import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
}

const EventManagement = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    // Fetch events from the API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await Axios.get<Event[]>('http://localhost:3000/events/events', { withCredentials: true });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                toast.error("Failed to fetch events.");
            }
        };

        fetchEvents();
    }, []);

    // Handle event deletion
    const handleDelete = useCallback((eventId: string) => {
        const confirmToast = toast.custom((t) => (
            <div className={`bg-gray-800 text-white p-4 rounded shadow-md flex flex-col items-center
                ${t.visible ? 'animate-enter' : 'animate-leave'}
                fixed left-1/2 transform -translate-x-1/2 top-1/4 z-50 w-11/12 sm:w-1/3`}>
                <h2 className="font-bold text-lg text-center mb-2">Confirm Deletion</h2>
                <p className="text-center mb-4">Are you sure you want to delete this event?</p>
                <div className="flex justify-between w-full space-x-2">
                    <Button
                        onClick={() => {
                            confirmDelete(eventId);
                            toast.dismiss(t.id);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 flex-1 rounded"
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => {
                            toast.dismiss(t.id);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 flex-1 rounded"
                    >
                        No
                    </Button>
                </div>
            </div>
        ));

        toast(confirmToast);
    }, []);

    const confirmDelete = async (eventId: string) => {
        setLoading(true);
        try {
            await Axios.delete(`http://localhost:3000/events/event/${eventId}`, { withCredentials: true });
            toast.success("Event deleted successfully");
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Failed to delete the event");
        } finally {
            setLoading(false);
        }
    };

    // Handle event edit
    const handleEditEvent = (id: string) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="flex bg-gray-900 text-gray-200 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6">Event Management</h1>

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                    <table className="min-w-full bg-gray-800 text-gray-200">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="py-3 px-4 text-left">Event ID</th>
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left">Description</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event._id} className="border-b border-gray-700 hover:bg-gray-600 transition duration-200">
                                    <td className="py-3 px-4">{event._id}</td>
                                    <td className="py-3 px-4">{event.title}</td>
                                    <td className="py-3 px-4">{event.description}</td>
                                    <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <button
                                            onClick={() => handleEditEvent(event._id)}
                                            disabled={loading}
                                            className={`bg-indigo-600 hover:bg-indigo-500 text-white py-1 px-3 rounded transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'Editing...' : 'Edit'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
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

export default EventManagement;
