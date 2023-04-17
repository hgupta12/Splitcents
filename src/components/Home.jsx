import React, {useContext} from 'react'
import {UserContext} from './Usercontext'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


const Home = () => {
  const {user, setUser}=useContext(UserContext);


  const logout= async () =>{
try{
  await signOut(auth);
} catch (err) {
  console.error(err);
}
setUser(null);
};
  

  return (<>
       {user?<><div>welcome {user.displayName}</div>
       <button onClick={logout}>Logout</button></>:
       <div>Home</div>
       }

    </>
  )
}

export default Home
