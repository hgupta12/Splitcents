import React from "react"
import { user } from "../../../firebase"

export default function GroupCard ({ id, name, graph}) {


    let due
    if (!graph[user])
        due = 0
    else
        Object.values( graph[user] ).reduce((prev, cur) => prev+cur, 0)
    

    return (
        <div>
            <a href={`./group/${id}`}>
                <h3>
                    {name}
                </h3>
            </a>
            <p>
                {due > 0 && `you owe ${due}`}
                {due == 0 && `no dues`}
                {due < 0 && `you're owed ${due}`}
            </p>
        </div>
    )
}