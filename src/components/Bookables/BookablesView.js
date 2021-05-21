// import { useReducer, Fragment } from "react";

// import BookablesList from "./BookablesList";
// import BookablesDetails from "./BookableDetails";

// import reducer from "./reducer";

// const initialState = {
//   group: "Rooms",
//   bookableIndex: 0,
//   bookables: [],
//   isLoading: true,
//   error: false,
// };

// export default function BookablesView() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const bookablesInGroup = state.bookables.filter((b) => b.group === state.group);

//   const bookable = bookablesInGroup[state.bookableIndex];

//   return (
//     <Fragment>
//       <BookablesList state={state} dispatch={dispatch} />
//       <BookablesDetails bookable={bookable} />
//     </Fragment>
//   );
// }

import { useState, useCallback, Fragment } from "react";

import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

export default function BookablesView() {
  const [bookable, setBookable] = useState();

  const updateBookable = useCallback((selected) => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, []);
  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
