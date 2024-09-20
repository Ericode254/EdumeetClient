import Axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PreLoader from "@/components/PreLoader"


const Home = () => {
  const navigate = useNavigate()
  Axios.defaults.withCredentials = true
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify").then((response) => {
      if (response.data.status) {
        navigate("/home")
      } else {
        navigate("/")
      }
    }).catch((error) => {
      console.log(error)
    })
  })

  return (
    <>
    <PreLoader />
    <section>
      <div className='wrapper md:px-20 lg:px-40'>
        <Navbar/>
        <Hero />
      </div>
    </section>
    </>
  )
}

export default Home
