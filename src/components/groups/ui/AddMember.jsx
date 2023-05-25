import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import React, { useContext, useEffect, useState } from "react"
import { db } from "../../../firebase"
import { AuthContext } from "../../../context/Authcontext"
import UserList from "../../../ui/UserList"
import Input from "../../../ui/Input"
import getUser from "../../../helpers/User"

export default function AddMember ({ load, group }) {

    let uid = useContext(AuthContext).currentUser.uid
    let [ friends, setFriends ] = useState([])
    let [ name, setName ] = useState("")
    let [ users, setUsers ] = useState([])

    let members = group.members || []
    let gid = group.id

    useEffect(() => {
        let friendships = getDocs(query(collection(db, 'friendships'), where('users', 'array-contains', uid)))

        friendships.then(friendships => {
            setFriends(friendships.docs.map(friendship => {
                let users = friendship.get('users')
                return users[0] == uid ? users[1] : users[0]
            }))
        })
    }, [])

    useEffect(() => {
        let canAdd = []

        Promise.all(friends.map(async friend => {
            if (!members.includes(friend)) {
                let username = (await getUser(friend)).name
                if (username.toLowerCase().includes(name))
                    canAdd.push(friend)
            }
        }))
        .then(() => {
            canAdd.sort()
            setUsers(canAdd)
        })
    }, [ name, group ])

    async function addMember (id) {
        let groupDocRef = doc(db, "groups", gid)

        let newGraph = { ...group.graph }
        newGraph[id] = {}
        
        for (let i in newGraph) {
            if (i == id) continue
            
            newGraph[i][id] = 0
            newGraph[id][i] = 0
        }

        let newData = { 
            members: [ ...members, id ],
            graph: newGraph
        }

        await updateDoc(groupDocRef, newData)
        load()
    }


    return (
        <div className = "flex flex-col items-stretch gap-4">
            <Input
                placeholder = "Search your friends..."
                setter = {setName}
                debounce = {1500}
            />
             
            <UserList
                users = {users}
                selectable = {true}
                text = "Add to group?"
                action = {addMember}
            />
        </div>
    )
}