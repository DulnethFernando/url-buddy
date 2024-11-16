import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";

function App() {
  return (
      <div className='flex font-Poppins max-w-full mx-auto'>
          <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/signup' element={<SignUpPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
          </Routes>
      </div>
  )
}

export default App;
