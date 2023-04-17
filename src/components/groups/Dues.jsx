import React from "react"
import { useOutletContext } from "react-router-dom"

export default function Dues () {
    let [ group, setGroup ] = useOutletContext()
    return (
        <h3>{group.members[0]}</h3>
    )
}