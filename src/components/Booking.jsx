import React, { useMemo, useState } from "react"

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
  // 3) Helper: ngày hôm nay (để chặn chọn ngày quá khứ ở input date)
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], [])
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
    guests: (v) => {
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
      email: validator.email(email),
      date: validator.date(date),
      time: validator.time(time),
      guests: validator.guests(guests),
    }
    // gắn lỗi quá khứ vào date/time (ưu tiên gắn vào cả 2 để user thấy rõ)
    const pastMsg = notPast(date, time)
    if (!es.date) es.date = pastMsg || ""
    if (!es.time) es.time = pastMsg || ""

    // lọc field không có lỗi
    Object.keys(es).forEach((k) => !es[k] && delete es[k])
    return es
  }
  //For ux when done typing check validate
  const validateOne = (nameKey) => {
    let msg = ""
    switch (nameKey) {
      case "name":
        msg = validator.name(name)
        break
      case "phone":
        msg = validator.phone(phone)
        break
      case "email":
        msg = validator.email(email)
        break
      case "date":
        msg = validator.date(date) || notPast(date, time)
        break
      case "time":
        msg = validator.time(time) || notPast(date, time)
        break
      case "guests":
        msg = validator.guests(guests)
        break
      default:
        msg = ""
    }
    setErrors((prev) => ({ ...prev, [nameKey]: msg || undefined }))
  }
  const onBlur = (e) => {
    const k = e.target.name
    setTouched((t) => ({ ...t, [k]: true }))
    validateOne(k)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    // mark all touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      date: true,
      time: true,
      guests: true,
      occasion: true,
      requests: true,
    })
    const es = validateAll()
    setErrors(es)

    if (Object.keys(es).length === 0) {
      // submit “fake”
      console.log("payload:", {
        name,
        phone,
        email,
        date,
        time,
        occasion,
        guests,
        requests,
      })
      alert("Booking submitted!")
      // reset
      setName("")
      setPhone("")
      setEmail("")
      setDate("")
      setTime("")
      setOccasion("")
      setGuests("")
      setRequests("")
      setErrors({})
      setTouched({})
    }
  }
  // 9) Class helper (đổi border khi lỗi)
  const cls = (n) =>
    `w-full rounded-md border bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md ${
      errors[n]
        ? "border-red-500 focus:border-red-500"
        : "border-[#e0e0e0] focus:border-[#6A64F1]"
    }`
  return (
    <div className="flex items-center justify-center p-12 ">
      {/* Author: FormBold Team */}
      <div className="mx-auto w-full max-w-[550px] bg-white ">
        <form onSubmit={onSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={onBlur}
              placeholder="Full Name"
              className={cls("name")}
            />
            {touched.name && errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={onBlur}
              placeholder="Enter your phone number"
              className={cls("phone")}
            />
            {touched.phone && errors.phone && (
              <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
            )}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={onBlur}
              placeholder="Enter your email"
              className={cls("email")}
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
                  value={date}
                  min={todayStr}
                  onChange={(e) => setDate(e.target.value)}
                  onBlur={onBlur}
                  className={cls("date")}
                />
                {touched.date && errors.date && (
                  <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                )}
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
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  onBlur={onBlur}
                  className={cls("time")}
                />
                {touched.time && errors.time && (
                  <p className="mt-2 text-sm text-red-600">{errors.time}</p>
                )}
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
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                onBlur={onBlur}
                className={cls("occasion")}
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
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onBlur={onBlur}
                className={cls("guests")}
              />
              {touched.guests && errors.guests && (
                <p className="mt-2 text-sm text-red-600">{errors.guests}</p>
              )}
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
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              onBlur={onBlur}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-colors duration-300 box-border resize-y font-inherit min-w-0"
              placeholder="Any dietary restrictions, seating preferences, or special requests..."
            />
          </div>
          <div>
            <button className="hover:shadow-form w-full rounded-md bg-yellow-400 text-black hover:bg-yellow-500 py-3 px-8 text-center text-base font-semibold outline-none">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
