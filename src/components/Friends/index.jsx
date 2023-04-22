import React from 'react'
import FriendsList from './FriendsList'
import Search from './Search'

const Friends = () => {
  return (
    <>
    <div className="text-2xl font-bold underline">Friends</div>
    {/* Type email id to add a friend */}
    <Search/>
    {/* List of current friends*/}
    <FriendsList/>

    </>
  )
}

export default Friends