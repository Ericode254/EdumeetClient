import { Button } from "./ui/button"

interface Props {
    title: string,
    description: string,
    image: string,
    startTime: string,
    endTime: string,
    speaker: string
}

const Card = ({ title, description, image, startTime, endTime, speaker } : Props) => {
    return (
        <div className="flex-none h-50 card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={`http://localhost:3000/uploads/${image}`}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-yellow-400">{`${title}`}</h2>
                <p className="text-white">{`${description}`}</p>
                <p className="text-white">{`${startTime}`}</p>
                <p className="text-white">{`${endTime}`}</p>
                <div className="card-actions justify-end">
                    <Button className="textwhite bg-indigo-500">{`${speaker}`}</Button>
                </div>
            </div>
        </div>

    )
}

export default Card
