import { useEffect, useState } from "react";
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
    speaker: string;
    creatorId: string; // Assuming you have a creatorId prop to identify the user who created the card
    onDelete: (id: string) => void;
}

const Card = ({ _id, title, description, image, startTime, endTime, speaker, creatorId, onDelete }: Props) => {
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
    }, [_id]);

    const handleLike = () => {
        Axios.post(`http://localhost:3000/events/card/${_id}/like`)
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));
    };

    const handleDislike = () => {
        Axios.post(`http://localhost:3000/events/card/${_id}/dislike`)
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));
    };

    // New function to handle deleting the card
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            Axios.delete(`http://localhost:3000/events/event/${_id}`)
                .then(() => {
                    toast.success("Event deleted successfully");
                    onDelete(_id); // Call the parent handler to remove the card from UI
                })
                .catch((error) => {
                    console.error("Error deleting event:", error);
                    toast.error("Failed to delete the event");
                });
        }
    };

    // New function to handle editing the card
    const handleEdit = () => {
        navigate(`/edit/${_id}`); // Redirect to edit page
    };


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

                <div className="flex justify-between text-gray-400 text-sm mb-4">
                    <p>{`Starts: ${startTime}`}</p>
                    <p>{`Ends: ${endTime}`}</p>
                </div>

                <div className="card-actions flex justify-between items-center">
                    <Button className="text-white bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-full transition-transform transform hover:scale-105">
                        {speaker}
                    </Button>

                    {/* Edit Button - Only show if the current user is the creator */}
                    {currentUserId === creatorId && (
                        <Button
                            onClick={handleEdit}
                            className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                        >
                            Edit
                        </Button>
                    )}

                    {/* Delete Button */}
                    {currentUserId === creatorId && (
                        <Button
                            onClick={handleDelete}
                            className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                        >
                            Delete
                        </Button>
                    )}

                    <div className="flex items-center space-x-4">
                        {/* Like Button */}
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

                        {/* Dislike Button */}
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
