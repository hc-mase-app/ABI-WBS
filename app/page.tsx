import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  LockKeyhole,
  MessageCircleMore,
  Paperclip,
  Settings,
} from 'lucide-react'

export const metadata = {
  title: 'Speak Up - Abhitech Employee Feedback & Reporting System',
  description:
    'A secure and confidential channel for Abhitech employees to share feedback, suggestions, concerns, complaints, or suspected misconduct.',
}

const reportCategories = [
  {
    title: 'Feedback & Ideas',
    description: 'Employee feedback, suggestions, and opportunities for improvement.',
  },
  {
    title: 'Workplace Concerns',
    description: 'Workplace issues, complaints, grievances, harassment, or discrimination.',
  },
  {
    title: 'Safety & Conduct',
    description: 'Safety risks, management concerns, policy, or code of conduct violations.',
  },
  {
    title: 'Suspected Misconduct',
    description: 'Fraud, corruption, financial misconduct, unethical behavior, or data risks.',
  },
]

const processSteps = [
  {
    number: '1',
    title: 'Submit',
    description: 'Share your report and attach supporting images or PDF files if needed.',
  },
  {
    number: '2',
    title: 'Save Your Code',
    description: 'Keep the tracking code shown after your report is submitted.',
  },
  {
    number: '3',
    title: 'Track & Communicate',
    description: 'Use the code to view progress, read updates, and reply securely.',
  },
  {
    number: '4',
    title: 'Follow the Resolution',
    description: 'Continue checking the report until the review process is completed.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 text-gray-900">
      <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Abhitech Speak Up home">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Abhitech-WKYuLp4lUYbxjEWZoDP9cQw60WckgV.webp"
              alt="Abhitech Logo"
              width={40}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-green-900">Abhitech</span>
              <p className="text-xs text-green-600">Speak Up</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/track"
              className="text-sm font-semibold text-gray-700 transition hover:text-green-700 sm:text-base"
            >
              Track Report
            </Link>
            <Link
              href="/admin/login"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <Link
              href="/submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-6 sm:text-base"
            >
              Submit Report
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Employee Feedback & Reporting Channel
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-950 sm:text-5xl md:text-6xl">
              Speak Up, Be Heard, Stay Safe
            </h1>
            <p className="mx-auto mb-9 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              A secure and confidential channel to share employee feedback, suggestions,
              concerns, complaints, or suspected misconduct—with options to report openly,
              confidentially, or anonymously, and protection from retaliation.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/submit"
                className="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Submit a Report
              </Link>
              <Link
                href="/track"
                className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition hover:border-green-500 hover:text-green-700"
              >
                Track Existing Report
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: LockKeyhole,
                title: 'Your Choice of Privacy',
                description:
                  'Report openly, confidentially, or anonymously. Contact details are optional.',
              },
              {
                icon: Paperclip,
                title: 'Supporting Evidence',
                description:
                  'Attach up to three images or PDF files when submitting your report.',
              },
              {
                icon: MessageCircleMore,
                title: 'Secure Two-Way Updates',
                description:
                  'Use your tracking code to view status updates and communicate with the review team.',
              },
            ].map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <Icon className="h-5 w-5 text-green-700" />
                </div>
                <h2 className="mb-2 text-lg font-bold">{title}</h2>
                <p className="leading-relaxed text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-gray-100 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">What You Can Share</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                The channel is not limited to misconduct. You can also share ideas, feedback,
                or other workplace matters.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reportCategories.map((category) => (
                <article key={category.title} className="rounded-xl border border-gray-200 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                    <h3 className="font-bold">{category.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{category.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="mt-3 text-gray-600">One tracking code keeps the process simple.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.number} className="rounded-xl border border-green-100 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-green-700 px-6 py-10 text-center text-white sm:px-12 sm:py-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Your voice matters.</h2>
            <p className="mx-auto mb-7 mt-3 max-w-2xl text-green-100">
              Share what you have experienced or observed. You decide how much personal
              information to provide.
            </p>
            <Link
              href="/submit"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Start a Report
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 bg-gray-950 text-gray-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Abhitech-WKYuLp4lUYbxjEWZoDP9cQw60WckgV.webp"
              alt="Abhitech"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <div>
              <p className="font-bold text-white">Abhitech Speak Up</p>
              <p className="text-sm text-gray-400">Secure employee feedback and reporting.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/submit" className="transition hover:text-green-400">Submit Report</Link>
            <Link href="/track" className="transition hover:text-green-400">Track Report</Link>
            <a
              href="https://www.abhitech.co.id"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-green-400"
            >
              About Abhitech
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
          © 2026 Abhitech. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
