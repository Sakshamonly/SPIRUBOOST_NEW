const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050/api"

const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "")

export function resolveMediaUrl(value, fallback = "/placeholder.svg") {
  const input = String(value || "").trim()

  if (!input) return fallback

  if (/^(data:|blob:|https?:\/\/)/i.test(input)) {
    return input
  }

  if (input.startsWith("/uploads/") || input.startsWith("uploads/")) {
    return `${API_ORIGIN}/${input.replace(/^\//, "")}`
  }

  if (input.startsWith("/")) {
    return input
  }

  return `${API_ORIGIN}/${input}`
}
