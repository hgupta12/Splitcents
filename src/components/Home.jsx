import React,{useEffect,useState} from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from './auth/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();
/*const [credentials,setCredentials]=useState(null);
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
},[]);*/

const { dispatch } = useContext(AuthContext);
 
const handlesignout=()=>{
  signOut(auth).then(()=>{
    dispatch({type:"LOGOUT",payload:null});
    navigate("/login");
  }).catch((error)=>{
    console.log(error);
  });

}

  return (
    <>
    <div> WELCOME TO SPLITCENTS
      < div className ='flex justify-left'>
      <button  className='bg-green-600 hover:bg-green-700 text-white-font py-2 px-4 rounded'onClick={handlesignout}>SIGN OUT</button></div>
    </div>
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