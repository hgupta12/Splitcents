import React, { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, user } from "../../firebase"

export default function Transact () {
    let [ group, setGroup ] = useOutletContext()
    let [ member, setMember ] = useState({})
    let { uid } = useParams()

    if (group.id) {
        if (!group.members.includes(uid)) window.location = `/group/${group.id}`
        if (group.graph[user][uid] <= 0) window.location = `/group/${group.id}`
    }

    useEffect(() => {
        if (!group.id) return


        getDoc(doc(db, "users", uid)).then(doc => {
            setMember({ ...doc.data(), id: doc.id })
        })

    }, [ group ])

    async function handleTransaction () {
        if (!member.id) return
        if (!group.id) return

        await addDoc(collection(db, "groups", group.id, "transactions"), {
            amount: group.graph[user][uid],
            timestamp: new Date(),
            payer_id: user,
            payee_id: member.id
        })

        let newGraph = new Object(group.graph)
        newGraph[user][uid] = 0

        await updateDoc(doc(db, "groups", group.id), {
            graph: newGraph
        })

        alert("Amount paid!")
        window.location = `/group/${group.id}/dues`
    }


    return (
        <>
            <h2>Pay back</h2>
            <p>{member.name}</p>
            <p>Rs. {group.id && group.graph[user][uid]}</p>
            <button onClick = {handleTransaction}>Pay</button>
        </>
    )
}