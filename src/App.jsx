import {Routes, Route,Navigate} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home';
import {useContext} from 'react';
import { AuthContext } from './components/auth/AuthContext';
//import { onAuthStateChanged } from 'firebase/auth';
//import { auth } from './firebase';

function App() {
  const {currentUser} = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

 
 return (
    <>
  
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
      <Route path='/' element={
                <RequireAuth>
                  <Home />
                </RequireAuth>}/>
       <Route path="/login" element={<Login/>}/>
       
              
            
       
      
</Routes>

 </>
  
  )
}

export default App;
