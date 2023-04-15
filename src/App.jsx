import {Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home';
import {useState } from 'react';
import LoginContext from './components/auth/logincontext';

function App() {
 const [user,setUser]=useState(localStorage.getItem("userName"));
  return (
   <LoginContext.Provider value={user}>
   
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
</Routes>

   </LoginContext.Provider>
  )
}

export default App;
