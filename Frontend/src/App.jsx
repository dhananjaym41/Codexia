

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home.jsx';
function App() {


  return (
    <>
      <div>
        <p className='text-[#000000] bg-blue'>hii i am anurag wadikar</p>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
        </div>
    </>
  )
}

export default App
