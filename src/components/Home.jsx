import React,{useEffect,useState} from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
const Home = () => {
const [access,setAccess]=useState(null);
useEffect(()=>{
  const unsubscribe=onAuthStateChanged(auth,(data)=>{
    if(data)
    setAccess(data);
    else
    {
setAccess(null);
    }

  });
  return unsubscribe;
},[]);

const handlesignout=()=>{
  signOut(auth).then(()=>{
    setAccess(null);
  }).catch((error)=>{
    console.log(error);
  });

}
if(access){
  return (
    <>
    <div> WELCOME TO SPLITCENTS
      {console.log(access)}
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