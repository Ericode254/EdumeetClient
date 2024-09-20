import { SyntheticEvent, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const EventForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('09:00')
    const [speaker, setSpeaker] = useState('')

    const [isVisible, setIsVisible] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        Axios.post("http://localhost:3000/events/event", { title, description, image, startTime, endTime, speaker }).then((response) => {
            if (response.data.status) {
                toast.success(response.data.message)
                navigate("/Meets")
            } else {
                toast.error("Error while publishing the event")
            }
        }).catch((error) => {
            console.log(error);

        })
    }

    return (
        <>
            <div className="h-screen flex-1 flex-col justify-center px-4 py-12 lg:px-8">
                <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">

                        <label className="block mb-2 text-sm font-medium text-white dark:text-white" htmlFor="file_input">Upload Image</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(e) => setImage(e.target.value)} />

                    </div>


                    <div className="w-[16rem]">
                        <button id="selectTimeToggle" data-collapse-toggle="time-range-container" type="button" className="text-blue-700 dark:text-blue-500 text-base font-medium hover:underline p-0 inline-flex items-center mb-2" onClick={() => setIsVisible(!isVisible)}>Select time
                            <svg className="w-8 h-8 ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4 4 4-4" />
                            </svg>
                        </button>
                        {isVisible && (
                            <div id="time-range-container" className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-2">
                                <div>
                                    <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-white dark:text-white">Start time:</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="start-time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value={startTime} required onChange={(e) => setStartTime(e.target.value)}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-white dark:text-white">End time:</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="end-time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value={endTime} required onChange={(e) => setEndTime(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-white dark:text-white">Event Description</label>
                            <textarea id="message" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is the event all about" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="speaker" className="block mb-2 text-sm font-medium text-white">Speaker</label>
                            <input type="text" id="speaker" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required onChange={(e) => setSpeaker(e.target.value)} />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>

    )
}

export default EventForm
