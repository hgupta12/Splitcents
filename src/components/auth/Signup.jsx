import React, {useState,useContext} from 'react'
import {auth, db} from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection} from 'firebase/firestore';
import { UserContext } from '../Usercontext'


const Signup = () => {
  const navigate = useNavigate();
 const userRef=collection(db, "users");
 const { user, setUser } = useContext(UserContext);


    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    
    const signInHandler = async (e) => {
      e.preventDefault();
      try {
       const docRef= await addDoc(userRef, {
          Name: name,
          Email: email,
          Password: password,
          profile_pic: `https://api.dicebear.com/6.x/avataaars/svg?seed=${email}`
        });

        const currentUser =await createUserWithEmailAndPassword(auth, email, password);

        setUser({
          displayName: name ,
          email:  email,
          password: password,
          user_id:docRef.id,
          profile_pic: `https://api.dicebear.com/6.x/avataaars/svg?seed=${email}`
        }); 
      
      } catch (err) {
        console.error(err);
      }
      navigate('/');
    };
   
   
  return (
  <form onSubmit={signInHandler}>
    <div>
      <input placeholder="Full Name" type="text"
       onChange={(e) => setName(e.target.value)}
       required/> 
        </div>
        <div>
      <input placeholder= "Email" type="email"
       onChange={(e) => setEmail(e.target.value)}
       required/> 
        </div>
        <div>
      <input placeholder= "Password" type="password"
      onChange={(e) => setPassword(e.target.value)}
      required/> 
       </div>
       <div>
      <button type="submit">Sign In</button>
      </div>
      </form>
  )
}

export default Signup
