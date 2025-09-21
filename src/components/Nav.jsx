import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import littlelemon_logo from "../images/littlelemon_logo.png"
import { Icons } from "./ui/Icons"
import Container from "./ui/Container"

const links = [
  { label: "Home", to: "/", end: true },
  { label: "Booking", to: "/booking" },
  { label: "Product", to: "/product" },
  { label: "Checkout", to: "/checkout" },
]

const activeLink =
  "relative inline-block text-base px-4 py-2 rounded bg-[#F4CE14] transition-all duration-300 font-semibold"
const idleLink =
  "inline-block text-black text-base px-4 py-2 rounded transition-all duration-300 relative hover:bg-[#EDEFEE] hover:-translate-y-0.5"

const btnBase =
  "inline-flex justify-center items-center rounded-xl border transition disabled:opacity-50 disabled:pointer-events-none"
const btnSize = "w-10 h-10"
const btnTone =
  "bg-white border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white">
      <Container>
        {/* Bar chính: 3 vùng cố định theo grid */}
        <div className="grid grid-cols-12 items-center gap-4 py-5">
          {/* Left: Logo */}
          <div className="col-span-6 lg:col-span-3 flex items-center">
            <img
              src={littlelemon_logo}
              alt="Little Lemon Logo"
              className="w-36 h-auto cursor-pointer"
            />
          </div>

          {/* Center: Links (desktop) */}
          <nav className="hidden lg:flex col-span-6 items-center justify-center">
            <ul className="flex items-center gap-x-7">
              {links.map(({ label, to, end }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      isActive ? activeLink : idleLink
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Actions */}
          <div className="col-span-6 lg:col-span-3 flex items-center justify-end gap-x-2">
            <button
              className={`${btnBase} ${btnSize} ${btnTone}`}
              aria-label="Search"
            >
              <Icons.search className="w-4 h-4" />
            </button>
            <button
              className={`${btnBase} ${btnSize} ${btnTone}`}
              aria-label="Cart"
            >
              <Icons.cart className="w-4 h-4" />
            </button>
            <button className="py-2 px-3 text-sm font-medium rounded-xl bg-yellow-400 text-black hover:bg-yellow-500">
              Sign in
            </button>

            {/* Toggle mobile menu */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className={`${btnBase} ${btnSize} ${btnTone} lg:hidden`}
            >
              {open ? (
                <Icons.close className="w-4 h-4" />
              ) : (
                <Icons.menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu: render theo flow, không absolute để giữ alignment */}
      {open && (
        <div className="lg:hidden border-t">
          <Container>
            <ul className="py-3 flex flex-col gap-y-2">
              {links.map(({ label, to, end }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      (isActive ? activeLink : idleLink) + " block w-full"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  )
}
