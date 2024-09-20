import Axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const Profile = () => {
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify").then((response) => {
      if (response.data.status) {
        navigate("/Profile")
      } else {
        toast.error(response.data.message)
        navigate("/")
      }
    }).catch((error) => {
      console.log(error)
    })
  })
  return (
    <div className="h-screen">

    </div>
  )
}

export default Profile
