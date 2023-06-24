import React from "react"

export default function FriendCard ({ name }) {
    const mystyle={
        backgroundColor: '#ECFEFF',
    };
    return (
        <p className="w-max m-4   py-4 shadow-md border-2 rounded-lg  p-4 font-medium text-2xl" style={mystyle}>{name}</p>
    )
}