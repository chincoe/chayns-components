import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FriendsContext from './FriendsContext';
import FriendsData from './FriendsData';

const FriendsDataContainer = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const fetchFriends = useCallback(async (noCache = false) => {
        const fetchedFriends = await FriendsData.fetch(noCache);

        setFriends(fetchedFriends);

        return fetchedFriends;
    }, []);

    return (
        <FriendsContext.Provider
            value={{
                isFriend: FriendsData.isFriend,
                friends,
                fetchFriends,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};

FriendsDataContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FriendsDataContainer;
