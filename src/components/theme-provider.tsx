import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * Get the initial theme based on time of day
 * Daytime (6am-6pm): light mode
 * Evening (6pm-6am): dark mode
 */
function getTimeBasedTheme(): "light" | "dark" {
  const currentHour = new Date().getHours()
  // Daytime is 6am (6) to 6pm (18)
  const isDaytime = currentHour >= 6 && currentHour < 18
  return isDaytime ? "light" : "dark"
}

/**
 * Component that sets the theme based on time of day on first mount
 */
function AutoThemeInitializer() {
  const { setTheme, theme } = useTheme()
  const [hasInitialized, setHasInitialized] = React.useState(false)

  React.useEffect(() => {
    // Only run once on mount
    if (hasInitialized) return
    
    // Check if user has a stored preference
    // next-themes stores theme in localStorage with key from storageKey prop (default: "theme")
    const storedTheme = localStorage.getItem("theme")
    
    // If no stored preference exists, set theme based on time of day
    if (!storedTheme || storedTheme === "undefined") {
      const timeBasedTheme = getTimeBasedTheme()
      setTheme(timeBasedTheme)
    }
    
    setHasInitialized(true)
  }, [setTheme, hasInitialized])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AutoThemeInitializer />
      {children}
    </NextThemesProvider>
  )
}