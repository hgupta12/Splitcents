import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../../firebase.js';
import { useContext, } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
const Login = () => {
  
const navitage = useNavigate();
const {dispatch} = useContext(AuthContext);
  const handleLoginWithGoogle= async ()=>{
    try{
const result=await signInWithPopup(auth,provider);
const user = result.user;
       dispatch({type:"LOGIN", payload:user});
       navitage("/");
        <Navigate to="/" />;
        console.log(result.user);

 }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className='flex justify-center'>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
 onClick={handleLoginWithGoogle}>
   <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M42 24c0-1.2-.1-2.3-.3-3.4H24v6.4h8.9c-.4 2.3-2.2 6.8-8.9 6.8-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8c2.6 0 4.4 1.1 5.4 1.9l3.7-3.6c-2.3-2.1-5.3-3.4-8.9-3.4-7.4 0-13.4 6-13.4 13.4s6 13.4 13.4 13.4c8.1 0 12.9-5.7 13.4-6.4l-13-5c-.2-.9-.3-1.8-.3-2.6z"/></svg>Sign in With google</button>
    </div>
  )
};
export default Login;