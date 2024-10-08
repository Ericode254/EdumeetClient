import { SyntheticEvent, useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EventForm = () => {
    const { id } = useParams(); // Get the event ID from URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('09:00');
    const [speaker, setSpeaker] = useState('');
    const [eventDay, setEventDay] = useState<string | null>(null); // State to store the selected date
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Fetch existing event data for editing
    useEffect(() => {
        if (id) {
            Axios.get(`http://localhost:3000/events/card/${id}`, { withCredentials: true })
                .then((response) => {
                    const { title, description, image, startTime, endTime, speaker, eventDay } = response.data;
                    setTitle(title);
                    setDescription(description);
                    setImage(image); // Handle image preview logic separately if necessary
                    setStartTime(startTime);
                    setEndTime(endTime);
                    setSpeaker(speaker);
                    setEventDay(eventDay); // Pre-fill the date picker when editing an event
                })
                .catch((error) => console.error("Error fetching event data:", error));
        }
    }, [id]);

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
        if (eventDay) formData.append('eventDay', eventDay); // Append the selected date to the form data

        const request = id
            ? Axios.put(`http://localhost:3000/events/event/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            : Axios.post("http://localhost:3000/events/event", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

        request
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
        <div className="h-screen flex items-center justify-center bg-gray-900">
            <form className="max-w-sm w-full p-8 bg-gray-800 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="mb-3">
                    <label htmlFor="title" className="block mb-2 text-sm font-semibold text-white">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter event title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Date picker section */}
                <div className="mb-3">
                    <label htmlFor="eventDay" className="block mb-2 text-sm font-semibold text-white">Event Day</label>
                    <input
                        type="date"
                        id="eventDay"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                        value={eventDay || ''}
                        onChange={(e) => setEventDay(e.target.value)}
                    />
                </div>

                {/* Time range selection */}
                <div className="w-full mb-3">
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
                                    max="19:00"
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
                                    max="19:00"
                                    value={endTime}
                                    required
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="block mb-2 text-sm font-semibold text-white">Event Description</label>
                    <textarea
                        id="message"
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="What is the event all about?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="speaker" className="block mb-2 text-sm font-semibold text-white">Speaker</label>
                    <input
                        type="text"
                        id="speaker"
                        className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter speaker's name"
                        required
                        value={speaker}
                        onChange={(e) => setSpeaker(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-semibold text-white" htmlFor="file_input">Upload Image</label>
                    <input
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg cursor-pointer p-2"
                        id="file_input"
                        type="file"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg p-2.5 focus:ring-4 focus:outline-none focus:ring-indigo-300"
                >
                    {id ? "Update Event" : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default EventForm;
