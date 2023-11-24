import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
//import Home from './pages/Home'
import OTPverify from './pages/OTPverify'
import PasswordReset from './pages/PasswordReset'
import ChangePassword from './pages/ChangePassword'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/xd" element={<OTPverify />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path ="/LOL" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
