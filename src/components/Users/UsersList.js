import { useQuery } from "react-query";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

export default function UsersList({ user, setUser }) {
  const {
    data: users = [],
    // status,
    // error,
  } = useQuery("users", () => getData("http://localhost:3001/users"), {
    suspense: true,
  });

  // if (status === "error") {
  //   return <p>{error.message}</p>;
  // }

  // if (status === "loading") {
  //   return (
  //     <p>
  //       <Spinner /> Loading...
  //     </p>
  //   );
  // }

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
