import { Link } from "react-router-dom"
import small_logo from "../images/small_logo.png"
import { Icons } from "./ui/Icons"

const links = ["About", "Services", "Blog"]
const socials = [Icons.google, Icons.twitter, Icons.github, Icons.dribbble]
// 👆 ví dụ, bạn định nghĩa sẵn trong Icons.jsx

const Footer = () => {
  const year = new Date().getFullYear()
  const linkClass =
    "inline-flex gap-x-2 text-sm text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
  const listItemClass =
    "inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-black dark:before:text-white"
  const socialClass =
    "size-8 inline-flex justify-center items-center rounded-full text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-400"

  return (
    <footer className="mt-auto border-t p-4 md:border-t-0 border-gray-200 dark:border-neutral-700">
      <div className="w-full max-w-7xl py-10 md:pt-0 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
          {/* Logo + year */}
          <div className="text-center md:text-start">
            <img
              src={small_logo}
              alt="Little Lemon Logo"
              className="h-11 w-auto"
            />
            <p className="m-0 text-sm opacity-90">
              © {year} Little Lemon Restaurant
            </p>
          </div>

          {/* Links */}
          <ul className="text-center">
            {links.map((label) => (
              <li key={label} className={listItemClass}>
                <a href="#" className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="text-center md:text-end space-x-2">
            {socials.map((Icon, idx) => (
              <a key={idx} href="#" className={socialClass}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
