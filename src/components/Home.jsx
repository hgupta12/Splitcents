import React from 'react'
import { useUser } from '../context/UserContext'
import SignOut from './auth/SignOut';
import GroupList from './groups/GroupList';

const Home = () => {
  const {currentUser} = useUser();
  return (
    <>
    <div>Home</div>
    <p>Hello {currentUser.name}!</p>
    <GroupList/>
    <SignOut/>
    </>
  )
}

export default Home