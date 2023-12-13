import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import OTPverify from './pages/OTPverify'
import PasswordReset from './pages/PasswordReset'
import ChangePassword from './pages/ChangePassword'
import Fileupload from './pages/fileupload'
import Home from './pages/Home'
import GPACalculator from './pages/GPACalculator'
import UpdatePassword from './pages/UpdatePassword'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/GPACalc" element={<GPACalculator />} />
        <Route path="/fileupload" element={<Fileupload />} />
        <Route path ="/Verification" element={<OTPverify />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path ="/Reset" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fileupload" element={<Home   />} />
        <Route path="/Changepassword" element={<ChangePassword />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;