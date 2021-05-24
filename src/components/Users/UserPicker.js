import { useEffect } from "react";
import Spinner from "../UI/Spinner";

import useFetch from "../../utils/useFetch";
import { useUser } from "./UserContext";

export default function UserPicker() {
  const [user, setUser] = useUser();

  const { data: users = [], status, error } = useFetch("http://localhost:3001/users");

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID);

    setUser(selectedUser);
  }

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <span>Error!</span>;
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
