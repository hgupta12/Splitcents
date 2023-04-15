import {Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home'
import Signup from './components/auth/Signup'


function App() {
  return (
    <>
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
