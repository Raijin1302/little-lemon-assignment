# Little Lemon Assignment 🍋

A small React application built with **Vite** and **React Router**, featuring a **Booking** form with client-side validation and a full **Jest + React Testing Library** test suite. This project is prepared for submission to Coursera.

## 🔧 Tech Stack

- ⚛️ React 18
- ⚡ Vite 7 (dev server & build)
- 🧭 React Router 6
- 🎨 Tailwind CSS (via PostCSS & Autoprefixer)
- 🧪 Jest (jsdom) + React Testing Library + user-event
- 🧹 ESLint (React hooks + refresh plugins)

---

## 🚀 Getting Started

### 1) Prerequisites

- Node.js (recommend **v18+**)
- npm (comes with Node)

### 2) Install dependencies

```bash
npm install
```

### 3) Start the dev server

```bash
npm run dev
```

Vite will print your local URL in the terminal (open it in the browser).

### 4) Build for production

```bash
npm run build
```

### 5) Preview the production build

```bash
npm run preview
```

---

## 📁 Project Structure

```text
little-lemon-assignment/
├─ public/
├─ src/
│  ├─ __tests__/
│  │  ├─ App.test.jsx
│  │  └─ Booking.test.jsx
│  ├─ assets/
│  ├─ images/
│  ├─ components/                # page/feature components
│  │  ├─ Booking.jsx
│  │  ├─ ConfirmedBooking.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Home.jsx
│  │  ├─ Main.jsx
│  │  └─ Nav.jsx
│  ├─ ui/                        # small UI primitives
│  │  ├─ Container.jsx
│  │  └─ Icon.jsx
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ react.svg
│  ├─ reportWebVitals.js
│  └─ setupTests.js              # RTL/Jest setup (jest-dom, spies, etc.)
├─ test/
│  └─ __mocks__/
│     └─ fileMock.js             # file mocks for Jest
├─ index.html
├─ jest.config.js                # single Jest config (keep this; avoid duplicate configs)
├─ babel.config.js
├─ eslint.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ package.json
├─ package-lock.json
└─ README.md
```

> ℹ️ Tip: Keep **one** Jest configuration source. If you see “Multiple configurations found”, remove either `jest.config.js` or the `"jest"` block in `package.json` and keep the other.

---

## 🧪 Testing

This project uses **Jest** with **jsdom** and **React Testing Library**.

### Run all tests

```bash
npm test
```

### Run a single test file

```bash
npx jest src/__tests__/Booking.test.jsx
# or
npx jest src/__tests__/App.test.jsx
```

### Watch mode (rerun on change)

```bash
npx jest --watch
```

### What’s covered

- **Booking.jsx**
  - Renders all fields (Full Name, Phone, Email, Date, Time, Occasion, Guests, Special Requests)
  - Submits with valid data → calls `submitForm` once with payload
  - Invalid inputs prevent submit + show errors:
    - past date & time
    - email format
    - guests < 1 or > 10
    - required fields missing
- **App.jsx**
  - Header & navigation render
  - Route to Booking page renders the form (if applicable)

### Debug tips

- Use `screen.debug()` to print the current DOM.
- Use `await waitFor(...)` after interactions that trigger state updates.

### Silence specific noisy warnings (optional)

If your console shows “**not wrapped in act(…)**” warnings you’ve intentionally tested for, you can silence that specific message in **`setupTests.js`**:

```js
// setupTests.js
import "@testing-library/jest-dom"

let errorSpy
let alertSpy

beforeAll(() => {
  const originalError = console.error
  errorSpy = jest.spyOn(console, "error").mockImplementation((...args) => {
    if (typeof args[0] === "string" && args[0].includes("not wrapped in act"))
      return
    originalError(...args)
  })
  alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {})
})

afterAll(() => {
  errorSpy?.mockRestore()
  alertSpy?.mockRestore()
})
```

> This only filters that one warning; other errors still show up.

---

## 🧹 Linting

```bash
npm run lint
```

---

## 🎨 Tailwind CSS

Tailwind is already wired via `tailwind.config.js` and `postcss.config.js`.
Use utility classes directly in your components:

```jsx
<button className="w-full rounded-lg bg-yellow-400 text-black py-3 px-8 font-semibold">
  Book Appointment
</button>
```

---

## 🧭 Routing

The app uses **React Router**. If your Booking page is available at a route (e.g. `/booking`), you can test it with:

```jsx
import { MemoryRouter } from "react-router-dom"

render(
  <MemoryRouter initialEntries={["/booking"]}>
    <App />
  </MemoryRouter>
)
```

---

## 🧰 npm Scripts

| Script    | Purpose               |
| --------- | --------------------- |
| `dev`     | Start Vite dev server |
| `build`   | Build for production  |
| `preview` | Preview built app     |
| `lint`    | Run ESLint            |
| `test`    | Run Jest test suite   |

---

## ✅ Submission Notes

- Ensure all tests pass locally (`npm test`) before submitting.
- Include this `README.md` so reviewers know how to install and run the project.

---

## 📄 License

For educational use only (Coursera assignment).

---

Happy coding! 🍋✨
