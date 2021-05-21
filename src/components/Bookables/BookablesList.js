// import { useEffect, useRef } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import Spinner from "../UI/Spinner";
// import getData from "../../utils/api";

// export default function BookablesList({ state, dispatch }) {
//   const { group, bookableIndex, bookables } = state;
//   const { isLoading, error } = state;

//   const bookablesInGroup = bookables.filter((b) => b.group === group);
//   const groups = [...new Set(bookables.map((b) => b.group))];

//   const nextButtonRef = useRef();

//   useEffect(() => {
//     dispatch({ type: "FETCH_BOOKABLES_REQUEST" });

//     getData("http://localhost:3001/bookables")
//       .then((bookables) =>
//         dispatch({
//           type: "FETCH_BOOKABLES_SUCCESS",
//           payload: bookables,
//         }),
//       )
//       .catch((error) =>
//         dispatch({
//           type: "FETCH_BOOKABLES_ERROR",
//           payload: error,
//         }),
//       );
//   }, [dispatch]);

//   // useEffect(() => {
//   //   timerRef.current = setInterval(() => {
//   //     dispatch({ type: "NEXT_BOOKABLE" });
//   //   }, 3000);

//   //   return stopPresentation;
//   // }, []);

//   // function stopPresentation() {
//   //   clearInterval(timerRef.current);
//   // }

//   function changeGroup(e) {
//     dispatch({
//       type: "SET_GROUP",
//       payload: e.target.value,
//     });
//   }

//   function changeBookable(selectedIndex) {
//     dispatch({
//       type: "SET_BOOKABLE",
//       payload: selectedIndex,
//     });
//     nextButtonRef.current.focus();
//   }

//   function nextBookable() {
//     dispatch({
//       type: "NEXT_BOOKABLE",
//     });
//   }

//   function toggleDetails() {
//     dispatch({
//       type: "TOGGLE_HAS_DETAILS",
//     });
//   }

//   if (error) {
//     return <p>{error.message}</p>;
//   }

//   if (isLoading) {
//     return (
//       <p>
//         <Spinner /> Loading bookables. . .
//       </p>
//     );
//   }

//   return (
//     <div>
//       <select value={group} onChange={changeGroup}>
//         {groups.map((g) => (
//           <option value={g} key={g}>
//             {g}
//           </option>
//         ))}
//       </select>
//       <ul className="bookables items-list-nav">
//         {bookablesInGroup.map((b, i) => (
//           <li key={b.id} className={i === bookableIndex ? "selected" : null}>
//             <button className="btn" onClick={() => changeBookable(i)}>
//               {b.title}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <p>
//         <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
//           <FaArrowRight />
//           <span>Next</span>
//         </button>
//       </p>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

export default function BookablesList({ bookable, setBookable }) {
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const nextButtonRef = useRef();

  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  function changeGroup(event) {
    const bookablesInSelectedGroup = bookables.filter((b) => b.group === event.target.value);
    setBookable(bookablesInSelectedGroup[0]);
  }

  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
    nextButtonRef.current.focus();
  }

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading bookables.. .
      </p>
    );
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b) => (
          <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
            <button className="btn" onClick={() => changeBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
