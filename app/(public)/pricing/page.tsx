export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Simple Pricing</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {["Starter", "Professional", "Enterprise"].map((plan) => (
          <div key={plan} className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">{plan}</h3>
            <p className="text-gray-600">Contact us for pricing details</p>
          </div>
        ))}
      </div>
    </div>
  )
}
