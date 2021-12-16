import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { ProfilePage, User } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  METHOD_GET,
  API_USER_URL,
  HOME_PATH,
  PROFILE_PAGE_PATH,
  SIZE,
} from "./constants";
import { addToArrIterate, callBackTool } from "./tools";

export const StateContext = React.createContext();

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSearchHistory, setUserSearchHistory] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: METHOD_GET,
      url: `${API_USER_URL}${pageNumber}/${SIZE}`,
    })
      .then((res) => {
        addToArrIterate(setUserList, res.data.list, setLoading);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, [pageNumber]);

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      callBackTool(node, loading, observer, setPageNumber);
    },
    [loading]
  );

  return (
    <StateContext.Provider
      value={{
        userInfo,
        setUserInfo,
        friendList,
        setFriendList,
        setLoading,
        pageNumber,
        userList,
        lastUserRef,
        loading,
        userSearchHistory,
        setUserSearchHistory,
      }}
    >
      <div className="main-container">
        <div className="flex-center">
          <Routes>
            <Route exact path={HOME_PATH} element={<User />} />
            <Route path={PROFILE_PAGE_PATH} element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </StateContext.Provider>
  );
}

export default App;
