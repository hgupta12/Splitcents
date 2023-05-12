import React from "react"
import { user } from "../../../firebase"
import { Link } from "react-router-dom"

export default function GroupCard ({ id, name, graph}) {


    let due
    if (!graph[user])
        due = 0
    else
        Object.values( graph[user] ).reduce((prev, cur) => prev+cur, 0)
    

    return (
        <div>
            <Link to={`/group/${id}`}>
                <h3>
                    {name}
                </h3>
            </Link>
            <p>
                {due > 0 && `you owe ${due}`}
                {due == 0 && `no dues`}
                {due < 0 && `you're owed ${due}`}
            </p>
        </div>
    )
}