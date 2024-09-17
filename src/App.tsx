import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Meets from "./pages/Meets"
import Profile from "./pages/Profile"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/Meets" element={<Meets />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
        <Route path="*"></Route>
      </Routes>
    </>
  )
}

export default App
