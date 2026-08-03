'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, AlertCircle, Home } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        localStorage.setItem('adminToken', password)
        router.push('/admin/dashboard')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-yellow-200 transition text-sm sm:text-base font-semibold"
      >
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
            Admin Login
          </h1>
          <p className="text-green-100 text-center mb-8 text-sm sm:text-base">
            Manage whistleblowing reports
          </p>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-500/20 border border-red-400/50 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:border-transparent focus:bg-white/20 transition text-sm sm:text-base"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-700 disabled:to-emerald-800 text-white py-3 px-4 rounded-lg font-semibold transition transform hover:scale-105 disabled:scale-100 text-sm sm:text-base"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
