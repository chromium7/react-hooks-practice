import { useQuery } from "react-query";
import getData from "../../utils/api";

export default function UserDetails({ userId }) {
  const { data: user } = useQuery(
    ["user", userId],
    () => getData(`http://localhost:3001/users/${userId}`),
    {
      suspense: true,
    },
  );
  return user ? (
    <div className="item user">
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>
      <div className="user-avatar">
        <img src={`http://localhost:3001/img/${user.img}`} alt={user.name} />
      </div>
      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>
    </div>
  ) : null;
}
