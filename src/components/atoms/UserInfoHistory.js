import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";

export const UserInfoHistory = ({ setFriendsPageNumber }) => {
  const { userSearchHistory } = useContext(StateContext);
  let lastItem = userSearchHistory.length;
  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="userInfo-history">
      {userSearchHistory.map((val, index) => {
        const { id, name, lastName, prefix } = val;
        if (index === lastItem - 1) {
          return (
            <div
              className="search-history-names"
              onClick={() => {
                setFriendsPageNumber(1);
                clickHandler(id);
              }}
              key={index}
            >
              {prefix} {name} {lastName}
            </div>
          );
        } else {
          return (
            <div
              className="search-history-names"
              onClick={() => {
                setFriendsPageNumber(1);
                clickHandler(id);
              }}
              key={index}
            >
              {prefix} {name} {lastName} {">"}
            </div>
          );
        }
      })}
    </div>
  );
};
