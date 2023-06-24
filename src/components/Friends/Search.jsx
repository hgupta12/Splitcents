import { collection, doc, getDocs, setDoc, query, where, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useUser } from '../../context/UserContext';
import { db } from '../../firebase';

const Search = () => {
    const [text,setText] = useState("");
    const {currentUser} = useUser();
    const handleSearch = async (e)=>{
        e.preventDefault();
        try {
            const q = query(collection(db,"users"),where("email","==",text))
            const friendSnap = await getDocs(q)
            if(!friendSnap.empty){
                const friend = friendSnap.docs[0].data();
                const alreadyFriend = await getDoc(doc(db,"users",currentUser.uid,"friends",friend.uid))
                if(alreadyFriend.exists())
                    throw {message: "User is already a friend!"}
                console.log(friend)
                await setDoc( doc(db,"users",currentUser.uid,"friends",friend.uid),{...friend, due_amount: 0})
                await setDoc( doc(db,"users",friend.uid,"friends",currentUser.uid),{...currentUser, due_amount: 0})
                alert("Friend added!")
            }else{
                throw {message: "User doesn't exist"}
            }
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
  return (
    <div>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Enter email-id' className='border-solid border-2' onChange={(e)=> setText(e.currentTarget.value)}/>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add</button>
        </form>
    </div>
  )
}

export default Search