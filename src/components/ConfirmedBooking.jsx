import React from "react"
import { Link } from "react-router-dom"

const ConfirmedBooking = () => {
  return (
    <div className="min-h-screen bg-orange-100 py-10 px-5 flex items-center justify-center">
      <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden text-center">
        {/* Success Header */}
        <div className="bg-[#4CAF50] p-10 text-white">
          <div className="text-6xl mb-5">✅</div>
          <h1 className="text-4xl mb-2 text-white">Booking Confirmed!</h1>
          <p className="text-lg text-[#E8F5E8] m-0">
            Your table reservation has been successfully confirmed
          </p>
        </div>

        {/* Body */}
        <div className="p-10">
          {/* Reservation Details */}
          <div className="bg-[#F8F9FA] p-8 rounded-xl mb-8 text-left">
            <h2 className="text-2xl text-[#495E57] mb-5 text-center">
              Reservation Details
            </h2>

            <div className="mb-4">
              <strong className="text-[#495E57]">Restaurant:</strong>
              <span className="ml-2 text-gray-600">Little Lemon - Chicago</span>
            </div>

            <div className="mb-4">
              <strong className="text-[#495E57]">Confirmation ID:</strong>
              <span className="ml-2 text-gray-600 font-mono">
                {`LL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
              </span>
            </div>

            <div className="mb-0">
              <strong className="text-[#495E57]">Status:</strong>
              <span className="ml-2 text-[#4CAF50] font-bold">Confirmed ✓</span>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-[#FFF9E6] p-6 rounded-xl mb-8 border-2 border-[#F4CE14]">
            <h3 className="text-xl text-[#495E57] mb-4">What's Next?</h3>
            <ul className="list-disc pl-5 text-left text-gray-600 leading-relaxed">
              <li className="mb-2">
                📧 You'll receive a confirmation email shortly
              </li>
              <li className="mb-2">
                📱 We'll send you a reminder 24 hours before your reservation
              </li>
              <li className="mb-2">🕐 Please arrive 10-15 minutes early</li>
              <li className="mb-0">
                📞 Call us at (312) 555-0123 if you need to make changes
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-[#2F5D62] text-white p-6 rounded-xl mb-8">
            <h3 className="text-xl text-[#F4CE14] mb-4">
              Little Lemon Restaurant
            </h3>
            <div className="text-base leading-relaxed">
              <div className="mb-2">
                📍 123 Mediterranean Ave, Chicago, IL 60601
              </div>
              <div className="mb-2">📞 (312) 555-0123</div>
              <div className="mb-2">✉️ reservations@littlelemon.com</div>
              <div>🕒 Open Daily: 11:00 AM - 10:00 PM</div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/" className="no-underline">
              <button className="w-full py-3 px-5 bg-[#F4CE14] text-[#495E57] rounded-lg font-bold cursor-pointer transition-all shadow-md hover:shadow-lg">
                Back to Home
              </button>
            </Link>

            <Link to="/menu" className="no-underline">
              <button className="w-full py-3 px-5 bg-[#2F5D62] text-white rounded-lg font-bold cursor-pointer transition-all shadow-md hover:shadow-lg">
                View Menu
              </button>
            </Link>
          </div>

          {/* Thank You */}
          <div className="mt-8 p-5 bg-[#F8F9FA] rounded-lg">
            <p className="text-[1.1rem] text-[#2F5D62] m-0 italic">
              Thank you for choosing Little Lemon! We look forward to serving
              you an unforgettable Mediterranean dining experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmedBooking
