import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { useUser } from "../Users/UserContext";
import {
  useBookingsParams,
  useCreateBooking,
  useDeleteBooking,
  useUpdateBooking,
} from "./bookingsHooks";
import { getWeek, shortISO } from "../../utils/date-wrangler";

import Booking from "./Booking";
import BookingForm from "./BookingForm";

export default function BookingDetails({ booking, bookable }) {
  const [user] = useUser();

  const isBooker = booking && user && booking.bookerId === user.id;

  return (
    <div className="booking-details">
      <h2>
        Booking details
        {isBooker && (
          <span className="controls">
            <button className="btn">
              <FaEdit />
            </button>
          </span>
        )}
      </h2>
      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}
