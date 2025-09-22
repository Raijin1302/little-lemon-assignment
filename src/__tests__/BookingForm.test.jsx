// src/__tests__/BookingForm.test.jsx
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BookingForm from "../components/BookingForm"

// Helper: tạo ngày theo format yyyy-mm-dd
function futureDate(days = 1) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

describe("Booking form", () => {
  // 1) Render cơ bản — các field xuất hiện
  test("Render: hiện đủ các field cơ bản", () => {
    const mockSubmit = jest.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^date$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^time$/i)).toBeInTheDocument()

    // Occasion là <select> không có htmlFor -> dùng role combobox
    expect(screen.getByRole("combobox")).toBeInTheDocument()

    // Guests theo placeholder
    expect(screen.getByPlaceholderText(/1-10 guests/i)).toBeInTheDocument()

    // Special Requests có label
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument()

    // Nút submit
    expect(
      screen.getByRole("button", { name: /book appointment/i })
    ).toBeInTheDocument()
  })

  // 2) Điền dữ liệu hợp lệ → gọi submitForm (1 lần) + payload cơ bản
  test("Submit hợp lệ → gọi submitForm đúng 1 lần với dữ liệu hợp lệ", async () => {
    const mockSubmit = jest.fn().mockResolvedValue(true)
    render(<BookingForm submitForm={mockSubmit} />)

    await userEvent.type(screen.getByLabelText(/full name/i), "Nguyen Hoan")
    await userEvent.type(screen.getByLabelText(/phone number/i), "0912345678")
    await userEvent.type(screen.getByLabelText(/email address/i), "me@test.com")
    await userEvent.type(screen.getByLabelText(/^date$/i), futureDate(2))
    await userEvent.type(screen.getByLabelText(/^time$/i), "18:30")

    await userEvent.selectOptions(screen.getByRole("combobox"), "Birthday")

    const guests = screen.getByPlaceholderText(/1-10 guests/i)
    await userEvent.clear(guests)
    await userEvent.type(guests, "4")

    // Requests optional
    await userEvent.type(
      screen.getByLabelText(/special requests/i),
      "Window seat please"
    )

    await userEvent.click(
      screen.getByRole("button", { name: /book appointment/i })
    )

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1))

    // Kiểm tra payload chính
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Nguyen Hoan",
        phone: "0912345678",
        email: "me@test.com",
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        time: "18:30",
        occasion: "Birthday",
        guests: "4",
        requests: "Window seat please",
      })
    )
  })

  // 3A) Email sai format → KHÔNG gọi submitForm + hiện lỗi chính xác
  test("Email sai format → không gọi submitForm và hiện 'Please enter a valid email.'", async () => {
    const mockSubmit = jest.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    await userEvent.type(screen.getByLabelText(/full name/i), "Nguyen Hoan")
    await userEvent.type(screen.getByLabelText(/phone number/i), "0912345678")
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "invalid_email"
    )
    await userEvent.type(screen.getByLabelText(/^date$/i), futureDate(2))
    await userEvent.type(screen.getByLabelText(/^time$/i), "18:30")
    await userEvent.selectOptions(screen.getByRole("combobox"), "Birthday")

    const guests = screen.getByPlaceholderText(/1-10 guests/i)
    await userEvent.clear(guests)
    await userEvent.type(guests, "4")

    await userEvent.click(
      screen.getByRole("button", { name: /book appointment/i })
    )

    await waitFor(() =>
      expect(
        screen.getByText("Please enter a valid email.")
      ).toBeInTheDocument()
    )
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  // 3B) Ngày quá khứ → KHÔNG gọi submitForm + hiện lỗi đúng chuỗi trong component
  test("Ngày quá khứ → không gọi submitForm và hiện 'Selected date & time cannot be in the past.'", async () => {
    const mockSubmit = jest.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    await userEvent.type(screen.getByLabelText(/full name/i), "Nguyen Hoan")
    await userEvent.type(screen.getByLabelText(/phone number/i), "0912345678")
    await userEvent.type(screen.getByLabelText(/email address/i), "me@test.com")
    await userEvent.type(screen.getByLabelText(/^date$/i), futureDate(-2)) // quá khứ
    await userEvent.type(screen.getByLabelText(/^time$/i), "00:01") // bất kỳ giờ
    await userEvent.selectOptions(screen.getByRole("combobox"), "Birthday")

    const guests = screen.getByPlaceholderText(/1-10 guests/i)
    await userEvent.clear(guests)
    await userEvent.type(guests, "2")

    await userEvent.click(
      screen.getByRole("button", { name: /book appointment/i })
    )

    // Lỗi này có thể hiển thị ở cả Date và Time
    await waitFor(() => {
      expect(
        screen.getAllByText("Selected date & time cannot be in the past.")
          .length
      ).toBeGreaterThanOrEqual(1)
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  // 3C) Guests <1 → KHÔNG gọi submitForm + hiện lỗi chính xác
  test("Guests < 1 → không gọi submitForm và hiện 'Guests must be between 1 and 10.'", async () => {
    const mockSubmit = jest.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    await userEvent.type(screen.getByLabelText(/full name/i), "Nguyen Hoan")
    await userEvent.type(screen.getByLabelText(/phone number/i), "0912345678")
    await userEvent.type(screen.getByLabelText(/email address/i), "me@test.com")
    await userEvent.type(screen.getByLabelText(/^date$/i), futureDate(2))
    await userEvent.type(screen.getByLabelText(/^time$/i), "18:30")
    await userEvent.selectOptions(screen.getByRole("combobox"), "Birthday")

    const guests = screen.getByPlaceholderText(/1-10 guests/i)
    await userEvent.clear(guests)
    await userEvent.type(guests, "0") // < 1

    await userEvent.click(
      screen.getByRole("button", { name: /book appointment/i })
    )

    await waitFor(() =>
      expect(
        screen.getByText("Guests must be between 1 and 10.")
      ).toBeInTheDocument()
    )
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  // 3D) Guests >10 → KHÔNG gọi submitForm + hiện lỗi chính xác
  test("Guests > 10 → không gọi submitForm và hiện 'Guests must be between 1 and 10.'", async () => {
    const mockSubmit = jest.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    await userEvent.type(screen.getByLabelText(/full name/i), "Nguyen Hoan")
    await userEvent.type(screen.getByLabelText(/phone number/i), "0912345678")
    await userEvent.type(screen.getByLabelText(/email address/i), "me@test.com")
    await userEvent.type(screen.getByLabelText(/^date$/i), futureDate(2))
    await userEvent.type(screen.getByLabelText(/^time$/i), "18:30")
    await userEvent.selectOptions(screen.getByRole("combobox"), "Birthday")

    const guests = screen.getByPlaceholderText(/1-10 guests/i)
    await userEvent.clear(guests)
    await userEvent.type(guests, "11") // > 10

    await userEvent.click(
      screen.getByRole("button", { name: /book appointment/i })
    )

    await waitFor(() =>
      expect(
        screen.getByText("Guests must be between 1 and 10.")
      ).toBeInTheDocument()
    )
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  // 3E) Thiếu Full Name → KHÔNG gọi submitForm + hiện lỗi bắt buộc đúng chuỗi
  test("Thiếu Full Name → không gọi submitForm và hiện 'Please enter your full name.'", async () => {
    const mockSubmit = jest.fn()
    render(<BookingForm submitForm={mockSubmit} />)

    // Bỏ trống name
    await userEvent.type(screen.getByLabelText(/phone number/i), "0912345678")
    await userEvent.type(screen.getByLabelText(/email address/i), "me@test.com")
    await userEvent.type(screen.getByLabelText(/^date$/i), futureDate(2))
    await userEvent.type(screen.getByLabelText(/^time$/i), "18:30")
    await userEvent.selectOptions(screen.getByRole("combobox"), "Birthday")

    const guests = screen.getByPlaceholderText(/1-10 guests/i)
    await userEvent.clear(guests)
    await userEvent.type(guests, "4")

    await userEvent.click(
      screen.getByRole("button", { name: /book appointment/i })
    )

    await waitFor(() =>
      expect(
        screen.getByText("Please enter your full name.")
      ).toBeInTheDocument()
    )
    expect(mockSubmit).not.toHaveBeenCalled()
  })
})
