import { Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App