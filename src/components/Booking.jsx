// src/components/Booking.jsx
import React from "react"
import BookingForm from "./BookingForm"

const Booking = ({ submitForm }) => {
  return <BookingForm submitForm={submitForm} />
}

export default Booking
