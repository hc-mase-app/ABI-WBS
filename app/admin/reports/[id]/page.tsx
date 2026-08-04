'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Check } from 'lucide-react'

interface Report {
  id: string
  trackingCode: string
  title: string
  description: string
  category: string
  severity: string
  department?: string | null
  status: string
  adminNotes?: string | null
  reporterEmail?: string | null
  reporterPhone?: string | null
  reportDate: string
  createdAt: string
  updatedAt: string
}

export default function AdminReportDetail() {
  const router = useRouter()
  const params = useParams()
  const reportId = params.id as string

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    loadReport()
  }, [reportId])

  const loadReport = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/reports', {
        headers: { 'x-admin-token': token },
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      const found = data.reports?.find((r: Report) => r.id === reportId)

      if (found) {
        setReport(found)
        setStatus(found.status)
        setNotes(found.adminNotes || '')
      } else {
        setError('Report not found')
      }
    } catch (err) {
      setError('Failed to load report')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setSuccess(false)
      setError('')

      const token = localStorage.getItem('adminToken')

      const response = await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token || '',
        },
        body: JSON.stringify({
          reportId,
          status,
          adminNotes: notes,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        loadReport()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('Failed to save changes')
      }
    } catch (err) {
      setError('Error saving report')
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-200 border-blue-500/20'
      case 'in_progress':
        return 'bg-purple-500/10 text-purple-200 border-purple-500/20'
      case 'resolved':
        return 'bg-green-500/10 text-green-200 border-green-500/20'
      case 'closed':
        return 'bg-slate-500/10 text-slate-200 border-slate-500/20'
      default:
        return 'bg-slate-500/10 text-slate-200 border-slate-500/20'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400'
      case 'high':
        return 'text-orange-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-slate-400'
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-blue-200">Loading report...</p>
      </main>
    )
  }

  if (!report) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-start gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error || 'Report not found'}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700 sticky top-0 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-100 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white break-words">{report.title}</h1>
              <p className="text-blue-100 mt-1">
                Tracking Code: <span className="font-mono text-blue-300">{report.trackingCode}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-2 rounded border text-sm font-semibold ${getSeverityColor(report.severity)}`}>
                {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 disabled:scale-100 whitespace-nowrap"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
                <span className="inline sm:hidden">{saving ? '...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {success && (
          <div className="flex items-start gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-lg mb-6 animate-pulse">
            <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-200">Changes saved successfully</p>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
              <h2 className="text-lg font-semibold text-white mb-4">Report Description</h2>
              <p className="text-blue-100 leading-relaxed whitespace-pre-wrap">{report.description}</p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Investigation Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add investigation findings, discoveries, or actions taken..."
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/20 resize-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Report Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Category</p>
                  <p className="text-white mt-2">{report.category}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Department</p>
                  <p className="text-white mt-2">{report.department || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Reporter Email</p>
                  <p className="text-white mt-2 break-all">{report.reporterEmail || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Reporter Phone</p>
                  <p className="text-white mt-2">{report.reporterPhone || '-'}</p>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/20 appearance-none cursor-pointer"
              >
                <option value="open" className="bg-slate-800 text-white">Pending Review</option>
                <option value="in_progress" className="bg-slate-800 text-white">In Progress</option>
                <option value="resolved" className="bg-slate-800 text-white">Resolved</option>
                <option value="closed" className="bg-slate-800 text-white">Closed</option>
              </select>
            </div>

            {/* Dates */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Created</p>
                  <p className="text-white text-sm mt-2">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Updated</p>
                  <p className="text-white text-sm mt-2">
                    {new Date(report.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
