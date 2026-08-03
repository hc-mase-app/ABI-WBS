import { AnonymousReportForm } from '@/components/anonymous-report-form'
import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle, FileText, Shield, Home } from 'lucide-react'

export const metadata = {
  title: 'Submit Report - Speak Up System',
  description: 'Submit your anonymous report safely and securely',
}

export default function SubmitPage() {
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
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Submit Anonymous Report</h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Your report will be handled with seriousness, professionalism, and complete protection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 text-sm sm:text-base">Complete Anonymity</h3>
                <p className="text-xs sm:text-sm text-green-800 mt-1">No identity is stored</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 text-sm sm:text-base">Secure Tracking</h3>
                <p className="text-xs sm:text-sm text-yellow-800 mt-1">Unique code to track status</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-900 text-sm sm:text-base">Protection</h3>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1">Zero retaliation policy</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 text-sm sm:text-base">Important Guidelines</h3>
              <ul className="text-xs sm:text-sm text-yellow-800 mt-2 space-y-1">
                <li>• Provide as much detail as possible to facilitate investigation</li>
                <li>• Include dates, times, and location if relevant</li>
                <li>• Explain who, what, when, where, and why</li>
                <li>• Email and phone are optional (only if you want status updates)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-green-200 p-6 sm:p-8 shadow-lg mb-8">
          <AnonymousReportForm />
        </div>

        <div className="bg-white rounded-xl border border-green-200 p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Is my report truly anonymous?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Yes, completely anonymous. We do not collect or store any identity information except what you voluntarily provide (email or phone).</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How do I track my report?</h3>
              <p className="text-gray-600 text-sm sm:text-base">You will receive a unique tracking code after submitting your report. Use this code on the Track Report page to view the investigation status.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Will my contact information be used?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Email and phone will only be used to provide status updates or request additional information if needed. This information will not be shared with anyone.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What happens to my report?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Your report will be reviewed by our investigation team. We will conduct a thorough investigation and take appropriate action based on our findings.</p>
            </div>
          </div>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base mt-8">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
