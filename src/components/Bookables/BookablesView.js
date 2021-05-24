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

import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import PageSpinner from "../UI/PageSpinner";

import useFetch from "../../utils/useFetch";

export default function BookablesView() {
  const { data: bookables = [], status, error } = useFetch("http://localhost:3001/bookables");

  const { id } = useParams();
  const bookable = bookables.find((b) => b.id === parseInt(id, 10)) || bookables[0];

  if (status === "error") {
    return <p>{error.message}</p>;
  }
  if (status === "loading") {
    return <PageSpinner />;
  }
  return (
    <main className="bookables-page">
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(id) => `/bookables/${id}`}
        />
        <p className="controls">
          <Link to="/bookables/new" replace={true} className="btn">
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </main>
  );
}
