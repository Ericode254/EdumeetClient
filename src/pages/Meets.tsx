import Card from "@/components/Card"
import Navbar from "@/components/Navbar"
import Axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Meets = () => {
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify").then((response) => {
      if (response.data.status) {
        navigate("/Meets")
      } else {
        toast.error(response.data.message)
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
