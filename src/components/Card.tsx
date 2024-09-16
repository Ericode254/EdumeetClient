import { Button } from "./ui/button"

const Card = () => {
    return (
        <div className="flex-none h-50 card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-yellow-400">Shoes!</h2>
                <p className="text-white">If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Button className="textwhite bg-indigo-500">Register</Button>
                </div>
            </div>
        </div>

    )
}

export default Card
