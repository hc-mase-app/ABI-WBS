'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getReportByTrackingCode } from '@/app/actions/submit-report'
import { Search, AlertCircle, FileText, Home } from 'lucide-react'

const STATUS_CONFIG = {
  open: { color: 'blue', label: 'Pending Review', icon: '📋' },
  pending: { color: 'yellow', label: 'Under Review', icon: '⏳' },
  in_progress: { color: 'orange', label: 'In Progress', icon: '🔍' },
  investigating: { color: 'orange', label: 'In Progress', icon: '🔍' },
  resolved: { color: 'green', label: 'Resolved', icon: '✅' },
  closed: { color: 'gray', label: 'Closed', icon: '❌' },
}

const SEVERITY_CONFIG = {
  low: { color: 'green', label: 'Low' },
  medium: { color: 'yellow', label: 'Medium' },
  high: { color: 'orange', label: 'High' },
  critical: { color: 'red', label: 'Critical' },
}

export default function TrackPage() {
  const [trackingCode, setTrackingCode] = useState('')
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setReport(null)
    setLoading(true)
    setSearched(true)

    if (!trackingCode.trim()) {
      setError('Please enter your tracking code')
      setLoading(false)
      return
    }

    try {
      const foundReport = await getReportByTrackingCode(trackingCode.toUpperCase())
      if (foundReport) {
        setReport(foundReport)
      } else {
        setError('Tracking code not found. Please ensure you entered the correct code.')
      }
    } catch (err) {
      setError('An error occurred while searching for the report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Abhitech-WKYuLp4lUYbxjEWZoDP9cQw60WckgV.webp"
              alt="Abhitech"
              width={40}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
            <span className="text-white font-bold text-sm sm:text-lg hidden sm:inline">Abhitech</span>
          </Link>
          <Link href="/" className="text-white hover:text-yellow-100 transition flex items-center gap-1 text-sm sm:text-base">
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back Home</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-xl border border-green-200 p-6 sm:p-8 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Search className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Track Your Report</h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Use your tracking code to check the status of your report</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                placeholder="Enter tracking code (e.g., ABC123DEF456)"
                maxLength={12}
                className="tracking-code-input flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 caret-green-700 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition whitespace-nowrap text-sm sm:text-base"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-red-700">{error}</p>
            </div>
          )}

          {searched && !loading && !report && !error && (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">No report found with that tracking code</p>
            </div>
          )}

          {report && (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 font-semibold">Report Status</p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-4xl">{STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG]?.icon || '📄'}</span>
                      <span className="text-xl sm:text-3xl font-bold text-gray-900">
                        {STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG]?.label || report.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 font-semibold">Tracking Code</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-600 break-all">{report.trackingCode}</p>
                  </div>
                </div>
              </div>

              {/* Report Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">{report.title}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 font-semibold">Category</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{report.category}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 font-semibold">Severity</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded-full bg-${SEVERITY_CONFIG[report.severity as keyof typeof SEVERITY_CONFIG]?.color || 'gray'}-500`} />
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {SEVERITY_CONFIG[report.severity as keyof typeof SEVERITY_CONFIG]?.label || report.severity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 font-semibold">Report Date</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 font-semibold">Description</p>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{report.description}</p>
                </div>

                {/* Investigation Notes */}
                {report.adminNotes && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-900 mb-2 font-semibold">Investigation Notes</p>
                    <p className="text-blue-800 whitespace-pre-wrap text-sm sm:text-base">{report.adminNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
