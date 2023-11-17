import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import Home from './pages/Home'
import PasswordReset from './pages/PasswordReset'
import ChangePassword from './pages/ChangePassword'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/xd" element={<PasswordReset />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
