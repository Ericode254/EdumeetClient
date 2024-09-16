import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Meets from "./pages/Meets"
import Profile from "./pages/Profile"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Meets" element={<Meets />}></Route>
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
      <Route path="*"></Route>
    </Routes>
  )
}

export default App
