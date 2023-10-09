import Login from './Login'
import './App.css'
import Home from './Home'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
