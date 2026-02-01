import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "white" | "dark"
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
}

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
}

export function Logo({ 
  className, 
  showText = true, 
  size = "md",
  variant = "default" 
}: LogoProps) {
  const textColor = variant === "white" 
    ? "text-white" 
    : variant === "dark" 
    ? "text-slate-900" 
    : "text-foreground"

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} variant={variant} />
      {showText && (
        <span className={cn(
          "font-semibold tracking-tight",
          textSizeClasses[size],
          textColor
        )}>
          Goal<span className="text-primary">Flow</span>
        </span>
      )}
    </div>
  )
}

export function LogoMark({ 
  size = "md", 
  variant = "default",
  className 
}: { 
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "white" | "dark"
  className?: string 
}) {
  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-xl",
      sizeClasses[size],
      className
    )}>
      <svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>
        </defs>
        
        {/* Rounded square background */}
        <rect 
          x="0" 
          y="0" 
          width="40" 
          height="40" 
          rx="10" 
          fill="url(#logoGradient)"
        />
        
        {/* Upward arrow / growth symbol */}
        <path 
          d="M20 8L28 18H22V32H18V18H12L20 8Z" 
          fill="url(#arrowGradient)"
        />
        
        {/* Progress bar accent */}
        <rect 
          x="12" 
          y="28" 
          width="16" 
          height="3" 
          rx="1.5" 
          fill="rgba(255,255,255,0.4)"
        />
        <rect 
          x="12" 
          y="28" 
          width="10" 
          height="3" 
          rx="1.5" 
          fill="url(#arrowGradient)"
        />
      </svg>
    </div>
  )
}

export function LogoWordmark({ 
  className,
  variant = "default" 
}: { 
  className?: string
  variant?: "default" | "white" | "dark"
}) {
  const textColor = variant === "white" 
    ? "text-white" 
    : variant === "dark" 
    ? "text-slate-900" 
    : "text-foreground"

  return (
    <span className={cn(
      "text-2xl font-semibold tracking-tight",
      textColor,
      className
    )}>
      Goal<span className="text-primary">Flow</span>
    </span>
  )
}
