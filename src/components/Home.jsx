import React from "react"
import { Link } from "react-router-dom"
import Container from "./ui/Container"
const Home = () => {
  const features = [
    {
      title: "Fresh Ingredients",
      description:
        "We source the finest Mediterranean ingredients daily from local farmers and suppliers.",
      icon: "🌿",
    },
    {
      title: "Traditional Recipes",
      description:
        "Authentic family recipes passed down through generations with a modern twist.",
      icon: "👨‍🍳",
    },
    {
      title: "Cozy Atmosphere",
      description:
        "Warm, welcoming environment perfect for family dinners and romantic dates.",
      icon: "🏠",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      review:
        "The best Mediterranean food in Chicago! The atmosphere is perfect and the staff is incredibly friendly.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      review:
        "Amazing flavors and generous portions. The lemon chicken is absolutely divine!",
      rating: 5,
    },
    {
      name: "Emma Davis",
      review:
        "A hidden gem! Perfect for date nights. The ambiance and food quality are outstanding.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="py-10 md:py-16 lg:py-20 bg-orange-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-8">
            {/* Image */}
            <div className="relative h-80 md:h-[460px] bg-gray-100 rounded-2xl overflow-hidden dark:bg-neutral-800">
              <img
                className="w-full h-full object-cover bg-center"
                src="https://images.unsplash.com/photo-1507914464562-6ff4ac29692f?q=80&w=768&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Testimonials Image"
              />
            </div>

            {/* Text */}
            <div className="pt-10 md:p-10">
              <blockquote className="max-w-4xl">
                <p className="mb-6 text-2xl md:text-lg">Little Lemon</p>
                <p className="text-xl sm:text-2xl lg:text-3xl lg:leading-normal text-gray-800">
                  We are a family owned Mediterranean restaurant, focused on
                  traditional recipes served with a modern twist. Experience the
                  authentic flavors of the Mediterranean in the heart of
                  Chicago. The rich flavors and aromas of our favorite coffee
                  blends.
                </p>
                <footer className="mt-6 md:mt-10">
                  <Link to="/booking">
                    <button
                      className="bg-[#F4CE14] text-[#2F5D62] px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      aria-label="Reserve a table at Little Lemon"
                    >
                      Reserve Table
                    </button>
                  </Link>
                </footer>
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 flex-1">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl text-[#2F5D62] mb-5">
              Why Choose Little Lemon?
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Discover what makes our restaurant special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-2xl text-[#2F5D62] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#2F5D62] text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl text-[#F4CE14] mb-5">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-200 mb-10">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ... giữ nguyên */}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#F4CE14] text-center py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl text-[#2F5D62] mb-5">
              Ready for an Unforgettable Dining Experience?
            </h2>
            <Link to="/booking">
              <button className="bg-[#2F5D62] text-white px-10 py-4 text-lg font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Make a Reservation
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Home
