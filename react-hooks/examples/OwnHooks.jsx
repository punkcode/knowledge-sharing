import { useState, useEffect } from 'react';

// Please name with`use` prefix.
const useFriendStatus = friendID => {
    const [isOnline, setIsOnline] = useState(null);
  
    useEffect(() => {
        const handleStatusChange = status => {
            setIsOnline(status.isOnline);
        };

        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    });
  
    return isOnline;
};

// These do NOT share state, the reuse stateful logic.
const FriendStatus = props => {
    const isOnline = useFriendStatus(props.friend.id);
    
    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
};

const FriendListItem = props => {
    const isOnline = useFriendStatus(props.friend.id);
    
    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
};