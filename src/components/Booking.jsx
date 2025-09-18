import React, { useState } from "react"

const Booking = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [occasion, setOccasion] = useState("")
  const [guests, setGuests] = useState("")
  const [requests, setRequests] = useState("")

  //erroe
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const validator = {
    name: (v) => (v.trim() ? "" : "Please enter your full name."),
    phone: (v) =>
      v.trim()
        ? /^\d{9,11}$/.test(v)
          ? ""
          : "Phone must be 9–11 digits (numbers only)."
        : "Please enter your phone number.",
    email: (v) =>
      v.trim()
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          ? ""
          : "Please enter a valid email."
        : "Please enter your email.",
    date: (v) => (v ? "" : "Please select a date."),
    time: (v) => (v ? "" : "Please select a time."),
    guest: (v) => {
      const n = Number(v)
      if (v === "" || Number.isNaN(n)) return "Enter number of guests."
      if (n < 1 || n > 10) return "Guests must be between 1 and 10."
      return ""
    },
  }
  // 5) Không cho đặt trong quá khứ (khi đã có cả date & time)
  const notPast = (d, t) => {
    if (!d || !t) return ""
    const [Y, M, D] = d.split("-").map(Number)
    const [h, m] = t.split(":").map(Number)
    const selected = new Date(Y, M - 1, D, h ?? 0, m ?? 0)
    return selected.getTime() < Date.now()
      ? "Selected date & time cannot be in the past."
      : ""
  }
  const validateAll = () => {
    const es = {
      name: validator.name(name),
      phone: validator.phone(phone),
      email: basic.email(email),
      date: basic.date(date),
      time: basic.time(time),
      guests: basic.guests(guests),
    }
    // gắn lỗi quá khứ vào date/time (ưu tiên gắn vào cả 2 để user thấy rõ)
    const pastMsg = notPast(date, time)
    if (!es.date) es.date = pastMsg || ""
    if (!es.time) es.time = pastMsg || ""

    // lọc field không có lỗi
    Object.keys(es).forEach((k) => !es[k] && delete es[k])
    return es
  }
  return (
    <div className="flex items-center justify-center p-12 ">
      {/* Author: FormBold Team */}
      <div className="mx-auto w-full max-w-[550px] bg-white ">
        <form>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Occasion
            </label>
            <div className="mb-5">
              <select
                id="book-occasion"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Select an Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Date Night">Date Night</option>
                <option value="Business Dinner">Business Dinner</option>
                <option value="Family Gathering">Family Gathering</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Number of Guests *
            </label>
            <div className="mb-5">
              <input
                type="number"
                placeholder="1-10 guests"
                min="1"
                max="10"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="mb-5 pt-3">
            <label
              htmlFor="book-requests"
              className="block mb-2 font-bold text-[#495E57]"
            >
              Special Requests (Optional)
            </label>
            <textarea
              id="book-requests"
              rows="3"
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-colors duration-300 box-border resize-y font-inherit min-w-0"
              placeholder="Any dietary restrictions, seating preferences, or special requests..."
            />
          </div>
          <div>
            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
