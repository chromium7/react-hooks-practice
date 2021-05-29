import { Suspense } from "react";
// import { unstable_SuspenseList } from "react";
import { useQuery } from "react-query";
import getData from "../../utils/api";
import Avatar from "./Avatar";

import UserBookings from "./UserBookings";
import UserTodos from "./UserTodos";

export default function UserDetails({ userId /*, isPending */ }) {
  const { data: user } = useQuery(
    ["user", userId],
    () => getData(`http://localhost:3001/users/${userId}`),
    {
      suspense: true,
    },
  );
  return user ? (
    <div className="item user">
      {/* className={isPending ? "item user user-pending" : "item user"} */}
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>
      <Avatar
        src={`http://localhost:3001/img/${user.img}`}
        fallbackSrc={"http://localhost:3001/img/avatar.gif"}
        alt={user.name}
      />
      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>

      {/* <SuspenseList revealOrder="forwards"> */}
      <Suspense fallback={<p>Loading user bookings</p>}>
        <UserBookings id={userId} />
      </Suspense>
      {/* <Suspense fallback={<p>Loading user todos</p>}>
        <UserTodos id={userId} />
      </Suspense> */}
      {/* </SuspenseList> */}
    </div>
  ) : null;
}
