import ProfileForm from "@/components/ProfileForm"
import Axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Profile = () => {
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
    <div className="h-screen">
        <ProfileForm />
    </div>
  )
}

export default Profile
