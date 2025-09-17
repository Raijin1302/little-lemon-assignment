import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Booking from "./Booking"

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} /> */}
        <Route path="/booking" element={<Booking />} />
        {/* <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </main>
  )
}

export default Main
