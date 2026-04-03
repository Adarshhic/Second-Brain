import { Route, Routes } from "react-router"
import Signin from "../src/pages/Signin"
import Signup from "../src/pages/Signup"
import DashBoard from "../src/pages/Dashboard"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
     
      </Routes>
    </>
  )
}

export default App