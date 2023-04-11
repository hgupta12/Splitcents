import {Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home'


function App() {
  return (
    <>
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
