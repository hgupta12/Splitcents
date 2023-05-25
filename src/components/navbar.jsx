import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useState } from 'react';
import {auth,db} from '../firebase.js';
import { AuthContext } from '../context/Authcontext';
import { useContext ,useEffect} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";


import { signOut } from 'firebase/auth';
import {useNavigate,Navigate} from 'react-router-dom';

function MainNavigation() {

    const [showNav, setShowNav] = useState(false);
    const [showList, setShowList] = useState(false);  

    const toggleNav = () => {
      setShowNav(!showNav);
    };

    function handleToggleList() {
      setShowList(!showList);
    }

    const navigate=useNavigate();

const {dispatch}=useContext(AuthContext);
const handlesignout=()=>{
  signOut(auth).then(()=>{
    dispatch({type:"LOGOUT",payload:null});
    navigate("/login");
  }).catch((error)=>{
    console.log(error);
  });

}
    
   const { currentUser } = useContext(AuthContext);
   const userId = currentUser.uid


    const [groups, setGroups] = useState([]);

    useEffect(() => {
      const groupsRef = collection(db, "groups");
      const q = query(groupsRef, where("members", "array-contains", userId));
  
      getDocs(q).then((querySnapshot) => {
        const groups = [];
        querySnapshot.forEach((doc) => {
          groups.push(doc.data());
        });
        setGroups(groups);
      });
    }, [db, userId]);


    return<>
    <header 
    className='top-0 left-0'>
         <section className='flex items-center
           
           text-white
       bg-cyan-950
       border
       border-solid
       border-white/0.1
      border-white border-opacity-10
       h-14
       '>

           <button 
           className='w-12
            h-12
            bg-transparent
            left-5
            m-3
            relative
            mb-3.5' 
            onClick={toggleNav}>
         <div className={classes.menuIcon}></div>
   
        </button>

        <h1 
        className='text-4xl
        font-medium
         ml-6
          mb-3'>Splitcents</h1>
          </section>


        {currentUser && (
        <nav className={`${classes.nav} ${showNav ? classes.navOpen : ''}`}>

        <ul>
            <li className={classes.navfirst}>
            <div  onClick={handleToggleList} className={classes.grpnav}>
    <span className=' inline-block'>

      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0L7.73333 8L15.4667 0H0Z" fill="black"/>
</svg>
</span> 

    <Link  to='/group'
    className={`${classes.item} ${classes.grp} `}>Groups</Link>
</div>
    <ul className={`${classes.group} ${showList ? classes.showGrp : ''}`}>
      {groups.map((group) => (
        <Link to={`/group/${group.id}`} key={group.id} 
        className={classes.groupElements}> {group.name}</Link>
      ))}
    </ul>
 
</li>
 <li className={classes.navList}>
            <svg width="30" height="30" viewBox="0 0 35 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.2895 9.42857C25.8668 9.42857 27.9318 7.32286 27.9318 4.71429C27.9318 2.10571 25.8668 0 23.2895 0C20.7121 0 18.6316 2.10571 18.6316 4.71429C18.6316 7.32286 20.7121 9.42857 23.2895 9.42857ZM10.8684 9.42857C13.4458 9.42857 15.5108 7.32286 15.5108 4.71429C15.5108 2.10571 13.4458 0 10.8684 0C8.29105 0 6.21053 2.10571 6.21053 4.71429C6.21053 7.32286 8.29105 9.42857 10.8684 9.42857ZM10.8684 12.5714C7.25079 12.5714 0 14.41 0 18.0714V22H21.7368V18.0714C21.7368 14.41 14.4861 12.5714 10.8684 12.5714ZM23.2895 12.5714C22.8392 12.5714 22.3268 12.6029 21.7834 12.65C23.5845 13.97 24.8421 15.7457 24.8421 18.0714V22H34.1579V18.0714C34.1579 14.41 26.9071 12.5714 23.2895 12.5714Z" fill="black"/>

          </svg> 
                <Link to='/friends' className={classes.item}>Friends</Link>
            </li> 

            <li className={classes.navList}>
                <svg width="30" height="22" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.75 18.75V3.75C33.75 1.6875 32.0625 0 30 0H3.75C1.6875 0 0 1.6875 0 3.75V18.75C0 20.8125 1.6875 22.5 3.75 22.5H30C32.0625 22.5 33.75 20.8125 33.75 18.75ZM16.875 16.875C13.7625 16.875 11.25 14.3625 11.25 11.25C11.25 8.1375 13.7625 5.625 16.875 5.625C19.9875 5.625 22.5 8.1375 22.5 11.25C22.5 14.3625 19.9875 16.875 16.875 16.875ZM41.25 5.625V26.25C41.25 28.3125 39.5625 30 37.5 30H5.625V26.25H37.5V5.625H41.25Z" fill="black"/>
</svg>

                <Link to='/transactions' className={classes.item}>Transactions</Link>
            </li>


            <li className={classes.navList}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 15C19.1437 15 22.5 11.6438 22.5 7.5C22.5 3.35625 19.1437 0 15 0C10.8562 0 7.5 3.35625 7.5 7.5C7.5 11.6438 10.8562 15 15 15ZM15 18.75C9.99375 18.75 0 21.2625 0 26.25V30H30V26.25C30 21.2625 20.0063 18.75 15 18.75Z" fill="black"/>
</svg>

                <Link to='/profile' className={classes.item}>Profile</Link>
            </li>

            <li className={classes.navList}>
                <svg width="30" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25 6.66667L22.65 9.01667L26.95 13.3333H10V16.6667H26.95L22.65 20.9667L25 23.3333L33.3333 15L25 6.66667ZM3.33333 3.33333H16.6667V0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H16.6667V26.6667H3.33333V3.33333Z" fill="black"/>
</svg>

                <Link onClick={handlesignout} className={classes.item}>Logout</Link>
            </li>
        </ul>
    </nav>   
        )}

    </header>
   </>
}

export default  MainNavigation;
