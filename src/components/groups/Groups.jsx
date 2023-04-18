import React, { useState } from "react"
import { db, user } from '../../firebase'
import { collection, getDocs, query, where } from "firebase/firestore"

import GroupCard from './ui/GroupCard'

export default function Groups () {
    let [ groups, setGroups ] = useState([])
    let [ loading, setLoading ] = useState(true)

    let q = query(collection(db, "groups"), where("members", "array-contains", user))
    getDocs(q).then(qs => {
        let docs = []
        qs.forEach(doc => docs.push({...doc.data(), id: doc.id}))
        setGroups(docs)
        setLoading(false)
    })
    
    return (
        <div>
            <h2>Groups</h2>
            {loading && "Loading"}

            {groups.map(group => <GroupCard key = {group.id} { ...group} />)}

            {!loading && groups == [] && "Looks like you are not part of any groups... create a new one!"}
        </div>
    )
}