import "@testing-library/jest-dom"

let errorSpy
let alertSpy

beforeAll(() => {
  const originalError = console.error // giữ reference gốc để pass-through

  errorSpy = jest.spyOn(console, "error").mockImplementation((...args) => {
    if (typeof args[0] === "string" && args[0].includes("not wrapped in act")) {
      return // nuốt riêng cảnh báo act
    }
    originalError(...args) // các lỗi khác vẫn in ra
  })

  // Đừng gán window.alert = jest.fn(); -> dùng spy để có mockRestore()
  alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {})
})

afterAll(() => {
  errorSpy?.mockRestore()
  alertSpy?.mockRestore()
})
