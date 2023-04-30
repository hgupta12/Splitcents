import React,{useEffect,useState} from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
const Home = () => {
const [credentials,setCredentials]=useState(null);
useEffect(()=>{
  const unsubscribe=onAuthStateChanged(auth,(data)=>{
    if(data)
setCredentials(data);
    else
    {
setCredentials(null);
    }

  });
  return unsubscribe;
},[]);

const handlesignout=()=>{
  signOut(auth).then(()=>{
    setCredentials(null);
  }).catch((error)=>{
    console.log(error);
  });

}
if(credentials){
  return (
    <>
    <div> WELCOME TO SPLITCENTS 
      < div className ='flex justify-left'>
      <button  className='bg-green-600 hover:bg-green-700 text-white-font py-2 px-4 rounded'onClick={handlesignout}>SIGN OUT</button></div>
    </div>
    </>
  )
}
else
{
  return(
    <div className='flex justify-center'>
<Link to='/login'><button 
     className='bg-green-700 hover:bg-green-800 text-white-font py-2 px-4 rounded'>Login to continue</button></Link>
</div>
)
}
}

export default Home;