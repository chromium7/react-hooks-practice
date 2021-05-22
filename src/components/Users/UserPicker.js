import { useState, useContext, useEffect } from "react";
import Spinner from "../UI/Spinner";

import UserContext from "./UserContext";

export default function UserPicker() {
  const [users, setUsers] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setUser(data[0]);
      });
  }, [setUser]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID);

    setUser(selectedUser);
  }

  if (users === null) {
    return <Spinner />;
  }

  return (
    <select className="user-picker" onChange={handleSelect} value={user?.id}>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
