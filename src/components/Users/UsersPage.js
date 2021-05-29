import { useState, Suspense } from "react";
// import { unstable_useTransition as useTransition, unstable_useDeferredValue as useDefferedValue } from "react";
import { useQueryClient } from "react-query";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import { useUser } from "./UserContext";
import PageSpinner from "../UI/PageSpinner";
import getData from "../../utils/api";

export default function UsersPage() {
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;
  const queryClient = useQueryClient();

  // const [startTransition, isPending] = useTransition();

  // const deferredUser = useDeferredValue(user) || user;
  // const isPending = deferredUser !== user;

  function switchUser(nextUser) {
    // startTransition( () => setSelectedUser(nextUser) );
    setSelectedUser(nextUser);

    queryClient.prefetchQuery(["user", nextUser.id], () =>
      getData(`http://localhost:3001/users/${nextUser.id}`),
    );

    queryClient.prefetchQuery(
      `http://localhost:3001/img/${nextUser.img}`,
      () =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = `http://localhost:3001/img/${nextUser.img}`;
        }),
    );
  }

  return user ? (
    <main className="users-page">
      <UsersList user={user} setUser={switchUser} />
      {/* <UsersList user={user} setUser={switchUser} isPending={isPending}/> */}

      <Suspense fallback={<PageSpinner />}>
        <UserDetails userId={user.id} />
        {/* <UserDetails userId={user.id} isPending={isPending}/> */}
        {/* <UserDetails userId={deferredUser.id} isPending={isPending}/> */}
      </Suspense>
    </main>
  ) : null;
}
