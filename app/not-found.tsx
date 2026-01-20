import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-syntax-blue px-6 py-3 text-white transition-colors hover:bg-syntax-blue/90"
      >
        Go Home
      </Link>
    </div>
  )
}
