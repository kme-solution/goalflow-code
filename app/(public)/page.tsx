import { DocsMenuSection } from "@/components/landing/docs-menu-section"

export default function HomePage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Align Your Teams. Achieve Your Goals.</h1>
          <p className="text-xl text-gray-600 mb-8">
            GoalFlow Pro helps organizations cascade goals, recognize achievements, and drive performance.
          </p>
        </div>
      </div>
      
      <DocsMenuSection />
    </div>
  )
}
