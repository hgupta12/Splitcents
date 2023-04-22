import { collection, onSnapshot, } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { db } from '../../firebase'

const FriendsList = () => {
    const [friends, setFriends] = useState([])
    const {currentUser} = useUser();

    useEffect(()=>{
        const friendsRef = collection(db,"users",currentUser.uid,"friends");
        const unsubscribe = onSnapshot(friendsRef, docsSnap =>{
            const res = []
            docsSnap.forEach(doc=> res.push(doc.data()));
            setFriends(res)
        })
        return ()=> unsubscribe()
    },[])
  return (
    <div>
        <h4>List of Friends</h4>
        <p>Number of friends: {friends.length} </p>
        {friends.length ? (
            <ul>
                {friends.map(friend =>{
                    return (<li key={friend.uid}>{friend.name}</li>)
                })}
            </ul>
        ): null}
    </div>
  )
}

export default FriendsList