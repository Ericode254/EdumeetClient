import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Axios from "axios";

interface Props {
    _id: string;
    title: string;
    description: string;
    image: string;
    startTime: string;
    endTime: string;
    speaker: string;
}

const Card = ({ _id, title, description, image, startTime, endTime, speaker }: Props) => {
    const [likes, setLikes] = useState<number>(0);
    const [dislikes, setDislikes] = useState<number>(0);
    const [currentUserId, setCurrentUserId] = useState<string | null>();


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
        Axios.post(`http://localhost:3000/events/card/${_id}/like`, { userId: currentUserId })
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));
    };

    const handleDislike = () => {
        Axios.post(`http://localhost:3000/events/card/${_id}/dislike`, { userId: currentUserId })
            .then((response) => {
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            })
            .catch((error) => console.error(error));
    };


    return (
        <div className="flex-none h-50 card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={`http://localhost:3000/uploads/${image}`}
                    alt={title}
                    className="w-full h-auto"
                />
            </figure>
            <div className="card-body">
                <div className="text-center">
                    <h2 className="card-title text-yellow-400">{title}</h2>
                </div>
                <p className="text-white">{description}</p>

                <div className="flex justify-between text-white">
                    <p>{`Starts: ${startTime}`}</p>
                    <p>{`Ends: ${endTime}`}</p>
                </div>

                <div className="card-actions justify-between items-center mt-4">
                    <Button className="text-white bg-indigo-500">{speaker}</Button>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <svg
                                onClick={handleLike}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-green-500 cursor-pointer"
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
                                className="w-6 h-6 text-red-500 cursor-pointer"
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
