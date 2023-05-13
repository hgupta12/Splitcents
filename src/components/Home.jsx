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
/*
else
{
  return(
    <div className='flex justify-center'>
<Link to='/login'><button 
      className='bg-green-700 hover:bg-green-800 text-white-font py-2 px-4 rounded'>Login to continue</button></Link>
</div>
)
}*/
}

export default Home;