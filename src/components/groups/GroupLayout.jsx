import React, { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"

import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"


export default function GroupLayout () {
    const { gid } = useParams()

    // get the group data and set it here
    let [ group, setGroup ] = useState({})

    useEffect(() => {
        let q = getDoc(doc(db, `groups/${gid}`))
        q.then(doc => setGroup({ ...doc.data(), id: gid}))
    }, [])

    return (
        <>
            <h2>{group.name}</h2>
            <Outlet context = {[ group, setGroup ]} />
        </>
    )
}