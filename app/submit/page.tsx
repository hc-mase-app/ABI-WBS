import { AnonymousReportForm } from '@/components/anonymous-report-form'
import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle, FileText, Home, LockKeyhole, MessageCircleMore, Paperclip } from 'lucide-react'

export const metadata = {
  title: 'Submit Feedback or Report - Abhitech Speak Up',
  description: 'Share employee feedback, suggestions, concerns, complaints, or suspected misconduct securely.',
}

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <header className="border-b border-green-100 bg-white/90 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Abhitech-WKYuLp4lUYbxjEWZoDP9cQw60WckgV.webp"
              alt="Abhitech"
              width={40}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-green-900">Abhitech</span>
              <p className="text-xs text-green-600">Speak Up</p>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-1 text-sm font-semibold text-gray-600 transition hover:text-green-700 sm:text-base">
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Back Home</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="mb-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex flex-col items-start gap-4 sm:flex-row">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
              <FileText className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-green-700">Employee Feedback & Reporting Channel</p>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl">Share Feedback or Submit a Report</h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">Use this form for feedback, suggestions, workplace concerns, complaints, or suspected misconduct.</p>
            </div>
          </div>

          <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
              <LockKeyhole className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <h2 className="font-semibold text-green-900">Privacy Choice</h2>
                <p className="mt-1 text-sm text-green-800">Contact details are optional</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <Paperclip className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
              <div>
                <h2 className="font-semibold text-yellow-900">Add Evidence</h2>
                <p className="mt-1 text-sm text-yellow-800">Images and PDF are supported</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <MessageCircleMore className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <h2 className="font-semibold text-emerald-900">Track & Reply</h2>
                <p className="mt-1 text-sm text-emerald-800">One tracking code is all you need</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div>
              <h2 className="font-semibold text-yellow-900">Before You Submit</h2>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-yellow-800">
                <li>Describe what happened and include relevant dates, locations, and people.</li>
                <li>Attach supporting evidence when available.</li>
                <li>Leave email and phone blank if you prefer to remain anonymous.</li>
                <li>Save the tracking code displayed after submission.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <AnonymousReportForm />
        </section>

        <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">Good to Know</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">Can I report anonymously?</h3>
              <p className="text-sm leading-relaxed text-gray-600">Yes. Email, phone number, and department are optional. Only enter personal details you choose to provide.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">How do I track my report?</h3>
              <p className="text-sm leading-relaxed text-gray-600">Save the tracking code shown after submission. It lets you view status, read messages, and reply to the review team.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">What evidence can I attach?</h3>
              <p className="text-sm leading-relaxed text-gray-600">You can attach up to three JPG, PNG, WEBP, or PDF files, with a maximum size of 5 MB per file.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">What happens after submission?</h3>
              <p className="text-sm leading-relaxed text-gray-600">The review team assesses the report, updates its status, and may request more information through the tracking page.</p>
            </div>
          </div>
        </section>

        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800 sm:text-base">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
