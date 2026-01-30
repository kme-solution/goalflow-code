export default function FeaturesPage() {
  const features = [
    { title: "Goal Management", description: "Create and cascade goals across your organization" },
    { title: "Recognition System", description: "Celebrate wins and build a culture of appreciation" },
    { title: "Performance Tracking", description: "Monitor progress with real-time check-ins and analytics" },
    { title: "Team Collaboration", description: "Coordinate across teams and manage dependencies" },
    { title: "Analytics & Insights", description: "Gain visibility into organizational performance" },
    { title: "Mobile Support", description: "Stay connected on the go with native mobile apps" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Features</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
