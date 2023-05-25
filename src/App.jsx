import {Routes, Route,Navigate, Outlet} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home';
import Signup from './components/auth/Signup';
import {useContext} from 'react';
import { AuthContext } from './context/Authcontext';


// Groups
import MainLayout from './components/MainLayout'
import GroupLayout from './components/groups/GroupLayout'
import Groups from './components/groups/Groups'
import Members from './components/groups/Members'
import CreateGroup from './components/groups/CreateGroup'


// Friends
import Friends from './components/friends/Friends'
import AddFriend from './components/friends/AddFriend'

function App() {
  const {currentUser} = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };
  const IfnotAuth = ({ children }) => {
    return currentUser ?  <Navigate to="/" />: <Outlet /> };

return (
  <Routes>
    <Route path="/" element = {<MainLayout />}>

      <Route element = {<RequireAuth />}>
        <Route index element = {<Home />} />
        <Route path = "/group" element = {<Groups />} />
        <Route path='/creategroup' element={<CreateGroup/>} />

        <Route path = "/group/:gid">
          <Route index element = {<GroupLayout />} />
          <Route path = "members" element = {<Members />} />
        </Route>
        
        <Route path = "/friends">
          <Route index element={<Friends />} />
          <Route path = "add" element={<AddFriend />} />
        </Route>
      </Route>


      <Route element = {<IfnotAuth />}>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
      </Route>
    </Route>
  </Routes>
  
  )
}
export default App;
