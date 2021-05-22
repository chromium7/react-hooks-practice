import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

export default function UsersList({ user, setUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

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
  }, [setUser]);

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
    <ul className="users items-list-nav">
      {users.map((u) => (
        <li key={u.id} className={u.id === user?.id ? "selected" : null}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
