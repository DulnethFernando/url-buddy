import {Navigate, Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

function App() {
    const { data: authUser } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch("u/me");
                const data = res.json();
                if(!res.ok) throw new Error(data.error || "Something went wrong.");
                console.log("authUser is here:", data);
                return data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
        retry: false
    })

  return (
      <div className='flex font-Poppins max-w-full mx-auto'>
          <Routes>
              <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
              <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to="/" />}/>
              <Route path='/login' element={!authUser ? <LoginPage/>  : <Navigate to="/" />}/>
          </Routes>
          <Toaster/>
      </div>
  )
}

export default App;
