import {Routes, Route} from 'react-router-dom'
import {useState} from 'react'
import Login from './components/auth/Login'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import {UserContext} from './components/Usercontext'

function App() {
const [user, setUser]=useState(null);

  return (
<UserContext.Provider value={{user, setUser}}>
    <>
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
    </UserContext.Provider>
  )
}

export default App
