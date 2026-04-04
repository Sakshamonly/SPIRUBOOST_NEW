// Small utility helpers used across the app
// `cn` is a tiny className combiner used by shadcn/ui components
export function cn(...classes) {
  return classes
    .flat()
    .filter(Boolean)
    .join(" ")
}

// Optionally export a default for other modules that might import default
export default cn
