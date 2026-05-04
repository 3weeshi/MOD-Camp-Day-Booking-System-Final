import { bookings } from "../data/bookings.js";
import { tents } from "../data/tents.js";

export const getBookings = (req, res) => {
  const userEmail = req.query.userEmail;
  if (userEmail) return res.json(bookings.filter((booking) => booking.userEmail === userEmail));
  res.json(bookings);
};

export const createBooking = (req, res) => {
  const { name, phone, tentId, date, people, notes, userEmail } = req.body;

  if (!name || !phone || !tentId || !date || !people || !userEmail) {
    return res.status(400).json({ message: "Missing booking information" });
  }

  const tent = tents.find((item) => String(item.id) === String(tentId));
  if (!tent) return res.status(404).json({ message: "Tent not found" });

  const alreadyBooked = bookings.some(
    (booking) =>
      String(booking.tentId) === String(tent.id) &&
      booking.date === date &&
      booking.status !== "Cancelled"
  );

  if (alreadyBooked) {
    return res.status(409).json({ message: "This tent is not available, please choose another one" });
  }

  const booking = {
    id: Date.now(),
    userEmail,
    name,
    phone,
    tentId: tent.id,
    tentName: tent.name,
    tentNumber: tent.code,
    tentType: tent.type,
    price: tent.price,
    date,
    people: Number(people),
    notes: notes || "",
    status: "Pending"
  };

  bookings.unshift(booking);
  res.status(201).json(booking);
};

export const updateBookingStatus = (req, res) => {
  const { status } = req.body;
  if (!["Pending", "Confirmed", "Cancelled"].includes(status)) return res.status(400).json({ message: "Invalid booking status" });
  const booking = bookings.find((item) => item.id === Number(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  booking.status = status;
  res.json(booking);
};

export const updateBooking = (req, res) => {
  const booking = bookings.find((item) => item.id === Number(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  const { date, people, notes, tentId } = req.body;

  if (tentId !== undefined || date !== undefined) {
    const nextTentId = tentId !== undefined ? tentId : booking.tentId;
    const nextDate = date !== undefined ? date : booking.date;
    const conflict = bookings.some(
      (item) =>
        item.id !== booking.id &&
        String(item.tentId) === String(nextTentId) &&
        item.date === nextDate &&
        item.status !== "Cancelled"
    );
    if (conflict) return res.status(409).json({ message: "This tent is not available, please choose another one" });
  }

  if (tentId !== undefined) {
    const tent = tents.find((item) => String(item.id) === String(tentId));
    if (!tent) return res.status(404).json({ message: "Tent not found" });
    booking.tentId = tent.id;
    booking.tentName = tent.name;
    booking.tentNumber = tent.code;
    booking.tentType = tent.type;
    booking.price = tent.price;
  }
  if (date !== undefined) booking.date = date;
  if (people !== undefined) booking.people = Number(people);
  if (notes !== undefined) booking.notes = notes;
  res.json(booking);
};
