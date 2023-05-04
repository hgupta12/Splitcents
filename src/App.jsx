import {Routes, Route,Navigate} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home';
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
    <>
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
       </Routes>

 </>
  
  )
}
export default App;