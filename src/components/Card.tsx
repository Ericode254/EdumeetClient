import { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface Props {
    _id: string;
    title: string;
    description: string;
    image: string;
    startTime: string;
    endTime: string;
    eventDate: string;
    speaker: string;
    creatorId: string;
    onDelete: (id: string) => void;
}

const Card = ({ _id, title, description, image, startTime, endTime, eventDate, speaker, creatorId, onDelete }: Props) => {
    const [likes, setLikes] = useState<number>(0);
    const [dislikes, setDislikes] = useState<number>(0);
    const [currentUserId, setCurrentUserId] = useState<string | null>();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        setCurrentUserId(userId);

        Axios.get(`http://localhost:3000/events/card/${_id}/reactions`)
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));

        const interval = setInterval(() => {
            const now = new Date();
            const timeString = endTime;
            const dateString = eventDate;
            const combinedString = `${dateString}T${timeString}:00`;
            const dateObject = new Date(combinedString)

            if (now > dateObject) {
                confirmDelete();
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [_id, endTime]);

    const handleLike = useCallback(() => {
        Axios.post(`http://localhost:3000/events/card/${_id}/like`)
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));
    }, [_id]);

    const handleDislike = useCallback(() => {
        Axios.post(`http://localhost:3000/events/card/${_id}/dislike`)
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));
    }, [_id]);

    const handleDelete = useCallback(() => {
        const confirmToast = toast.custom((t) => (
            <div className={`bg-gray-800 text-white p-4 rounded shadow-md flex flex-col items-center
                ${t.visible ? 'animate-enter' : 'animate-leave'}
                fixed left-1/2 transform -translate-x-1/2 top-1/4 z-50 w-11/12 sm:w-1/3`}>
                <h2 className="font-bold text-lg text-center mb-2">Confirm Deletion</h2>
                <p className="text-center mb-4">Are you sure you want to delete this event?</p>
                <div className="flex justify-between w-full space-x-2">
                    <Button
                        onClick={() => {
                            confirmDelete();
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
    }, [_id]);

    const confirmDelete = () => {
        Axios.delete(`http://localhost:3000/events/event/${_id}`)
            .then(() => {
                toast.success("Event deleted successfully");
                onDelete(_id);
            })
            .catch((error) => {
                console.error("Error deleting event:", error);
                toast.error("Failed to delete the event");
            });
    };

    const handleEdit = useCallback(() => {
        navigate(`/edit/${_id}`);
    }, [_id, navigate]);

    return (
        <div className="flex-none h-auto card bg-gray-900 w-96 shadow-2xl rounded-lg overflow-hidden">
            <figure>
                <img
                    src={`http://localhost:3000/uploads/${image}`}
                    alt={title}
                    className="w-full h-56 object-cover"
                />
            </figure>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="card-title text-yellow-400 text-2xl font-bold">{title}</h2>
                </div>
                <p className="text-gray-300 text-sm mb-4">{description}</p>

                {/* Event Day Section */}
                <div className="mb-4 text-center">
                    <p className="text-gray-200 font-semibold">Event Day:</p>
                    <p className="text-yellow-400 text-xl font-bold">{new Date(eventDate).toLocaleDateString()}</p>
                </div>

                <div className="flex justify-between text-gray-400 text-sm mb-4">
                    <p>{`Starts: ${startTime}`}</p>
                    <p>{`Ends: ${endTime}`}</p>
                </div>
                <div className="card-actions flex justify-between items-center">
                    <Button className="text-white bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-full transition-transform transform hover:scale-105">
                        {speaker}
                    </Button>
                    {currentUserId === creatorId && (
                        <Button onClick={handleEdit} className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full transition-transform transform hover:scale-105">
                            Edit
                        </Button>
                    )}
                    {currentUserId === creatorId && (
                        <Button onClick={handleDelete} className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full transition-transform transform hover:scale-105">
                            Delete
                        </Button>
                    )}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <svg
                                onClick={handleLike}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-green-500 cursor-pointer hover:scale-110 transition-transform"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="text-white ml-1">{likes}</span>
                        </div>
                        <div className="flex items-center">
                            <svg
                                onClick={handleDislike}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition-transform"
                            >
                                <path d="M12 2.65l1.45 1.32C18.6 6.64 22 9.72 22 13.5c0 3.08-2.42 5.5-5.5 5.5-1.74 0-3.41-.81-4.5-2.09C10.91 18.19 9.24 19 7.5 19 4.42 19 2 16.58 2 13.5c0-3.78 3.4-6.86 8.55-11.54L12 2.65z" />
                            </svg>
                            <span className="text-white ml-1">{dislikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
