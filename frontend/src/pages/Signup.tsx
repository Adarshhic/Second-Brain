import {useState} from 'react'
import { useNavigate } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import Input from '../components/ui/input'

 function Signup(){
   const [username ,setUsername] = useState("");
   const [loading , setloading] = useState(false);
    const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    setError("");
    setloading(true);
    try{
        await axiosInstance.post("/signup", { username, password });
      navigate("/signin");
    }
   catch  {
      setError("Something went wrong. Please try again.");
  }
  finally {
    setloading(false);
  }
}
 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    
        <Input
          label = "username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
  </div>
 );
}
export default Signup;