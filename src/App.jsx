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
import AddExpenses from './components/groups/AddExpenses'
import CreateGroup from './components/groups/CreateGroup'


export default function App() {
  return (
    <Routes>
      <Route path="/" element = {<MainLayout />}>
        <Route path = "/login" element = {<Login/>}/>

        <Route path = "/group" element = {<Groups />} />
        <Route path='/creategroup' element={<CreateGroup/>} />

        <Route path = "/group/:gid" element = {<GroupLayout />}>
          <Route index element = {<Dues />} />
          <Route path='/group/:gid/addexpense'>
            <Route index element ={<AddExpenses/>}/>
          </Route>

          <Route path = "members">
            <Route index element = {<Members />} />
            <Route path = "add" element = {<AddMember />} />
          </Route>

          <Route path = ":uid" element = {<Transact />} />
        </Route>
      </Route>
    </Routes>
  )
}
