import {Routes, Route} from 'react-router-dom'


// Groups
import MainLayout from './components/MainLayout'
import GroupLayout from './components/groups/GroupLayout'
import Groups from './components/groups/Groups'
import Dues from './components/groups/Dues'
import Members from './components/groups/Members'
import Login from './components/auth/Login'
import AddMember from './components/groups/AddMember'
import Transact from './components/groups/Transact'


// Friends
import Friends from './components/friends/Friends'
import AddFriend from './components/friends/AddFriend'



export default function App() {
  return (
    <Routes>
      <Route path="/" element = {<MainLayout />}>
        <Route path = "/login" element = {<Login/>}/>

        <Route path = "/group" element = {<Groups />} />

        <Route path = "/group/:gid" element = {<GroupLayout />}>
          <Route index element = {<Dues />} />

          <Route path = "members">
            <Route index element = {<Members />} />
            <Route path = "add" element = {<AddMember />} />
          </Route>

          <Route path = ":uid" element = {<Transact />} />
        </Route>


        <Route path = "/friends">
          <Route index element={<Friends />} />

          <Route path = "add" element={<AddFriend />} />
        </Route>

      </Route>
    </Routes>
  )
}
