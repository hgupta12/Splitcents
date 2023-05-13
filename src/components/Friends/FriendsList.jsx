import useFriends from '../../hooks/useFriends'

const FriendsList = () => {
    const friends = useFriends();
  return (
    <div>
        <h4>List of Friends</h4>
        {friends.length ? (
            <>
            <p>Number of friends: {friends.length} </p>
            <ul>
                {friends.map(friend =>{
                    return (<li key={friend.uid}>{friend.name}</li>)
                })}
            </ul>
            </>
        ): <p>No friends to show!</p>}
    </div>
  )
}

export default FriendsList