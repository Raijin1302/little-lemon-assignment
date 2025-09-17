import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import littlelemon_logo from "../images/littlelemon_logo.png"
import { Icons } from "./ui/Icons"
const links = [
  { label: "Home", to: "/", end: true },
  { label: "Listings", to: "/listings" },
  { label: "Product", to: "/product" },
  { label: "Checkout", to: "/checkout" },
]

const activeLink =
  "relative inline-block text-base px-4 py-2 rounded bg-[#F4CE14] transition-all duration-300 font-semibold"
const idleLink =
  "inline-block text-black text-base px-4 py-2 rounded transition-all duration-300 relative hover:bg-[#EDEFEE] hover:-translate-y-0.5"

const btnBase =
  "size-9.5 inline-flex justify-center items-center rounded-xl border transition disabled:opacity-50 disabled:pointer-events-none"
const btnTone =
  "bg-white border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"

const Nav = () => {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="
          flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-7
        "
    >
      <nav className="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
        <img
          src={littlelemon_logo}
          alt="Little Lemon Logo"
          className="w-36 flex items-center lg:col-span-3 gap-2 h-auto cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {/* Right controls */}
        <div className="ms-auto flex items-center gap-x-1 lg:gap-x-2 lg:order-3 lg:col-span-3">
          <Icons.button label="Search">
            <Icons.search />
          </Icons.button>
          <Icons.button label="Cart">
            <Icons.cart />
          </Icons.button>
          <button className="py-2 px-3 text-sm font-medium rounded-xl bg-yellow-400 text-black hover:bg-yellow-500">
            Sign in
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className={`${btnBase} ${btnTone} lg:hidden`}
          >
            {open ? <Icons.close /> : <Icons.menu />}
          </button>
        </div>

        {/* Links */}
        <div
          className={`basis-full grow lg:block lg:basis-auto lg:order-2 lg:col-span-6 ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="mt-4 lg:mt-0 flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-center lg:gap-x-7">
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
        </div>
      </nav>
    </header>
  )
}

function Logo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 116 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* paths/circle logo giữ nguyên của bạn */}
    </svg>
  )
}

export default Nav
