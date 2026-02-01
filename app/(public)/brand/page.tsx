import { Logo, LogoMark, LogoWordmark } from "@/components/brand/logo"

export const metadata = {
  title: "Brand Guidelines - GoalFlow",
  description: "GoalFlow brand guidelines, logos, and visual identity assets.",
}

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            GoalFlow Brand Guidelines
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our brand identity reflects growth, progress, and achievement. 
            Use these guidelines to maintain consistency across all touchpoints.
          </p>
        </div>

        {/* Logo Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Logo</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Primary Logo */}
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">Primary Logo</p>
              <div className="flex items-center justify-center h-24 bg-muted/30 rounded-lg">
                <Logo size="lg" />
              </div>
            </div>

            {/* Logo Mark */}
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">Logo Mark</p>
              <div className="flex items-center justify-center h-24 bg-muted/30 rounded-lg">
                <LogoMark size="xl" />
              </div>
            </div>

            {/* Wordmark */}
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">Wordmark</p>
              <div className="flex items-center justify-center h-24 bg-muted/30 rounded-lg">
                <LogoWordmark />
              </div>
            </div>
          </div>

          {/* Logo on Dark */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-sidebar rounded-xl p-8">
              <p className="text-sm font-medium text-sidebar-foreground/70 mb-4">On Dark Background</p>
              <div className="flex items-center justify-center h-24">
                <Logo size="lg" variant="white" />
              </div>
            </div>
            <div className="bg-sidebar rounded-xl p-8">
              <p className="text-sm font-medium text-sidebar-foreground/70 mb-4">Mark on Dark</p>
              <div className="flex items-center justify-center h-24">
                <LogoMark size="xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Color Palette</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Primary */}
            <div className="space-y-3">
              <div className="h-24 rounded-xl bg-primary" />
              <div>
                <p className="font-medium text-foreground">Primary</p>
                <p className="text-sm text-muted-foreground">Emerald 500</p>
                <p className="text-sm font-mono text-muted-foreground">#10b981</p>
              </div>
            </div>

            {/* Accent */}
            <div className="space-y-3">
              <div className="h-24 rounded-xl bg-accent" />
              <div>
                <p className="font-medium text-foreground">Accent</p>
                <p className="text-sm text-muted-foreground">Teal 500</p>
                <p className="text-sm font-mono text-muted-foreground">#14b8a6</p>
              </div>
            </div>

            {/* Dark */}
            <div className="space-y-3">
              <div className="h-24 rounded-xl bg-sidebar" />
              <div>
                <p className="font-medium text-foreground">Dark</p>
                <p className="text-sm text-muted-foreground">Slate 900</p>
                <p className="text-sm font-mono text-muted-foreground">#1e293b</p>
              </div>
            </div>

            {/* Background */}
            <div className="space-y-3">
              <div className="h-24 rounded-xl bg-background border border-border" />
              <div>
                <p className="font-medium text-foreground">Background</p>
                <p className="text-sm text-muted-foreground">White</p>
                <p className="text-sm font-mono text-muted-foreground">#ffffff</p>
              </div>
            </div>
          </div>

          {/* Gradient Showcase */}
          <div className="mt-8">
            <p className="text-sm font-medium text-muted-foreground mb-4">Brand Gradient</p>
            <div className="h-16 rounded-xl gradient-brand" />
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Typography</h2>
          
          <div className="bg-card border border-border rounded-xl p-8 space-y-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Font Family</p>
              <p className="text-2xl font-medium text-foreground">Inter</p>
              <p className="text-muted-foreground">A clean, modern sans-serif typeface designed for UI</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Headings</p>
              <p className="text-4xl font-bold text-foreground">Display Large</p>
              <p className="text-3xl font-semibold text-foreground">Heading 1</p>
              <p className="text-2xl font-semibold text-foreground">Heading 2</p>
              <p className="text-xl font-semibold text-foreground">Heading 3</p>
              <p className="text-lg font-medium text-foreground">Heading 4</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Body</p>
              <p className="text-base text-foreground leading-relaxed">
                Body text is set in Inter at 16px with relaxed line height for optimal readability. 
                GoalFlow helps teams set meaningful goals, track progress, and celebrate achievements together.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Small text is used for secondary information and captions.
              </p>
            </div>
          </div>
        </section>

        {/* Logo Sizes */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Logo Sizes</h2>
          
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-end gap-8 flex-wrap">
              <div className="text-center">
                <Logo size="sm" />
                <p className="text-xs text-muted-foreground mt-2">Small (24px)</p>
              </div>
              <div className="text-center">
                <Logo size="md" />
                <p className="text-xs text-muted-foreground mt-2">Medium (32px)</p>
              </div>
              <div className="text-center">
                <Logo size="lg" />
                <p className="text-xs text-muted-foreground mt-2">Large (40px)</p>
              </div>
              <div className="text-center">
                <Logo size="xl" />
                <p className="text-xs text-muted-foreground mt-2">X-Large (48px)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-8">Usage Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Button Example */}
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">Buttons</p>
              <div className="flex gap-4 flex-wrap">
                <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Primary Button
                </button>
                <button className="px-6 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                  Secondary Button
                </button>
              </div>
            </div>

            {/* Badge Example */}
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">Status Badges</p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  On Track
                </span>
                <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                  At Risk
                </span>
                <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
                  Off Track
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
