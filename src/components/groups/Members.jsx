import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { db } from "../../firebase"
import UserList from "../../ui/UserList"
import AddMember from "./ui/AddMember"

export default function Members () {
    let { gid } = useParams()

    let [ group, setGroup ] = useState({})
    let [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if (!loading) return

        let groupDoc = getDoc(doc(db, 'groups', gid))

        groupDoc.then(groupDoc => {
            let group = { id: groupDoc.id, ...groupDoc.data() }
            setLoading(false)
            setGroup(group)
        })

    }, [ loading ])

    
    return (
        <div>
            <h1 className = "text-2xl font-semibold border-b-2 border-cyan-300 px-4 py-6">{group.name}</h1>
            <div className = "flex my-8">
                <div className = "w-1/2 border-r-2 border-cyan-300 flex flex-col gap-8">
                    <h2 className="text-xl font-semibold px-4">Members</h2>
                    <UserList
                        users = {group.members}
                    />
                </div>
                <div className = "w-1/2 py-4 px-6">
                    <h2 className="text-xl font-semibold pb-8">Add Members</h2>
                    <AddMember
                        group = { group }
                        load = {() => setLoading(true)}
                    />
                </div>
        </div>
        </div>
    )
}