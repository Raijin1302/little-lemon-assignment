import React, { useMemo, useState } from "react"

const Booking = ({ submitForm }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [occasion, setOccasion] = useState("")
  const [guests, setGuests] = useState("")
  const [requests, setRequests] = useState("")

  // error
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
    Object.keys(es).forEach((k) => !es[k] && delete es[k])
    return es
  }

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

  const onSubmit = async (e) => {
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
    const estimate = validateAll()
    setErrors(estimate)
    if (Object.keys(estimate).length === 0) {
      try {
        // gọi submitForm từ Main (truyền qua props)
        await submitForm({
          name,
          phone,
          email,
          date,
          time,
          occasion,
          guests,
          requests,
        })
        // Nếu thành công thì reset form
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
      } catch (error) {
        console.error("Submit failed:", err)
        alert("Something went wrong. Please try again!")
      }
    }
  }

  const cls = (n) =>
    `w-full rounded-lg border bg-white py-3 px-4 text-base font-medium outline-none
     transition-all duration-200 placeholder:text-gray-400
     ${
       errors[n]
         ? "border-red-500 ring-2 ring-red-200 focus:border-red-500 focus:ring-red-200"
         : "border-gray-200 focus:border-[#6A64F1] focus:ring-2 focus:ring-[#6A64F1]/30"
     }
     shadow-sm focus:shadow-md`

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center p-6 sm:p-12 bg-[#FCEFD9]">
      <div
        className="mx-auto w-full max-w-[600px] bg-white/95 backdrop-blur
                   border border-gray-200 rounded-2xl shadow-xl ring-1 ring-black/5 p-6 sm:p-8"
      >
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#07074D]"
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

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-[#07074D]"
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

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#07074D]"
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
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="-mx-2 flex flex-wrap">
            <div className="w-full px-2 sm:w-1/2">
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold text-[#07074D]"
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
            <div className="w-full px-2 sm:w-1/2">
              <label
                htmlFor="time"
                className="mb-2 block text-sm font-semibold text-[#07074D]"
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

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#07074D]">
              Occasion
            </label>
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

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#07074D]">
              Number of Guests *
            </label>
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

          <div className="pt-1">
            <label
              htmlFor="book-requests"
              className="mb-2 block text-sm font-semibold text-[#07074D]"
            >
              Special Requests (Optional)
            </label>
            <textarea
              id="book-requests"
              rows="3"
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              onBlur={onBlur}
              className={`min-h-[96px] ${cls("requests")}`}
              placeholder="Any dietary restrictions, seating preferences, or special requests..."
            />
          </div>

          <div className="pt-2">
            <button
              className="w-full rounded-lg bg-yellow-400 text-black py-3 px-8 text-center text-base font-semibold
                         shadow-md hover:shadow-lg hover:bg-yellow-500
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300
                         transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
