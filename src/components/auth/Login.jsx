import React ,{ useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {auth, db} from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../Usercontext'
import { collection, getDocs} from 'firebase/firestore';



const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError]=useState(0);

  const [filteredData, setFilteredData] = useState([]);
  
  const navigate = useNavigate();
  const {user, setUser}=useContext(UserContext);
  const userRef=collection(db, "users");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const currentuser= await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
      console.error(error);
      setShowError(1);
    }


    const data = await getDocs(userRef);
  const filteredData =data.docs.map((doc) =>({...doc.data(),
    userId: doc.id
  }))
  setFilteredData(filteredData);


  {
    const matchingUser = filteredData.find((user) => user.Email === email);
   if (matchingUser) {     
setUser({
displayName: matchingUser.Name,
email: email,
password:password,
user_id: matchingUser.userId,
profile_pic: matchingUser.profile_pic,
});

}
 navigate('/');
  }
  };


  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
      {(showError==1)&&(<div>Login Failed</div>)}
    </form>
  )
}

export default Login