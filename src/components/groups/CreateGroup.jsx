import { addDoc, collection, doc, writeBatch } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { db } from '../../firebase'
import useFriends from '../../hooks/useFriends'
import Checkbox from '../Checkbox'

const CreateGroup = () => {
  const [name, setName] = useState("")
  const friends = useFriends()
  const {currentUser} = useUser()
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate()
  const handleChange = (event) => {
    setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupRef = await addDoc(collection(db,"groups"),{
        name
      })
      const friendsMap = new Map();
      friends.forEach(friend => friendsMap.set(friend.uid, {name: friend}))
      const batch = writeBatch(db)
      Object.entries(checkedItems).forEach((item )=> {
        const uid = item[0]
        if(item[1]){
          batch.set(doc(db, groupRef.path, "members",uid),friendsMap.get(uid))
        }
      })
      batch.set(doc(db,groupRef.path, "members",currentUser.uid),currentUser)
      await batch.commit(); 
      alert("Group Created!")
      navigate('/')
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  useEffect(()=>{
    console.log(checkedItems)
  },[checkedItems])
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Group Name</label><br />
          <input type="text" name="name" className='border-solid border-2' onChange={(e)=> setName(e.currentTarget.value)}/>
        </div>
        <div>
            {
            friends.map(item => (
              <div key={item.uid}>
                <label>
                    {item.name}
                    <Checkbox name={item.uid} checked={checkedItems[item.uid]} onChange={handleChange} />
                </label>
              </div>
            ))
            }
        </div>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Group</button>
    </form>
    </>
  )
}

export default CreateGroup