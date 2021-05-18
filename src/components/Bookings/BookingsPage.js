import WeekPicker from "./WeekPicker";

export default function BookingsPage() {
  return (
    <main>
      <p>Bookings!</p>
      <WeekPicker date={new Date()} />
    </main>
  );
}
