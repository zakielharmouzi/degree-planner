import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import OTPverify from './pages/OTPverify'
import PasswordReset from './pages/PasswordReset'
import ChangePassword from './pages/ChangePassword'
import Fileupload from './pages/fileupload'
import Home from './pages/Home'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/fileupload" element={<Fileupload />} />
        <Route path ="/xd" element={<OTPverify />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path ="/LOL" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fileupload" element={<Home   />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
