import React from "react"

//balls
export default function RequestCard ({ name, load, addFriend, rejectRequest }) {
    async function addHandler () {
        await addFriend()
        alert("friend added!")
        load()
    }

    async function rejectHandler () {
        await rejectRequest()
        alert("request rejected!")
        load()
    }
    return (
        <p>
            {name}
            &nbsp;&nbsp;
            <button onClick = {addHandler}>✅</button>
            &nbsp;&nbsp;
            <button onClick = {rejectHandler}>❌</button>
        </p>
    )
}