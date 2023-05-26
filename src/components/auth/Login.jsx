import React from 'react';
import { signInWithPopup,signInWithEmailAndPassword} from 'firebase/auth';
import {auth,provider,db} from '../../firebase.js';
import { useContext,useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext.jsx';
import {doc,setDoc,getDoc} from "firebase/firestore";
import GoogleAuthBtn from './GoogleAuthBtn.jsx'
import Spinner from '../Spinner.jsx'

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await signInWithEmailAndPassword(auth, email,password);
      const user = res.user;
      console.log(user);
      const userSnap = await getDoc(doc(db,"users",user.uid))
      dispatch({type:"LOGIN",payload: {user: user, name: userSnap.get("name")}})
      setLoading(false)
      navigate('/');

    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message)
    }
  }

  return (
    <div>
      {loading? <Spinner/> : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" className='border-solid border-2' onChange={(e)=> setEmail(e.currentTarget.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" className='border-solid border-2' onChange={(e)=> setPassword(e.currentTarget.value)}/>
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
      </form>
      <GoogleAuthBtn setLoading={setLoading}/>
    </div>
  )
};

export default Login;