import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Friends from './components/Friends'
import CreateGroup from './components/groups/CreateGroup'
import Home from './components/Home'
import { useUser } from './context/UserContext'

function App() {
  const {currentUser} = useUser();

  const RequireAuth = ({children})=>{
    return currentUser? <>{children}</> : <Navigate to="/login" />
  }
  return (
    <>
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
        <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/friends" element={<RequireAuth><Friends/></RequireAuth>}/>
        <Route path="/create_group" element={<RequireAuth><CreateGroup/></RequireAuth>}/>
      </Routes>
    </>
  )
}

export default App
