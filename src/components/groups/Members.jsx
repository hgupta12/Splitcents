import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { db } from "../../firebase"

export default function Members () {
    let [ group, setGroup ] = useOutletContext()
    let [ members, setMembers ] = useState([])

    useEffect(() => {
        if (!group.id) return

        let memberData = []
        let fetches = group.members.map(id => {
            return getDoc(doc(db, "users", id))
        })

        Promise.all(fetches).then(docs => {
            docs.map(doc => memberData.push({ ...doc.data(), id: doc.id }))
            setMembers(memberData)
        })

    }, [ group ])
    return (
        <>
            <h2>Members &nbsp;&nbsp; <a href={`/group/${group.id}/members/add`}>➕</a></h2>
            <ul>
                { members.map(member => {
                    return <li key = {member.id}>{member.name}</li>
                }) }
            </ul>
        </>
    )
}