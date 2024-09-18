import Card from "@/components/Card"
import Navbar from "@/components/Navbar"
import Axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Meets = () => {
  const navigate = useNavigate()
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
    <Navbar />
    <div className="h-screen p-5">
      <Card />
    </div>
    </>
  )
}

export default Meets
