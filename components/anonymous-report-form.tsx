'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle, Copy, Paperclip, X } from 'lucide-react'
import { upload } from '@vercel/blob/client'

const MAX_FILES = 3
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

const CATEGORIES = [
  'Employee Feedback',
  'Suggestion & Improvement',
  'Workplace Concern',
  'Complaint or Grievance',
  'Workplace Harassment',
  'Discrimination',
  'Safety Violations',
  'Financial Misconduct',
  'Code of Conduct Violations',
  'Management Abuse',
  'Unethical Behavior',
  'Policy Violations',
  'Corruption',
  'Fraud',
  'Data Privacy & Information Security',
  'Other',
]

const SEVERITIES = [
  { value: 'low', label: 'Low - Minor issue' },
  { value: 'medium', label: 'Medium - Important concern' },
  { value: 'high', label: 'High - Serious matter' },
  { value: 'critical', label: 'Critical - Urgent action needed' },
]

export function AnonymousReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    severity: 'medium',
    department: '',
    reporterEmail: '',
    reporterPhone: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([])
  const [uploadWarning, setUploadWarning] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!formData.title.trim()) {
      setError('Report title cannot be empty')
      setLoading(false)
      return
    }

    if (!formData.description.trim()) {
      setError('Report description cannot be empty')
      setLoading(false)
      return
    }

    if (!formData.category) {
      setError('Please select a report category')
      setLoading(false)
      return
    }

    try {
      const submission = new FormData()
      submission.append('title', formData.title)
      submission.append('description', formData.description)
      submission.append('category', formData.category)
      submission.append('severity', formData.severity)
      submission.append('department', formData.department)
      submission.append('reporterEmail', formData.reporterEmail)
      submission.append('reporterPhone', formData.reporterPhone)
      submission.append('evidenceCount', evidenceFiles.length.toString())

      const response = await fetch('/api/submit-report', {
        method: 'POST',
        body: submission,
      })

      const result = await response.json()

      if (result.success && result.trackingCode) {
        let evidenceUploadFailed = false
        for (const file of evidenceFiles) {
          const attachmentId = crypto.randomUUID()
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100)
          try {
            await upload(`reports/${result.reportId}/${attachmentId}-${safeName}`, file, {
              access: 'private',
              handleUploadUrl: '/api/evidence/upload',
              contentType: file.type,
              clientPayload: JSON.stringify({
                attachmentId,
                reportId: result.reportId,
                trackingCode: result.trackingCode,
                originalName: file.name,
                fileSize: file.size,
              }),
            })
          } catch {
            evidenceUploadFailed = true
          }
        }

        setTrackingCode(result.trackingCode)
        setUploadWarning(
          evidenceUploadFailed
            ? 'Your report was submitted, but one or more evidence files could not be uploaded. Please save your tracking code and contact the administrator if needed.'
            : null
        )
        setSubmitted(true)
        setFormData({
          title: '',
          description: '',
          category: '',
          severity: 'medium',
          department: '',
          reporterEmail: '',
          reporterPhone: '',
        })
        setEvidenceFiles([])
      } else {
        setError(result.error || 'An error occurred while submitting the report')
      }
    } catch (err) {
      console.error('[v0] Form submission error:', err)
      setError('An error occurred while submitting the report')
    } finally {
      setLoading(false)
    }
  }

  const handleEvidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    e.target.value = ''

    if (evidenceFiles.length + selectedFiles.length > MAX_FILES) {
      setError(`You can upload a maximum of ${MAX_FILES} evidence files`)
      return
    }

    const invalidFile = selectedFiles.find(
      file => !ALLOWED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
    )

    if (invalidFile) {
      setError(
        !ALLOWED_FILE_TYPES.includes(invalidFile.type)
          ? `${invalidFile.name} has an unsupported file type`
          : `${invalidFile.name} exceeds the 5 MB limit`
      )
      return
    }

    setError(null)
    setEvidenceFiles(files => [...files, ...selectedFiles])
  }

  const removeEvidence = (index: number) => {
    setEvidenceFiles(files => files.filter((_, fileIndex) => fileIndex !== index))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Report Received</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Thank you for reporting your concern. Your report has been received and will be investigated professionally.
          </p>

          <div className="bg-white border border-green-300 rounded-lg p-6 mb-6 text-left">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Your Tracking Code:</p>
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <code className="text-xl sm:text-2xl font-bold text-green-700 tracking-widest break-all">{trackingCode}</code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
              >
                <Copy className={`w-5 h-5 ${copied ? 'text-green-600' : 'text-gray-400'}`} />
              </button>
            </div>
            {copied && <p className="text-xs sm:text-sm text-green-600 mt-2">Code copied to clipboard</p>}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs sm:text-sm text-gray-700 mb-2">
              <strong>Important:</strong> Save this tracking code to monitor your report status.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Use this code on the &quot;Track Report&quot; page to see the investigation progress.
            </p>
          </div>

          {uploadWarning && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-amber-800">{uploadWarning}</p>
            </div>
          )}

          <button
            onClick={() => {
              setSubmitted(false)
              setTrackingCode('')
              setUploadWarning(null)
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition text-sm sm:text-base"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
            Report Category <span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base text-gray-900 bg-white"
          >
            <option value="" className="text-gray-400">Select a category...</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="text-gray-900">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="severity" className="block text-sm font-semibold text-gray-900 mb-2">
            Severity Level <span className="text-red-600">*</span>
          </label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base text-gray-900 bg-white"
          >
            {SEVERITIES.map(sev => (
              <option key={sev.value} value={sev.value} className="text-gray-900">{sev.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
          Report Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Summarize the issue in one line"
          maxLength={200}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
        />
        <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200</p>
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
          Detailed Description <span className="text-red-600">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Explain the details of your report with complete information..."
          maxLength={5000}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
        />
        <p className="text-xs text-gray-500 mt-1">{formData.description.length}/5000</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div>
          <label htmlFor="department" className="block text-sm font-semibold text-gray-900 mb-2">
            Department/Unit (Optional)
          </label>
          <input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            placeholder="E.g., Finance, HR, Operations"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="reporterEmail" className="block text-sm font-semibold text-gray-900 mb-2">
            Email (Optional)
          </label>
          <input
            id="reporterEmail"
            name="reporterEmail"
            type="email"
            value={formData.reporterEmail}
            onChange={handleChange}
            placeholder="For report status updates"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="reporterPhone" className="block text-sm font-semibold text-gray-900 mb-2">
          Phone Number (Optional)
        </label>
        <input
          id="reporterPhone"
          name="reporterPhone"
          type="tel"
          value={formData.reporterPhone}
          onChange={handleChange}
          placeholder="For contact if needed"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="evidence" className="block text-sm font-semibold text-gray-900 mb-2">
          Evidence / Supporting Files (Optional)
        </label>
        <label
          htmlFor="evidence"
          className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-green-50 hover:border-green-400 cursor-pointer transition text-gray-700"
        >
          <Paperclip className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold">Choose images or PDF</span>
        </label>
        <input
          id="evidence"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={handleEvidenceChange}
          className="sr-only"
        />
        <p className="text-xs text-gray-500 mt-2">Maximum 3 files, 5 MB each. JPG, PNG, WEBP, or PDF.</p>

        {evidenceFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {evidenceFiles.map((file, index) => (
              <div key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeEvidence(index)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-xs sm:text-sm text-green-800">
          <strong>Your privacy is protected:</strong> Your report is completely anonymous. Only the information you provide will be recorded. No other identity data is collected.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition text-sm sm:text-base"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  )
}
