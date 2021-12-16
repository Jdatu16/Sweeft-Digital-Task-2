import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { StateContext } from "../App";
import axios from "axios";
import { FriendList, UserInfo, UserInfoHistory } from "./atoms";
import { useParams } from "react-router-dom";
import { addToArr, addToArrIterate, callBackTool } from "../tools";
import { API_USER_URL, METHOD_GET, SIZE } from "../constants";

import "../css/profilePage.css";
let count = 0;

export const ProfilePage = () => {
  const { id: userId } = useParams();

  const { setFriendList, userInfo, setUserInfo } = useContext(StateContext);
  const [friendsPageNumber, setFriendsPageNumber] = useState(1);
  const [friendsPageLoading, setFriendsPageLoading] = useState(true);

  const friendsObserver = useRef();
  const lastFriendRef = useCallback(
    (check) => {
      callBackTool(
        check,
        friendsPageLoading,
        friendsObserver,
        setFriendsPageNumber
      );
    },
    [friendsPageLoading]
  );

  useEffect(() => {
    count = 0;

    axios({
      method: METHOD_GET,
      url: `${API_USER_URL}${userId}`,
    })
      .then((res) => {
        // checking if user info already exists in the arr. if it does count will increase +1
        userInfo.map((user) => {
          if (user.id !== res.data.id) return null;
          return (count = +1);
        });
        // adding user info to an arr
        if (count === 0) {
          addToArr(setUserInfo, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, [userId, setUserInfo, userInfo]);

  useEffect(() => {
    // deleting previous user's friendlist
    if (friendsPageNumber === 1) {
      setFriendList([]);
    }
    setFriendsPageLoading(true);
    axios({
      method: METHOD_GET,
      url: `${API_USER_URL}${userId}/friends/${friendsPageNumber}/${SIZE}`,
    })
      .then((res) => {
        addToArrIterate(setFriendList, res.data.list, setFriendsPageLoading);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, [friendsPageNumber, setFriendList, userId]);

  return (
    <div className="userinfo-container">
      <UserInfo userId={userId} userInfo={userInfo} />
      <UserInfoHistory setFriendsPageNumber={setFriendsPageNumber} />
      <FriendList
        setFriendsPageNumber={setFriendsPageNumber}
        lastFriendRef={lastFriendRef}
        friendsPageLoading={friendsPageLoading}
      />
    </div>
  );
};
