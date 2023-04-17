import React, { useState } from "react"
import { Outlet, useParams } from "react-router-dom"

export default function GroupLayout () {
    const { gid } = useParams()

    // get the group data and set it here
    let [ group, setGroup ] = useState({ id: gid, name: "S13 Football", members: ["something"]})

    return (
        <>
            <h2>{group.name} - {gid}</h2>
            <Outlet context = {[group, setGroup]} />
        </>
    )
}