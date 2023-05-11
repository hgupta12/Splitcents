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
    const mystyle={
        backgroundColor: '#ECFEFF',
    };
    return (
        <div className="w-max py-4  shadow-md m py-4 px-4 border-2 rounded-lg m-4 " style={mystyle}>
        <div classname=" grid grid-cols-3 gap-2 justify-center p-4 " >
            
          <span className="font-medium text-2xl">  {name}</span>
            &nbsp;&nbsp;
            
           
            <button onClick = {addHandler}>✅</button>
            &nbsp;&nbsp;
           <button onClick = {rejectHandler}>❌</button>
        </div>
        </div>
        
    
    )
}