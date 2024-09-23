import { SyntheticEvent, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('09:00');
    const [speaker, setSpeaker] = useState('');

    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        }

        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        formData.append('speaker', speaker);

        Axios.post("http://localhost:3000/events/event", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                if (response.data.status) {
                    toast.success(response.data.message);
                    navigate("/Meets");
                } else {
                    toast.error("Error while publishing the event");
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while publishing the event.");
            });
    };

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gray-900">
                <form className="max-w-sm w-full p-8 bg-gray-800 shadow-lg rounded-lg" onSubmit={handleSubmit}>

                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-semibold text-white">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter event title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-semibold text-white" htmlFor="file_input">Upload Image</label>
                        <input
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg cursor-pointer p-2"
                            id="file_input"
                            type="file"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>

                    <div className="w-full mb-6">
                        <button
                            id="selectTimeToggle"
                            type="button"
                            className="text-indigo-400 text-base font-medium hover:underline"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            Select Time
                        </button>
                        {isVisible && (
                            <div id="time-range-container" className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="start-time" className="block mb-2 text-sm font-semibold text-white">Start time:</label>
                                    <input
                                        type="time"
                                        id="start-time"
                                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                                        min="09:00"
                                        max="18:00"
                                        value={startTime}
                                        required
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-time" className="block mb-2 text-sm font-semibold text-white">End time:</label>
                                    <input
                                        type="time"
                                        id="end-time"
                                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                                        min="09:00"
                                        max="18:00"
                                        value={endTime}
                                        required
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-semibold text-white">Event Description</label>
                        <textarea
                            id="message"
                            rows={3}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="What is the event all about?"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="speaker" className="block mb-2 text-sm font-semibold text-white">Speaker</label>
                        <input
                            type="text"
                            id="speaker"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter speaker's name"
                            required
                            onChange={(e) => setSpeaker(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg p-2.5 focus:ring-4 focus:outline-none focus:ring-indigo-300"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </>
    );
};

export default EventForm;
