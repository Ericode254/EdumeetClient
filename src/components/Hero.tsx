import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="h-screen flex items-center justify-center">
      <div className='text-center -mt-20'>
        <div className="text-white">
          <p className='text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4'>EUCOSSAMeets</p>
          <p className='text-lg md:text-lg p-5 max-w-xl mx-auto leading-relaxed'>
            Welcome to EUCOSSAMeets, a platform that will keep you in the loop with all the events taking place within your university.
          </p>
        </div>
        <div className='mt-9'>
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/Meets")}
          >
            Meets
          </Button>
        </div>
      </div>
    </section>

  )
}

export default Hero
