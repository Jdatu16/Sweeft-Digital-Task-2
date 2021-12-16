import { useContext } from "react";
import { StateContext } from "../App";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const { lastUserRef, userList, loading, setUserSearchHistory } =
    useContext(StateContext);
  const clickHandler = (id) => {
    navigate(`/user/${id}`);
  };
  return (
    <div className="user-list">
      {userList.map((user) => {
        const { id, prefix, name, lastName, title, imageUrl } = user;
        if (userList.length === id) {
          return (
            <div ref={lastUserRef} key={id} className="user">
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
      {loading ? (
        <div className="loading-container">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
