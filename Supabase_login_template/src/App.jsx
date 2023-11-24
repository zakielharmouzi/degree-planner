import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import Fileupload from './pages/fileupload'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fileupload" element={<Fileupload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
