import {Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/Home'


// Groups
import GroupLayout from './components/groups/GroupLayout'
import Groups from './components/groups/Groups'
import Dues from './components/groups/Dues'
import Members from './components/groups/Members'
import AddMember from './components/groups/AddMember'
import Transact from './components/groups/Transact'


export default function App() {
  return (
    <>
      <div className="text-3xl font-bold underline">Splitcents</div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/groups" element={<Groups />} />

        <Route path = "/group/:gid" element = {<GroupLayout />} loader = {() => 123456789}>
          <Route index element = {<Dues />} />

          <Route path = "members">
            <Route index element = {<Members />} />
            <Route path = "add" element = {<AddMember />} />
          </Route>

          <Route path = ":uid" element = {<Transact />} />
        </Route>
      </Routes>
    </>
  )
}
