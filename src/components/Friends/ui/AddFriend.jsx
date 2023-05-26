import React, { useContext, useEffect, useState } from "react"
import { addDoc, collection, endAt, getCountFromServer, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { AuthContext } from '../../../context/Authcontext'
import UserList from "../../../ui/UserList"
import Input from "../../../ui/Input"

export default function AddFriend () {
    let user = useContext(AuthContext).currentUser.uid
    
    const [ email, setEmail ] = useState("")
    const [ result, setResult ] = useState([])
    
    
    function search () {
        if (email == "") {
            setResult([])
            return
        }
        
        let q = query(collection(db, "users"), orderBy("email"), startAt(email), endAt(email+'\uf8ff'), limit(10))
        getDocs(q).then(async qs => {
            let r = qs.docs.map(doc => {
                return { ...doc.data(), id: doc.id}
            })
            let friends = r.map(el => {
                let friendship = [user, el.id]
                friendship.sort()
                let q = query(collection(db, "friendships"), where("users", "==", friendship))
                return getCountFromServer(q)
            })
            let requests1 = r.map(el => {
                return getCountFromServer(query(collection(db, "friend_requests"), where("from", "==", user), where("to", "==", el.id)))
            })
            let requests2 = r.map(el => getCountFromServer(query(collection(db, "friend_requests"), where("from", "==", el.id), where("to", "==", user))))
            
            friends = (await Promise.all(friends)).map(doc => doc.data().count)
            let requests = (await Promise.all([...requests1, ...requests2])).map(doc => doc.data().count)
            
            let notFriends = []

            for (let i in r)
                if (requests[i] == 0 && friends[i] == 0 && r[i].id != user)
                    notFriends.push(r[i])

            setResult(notFriends)
        })
    }

    useEffect(search, [ email ])
    

    function addFriend (id) {
        addDoc(collection(db, "friend_requests"), {from: user, to: id})
        .then(search)
    }
 
    return (
        <div className = "flex flex-col items-stretch gap-4">
            <Input
                placeholder = "Search email ID..."
                setter = {setEmail}
                debounce = {1500}
            />
             
            <UserList
                users = {result.map(u => u.id)}
                selectable = {true}
                text = "Send friend request?"
                action = {addFriend}
            />
        </div>
    )
}
