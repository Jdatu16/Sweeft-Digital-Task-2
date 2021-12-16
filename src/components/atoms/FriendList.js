import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";

export const FriendList = ({
  setFriendsPageNumber,
  lastFriendRef,
  friendsPageLoading,
}) => {
  const { setUserSearchHistory, friendList } = useContext(StateContext);

  const navigate = useNavigate();
  const clickHandler = (id) => {
    setFriendsPageNumber(1);
    navigate(`/user/${id}`);
  };
  return (
    <div>
      <h2 className="title">Friends:</h2>
      <div className="user-list">
        {friendList.map((user) => {
          const { id, prefix, name, lastName, title, imageUrl } = user;
          if (friendList.length === id) {
            return (
              <div ref={lastFriendRef} key={id} className="user">
                <div className="user-container">
                  <img
                    className="profile-pic"
                    src={`${imageUrl}/v=${id}`}
                    alt="user"
                  />
                  <div className="description">
                    <strong>
                      {prefix} {name} {lastName}
                    </strong>
                  </div>
                  <div className="description">{title}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={id} className="user">
                <div
                  onClick={() => {
                    clickHandler(id);
                    setUserSearchHistory((prev) => {
                      return [...prev, { id: id, name, lastName, prefix }];
                    });
                  }}
                  className="user-container"
                >
                  <img
                    className="profile-pic"
                    src={`${imageUrl}/v=${id}`}
                    alt="user"
                  />
                  <div className="description">
                    <strong>
                      {prefix} {name} {lastName}
                    </strong>
                  </div>
                  <div className="description">{title}</div>
                </div>
              </div>
            );
          }
        })}
        {friendsPageLoading ? (
          <div className="loading-container">
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
