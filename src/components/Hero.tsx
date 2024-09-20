import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section>
        <div className='centered h-screen -mt-20'>
          <div>
            <div className="text-white">
              <p className='text-4xl md:text-6xl text-yellow-400'>Edumeet</p>
              <p className='text-lg md:text-lg p-5'>Welcome to Edumeet, a platform that will keep you in the loop with all the events taking place within your university</p>
            </div>
            <div className='space-x-10 mt-9 centered'>
              <Button className="bg-indigo-500" onClick={() => navigate("/Meets")}>Meets</Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero
