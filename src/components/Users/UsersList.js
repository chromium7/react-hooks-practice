import { useState, useEffect, Fragment } from "react";
import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

export default function UsersList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState(null);
  const [userIndex, setuserIndex] = useState(0);
  const user = users?.[userIndex];

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading...
      </p>
    );
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={i === userIndex ? "selected" : null}>
            <button className="btn" onClick={() => setuserIndex(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <div className="bookable-availability">
              <p>{user.notes}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
