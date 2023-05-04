import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import {useContext} from 'react';
import { AuthContext } from './components/auth/AuthContext';

function App() {
  const {currentUser} = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const IfnotAuth =({children}) => {
    return currentUser ? <Navigate to="/" /> :children;}

  
return (<>
  <div className="text-3xl font-bold underline">Splitcents</div>
  <Routes>
  <Route path='/' element={
            <RequireAuth>
              <Home />
            </RequireAuth>}/>
   <Route path="/login" element={
   <IfnotAuth>
   <Login/>
   </IfnotAuth>}/>
   <Route path="/signup" element={
    <IfnotAuth>
   <Signup/>
   </IfnotAuth>
   }/>
   </Routes></>
  
  )
}

export default App
