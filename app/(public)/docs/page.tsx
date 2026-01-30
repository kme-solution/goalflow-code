export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Documentation</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-gray-600">Learn how to set up GoalFlow Pro in your organization</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">API Reference</h2>
          <p className="text-gray-600">Integrate GoalFlow Pro with your existing tools</p>
        </section>
      </div>
    </div>
  )
}
