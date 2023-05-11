import React, { useContext, useEffect, useState } from "react"
import { db } from "../../firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/Authcontext'

import FriendCard from './ui/FriendCard'
import RequestCard from './ui/RequestCard'


export default function Friends () {
    let user = useContext(AuthContext).currentUser.uid

    const [ friends, setFriends ] = useState([])
    const [ requests, setRequests ] = useState([])
    const [ loading, setLoading ] = useState(true)


    async function fetchData () { 
        let q1 = query(collection(db, "friendships"), where("users", "array-contains", user))
        let q2 = query(collection(db, "friend_requests"), where("to", "==", user))

        let [ qs1, qs2 ] = await Promise.all([ getDocs(q1), getDocs(q2) ])
        let uids = new Set()

        let friendsArray = qs1.docs.map(doc => {
            let users = doc.data().users
            let otherUser = users[0] == user ? users[1] : users[0]
            uids.add(otherUser)

            return otherUser
        })

        let requestsArray =  qs2.docs.map(doc => {
            let from = doc.data().from
            uids.add(from)

            return { id: doc.id, from }
        })

        let userPromises = Array.from(uids).map(id => {
            return getDoc(doc(db, "users", id))  
        })

        let userDocs = await Promise.all(userPromises)
        let userData = {}

        for (let i of userDocs) {
            userData[i.id] = { ...i.data(), id: i.id } 
        }

        setFriends(friendsArray.map(id => userData[id]))
        setRequests(requestsArray.map(req => { return { ...userData[req.from], req_id: req.id } }))
        setLoading(false)
    }

    if (loading) fetchData()

    async function addFriend (req) {
        await deleteDoc(doc(db, "friend_requests", req.req_id))

        let users = [user, req.id]
        users.sort()
        await addDoc(collection(db, "friendships"), { users })
    }

    async function rejectRequest (req) {
        await deleteDoc(doc(db, "friend_requests", req.req_id))
    }


    return (
        <div>
            <h1 className="font-bold text-4xl ml-4 mt-4 "> Add Friends <Link to = "/friends/add">+</Link></h1>
            {loading && "Loading"}
            
            {
                requests.length > 0
                ?
                <>
                
                    <h2 className="font-bold text-2xl ml-4 mt-4  ">Requests</h2>
                    {
                        requests.map(request => 
                            <RequestCard 
                                key = {request.id} 
                                {...request} 
                                rejectRequest = {() => rejectRequest(request)}
                                addFriend = {() => addFriend(request)}
                                load = {() => setLoading(true)}
                            /> 
                        )
                    }
                    <hr />
                </>
                :
                null
            }
<h2 className="font-bold text-2xl ml-4 mt-4 ">Friends</h2>
            {friends.map(friend => <FriendCard key = {friend.id} { ...friend} />)}

            {!loading && friends.length == 0 && "Looks like you haven't added any friends yet... send a friend request to get started!"}

        </div>
    )
}