import { animated } from "react-spring";

import { useSlide } from "./bookingsHooks";

import BookingsGrid from "./BookingsGrid";

export default function BookingsGridSlide(props) {
  const { week, bookable, booking, setBooking } = props;

  const transitions = useSlide(bookable, week);

  return (
    <div className="grid-wrapper">
      {transitions((style, item) => (
        <animated.div className="grid" style={style}>
          <BookingsGrid
            week={item.week}
            bookable={item.bookable}
            booking={booking}
            setBooking={setBooking}
          />
        </animated.div>
      ))}
    </div>
  );
}
