import { render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "../App"

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

test("App renders header & navigation", () => {
  render(<App />, { wrapper: MemoryRouter })

  // 1) Header (banner) tồn tại
  const header = screen.getByRole("banner")
  expect(header).toBeInTheDocument()

  // 2) Logo duy nhất trong header
  expect(
    within(header).getByRole("img", { name: /little lemon logo/i })
  ).toBeInTheDocument()

  // 3) Link Home hiển thị (đúng accessible name)
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument()

  // 4) Một heading cụ thể (ví dụ có trên trang Home)
  expect(
    screen.getByRole("heading", { name: /why choose little lemon\?/i })
  ).toBeInTheDocument()
})
