import {Routes, Route,Navigate} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home';
import Signup from './components/auth/Signup';
import {useContext} from 'react';
import { AuthContext } from './context/Authcontext';
function App() {
  const {currentUser} = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const IfnotAuth = ({ children }) => {
    return currentUser ?  <Navigate to="/" />:children;};

return (
    < div className='relative'>
    < div className="">
    <div className="font-sans font-family:Roboto font-normal font-bold text-3xl">Splitcents</div>
    </div>
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
      </IfnotAuth>}/>    
      </Routes>

 </div>
  
  )
}
export default App;