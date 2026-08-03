import Link from 'next/link'
import Image from 'next/image'
import { Shield, Lock, CheckCircle2, Eye, Settings } from 'lucide-react'

export const metadata = {
  title: 'Speak Up - Abhitech Whistleblowing System',
  description: 'Anonymous, secure, and protected whistleblowing platform by Abhitech',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="border-b border-green-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Abhitech-WKYuLp4lUYbxjEWZoDP9cQw60WckgV.webp"
              alt="Abhitech Logo"
              width={40}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
            <div className="hidden sm:block">
              <span className="text-lg sm:text-xl font-bold text-green-900">Abhitech</span>
              <p className="text-xs text-green-600">Speak Up</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/track" className="text-gray-700 hover:text-green-700 font-semibold text-sm sm:text-base transition">
              Track Report
            </Link>
            <Link href="/admin/login" className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-700" title="Admin Panel">
              <Settings className="w-5 h-5" />
            </Link>
            <Link href="/submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition text-sm sm:text-base">
              Submit Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Speak Up, Be Heard, Stay Safe
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A secure and confidential channel to share employee feedback, suggestions, concerns, complaints, or suspected misconduct—with options to report openly, confidentially, or anonymously, and protection from retaliation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition text-center text-sm sm:text-base">
              Submit Report
            </Link>
            <Link href="/track" className="border border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700 px-6 sm:px-8 py-3 rounded-lg font-semibold transition text-center text-sm sm:text-base">
              Track Report
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-xl border border-green-200 p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Completely Confidential</h3>
            <p className="text-gray-600 text-sm sm:text-base">Your information is encrypted and protected. Choose to submit anonymously with full privacy guarantee.</p>
          </div>

          <div className="bg-white rounded-xl border border-yellow-200 p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Zero Retaliation Policy</h3>
            <p className="text-gray-600 text-sm sm:text-base">We strictly enforce anti-retaliation measures. Report concerns without fear of negative consequences.</p>
          </div>

          <div className="bg-white rounded-xl border border-emerald-200 p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Track Your Report</h3>
            <p className="text-gray-600 text-sm sm:text-base">Monitor the status of your report in real-time. Receive updates throughout the investigation process.</p>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="bg-white rounded-lg border border-gray-200 p-12 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: '1', title: 'Report', desc: 'Submit your concern securely through our platform' },
              { num: '2', title: 'Review', desc: 'Our team reviews your report carefully' },
              { num: '3', title: 'Investigate', desc: 'We investigate thoroughly and professionally' },
              { num: '4', title: 'Update', desc: 'You receive regular updates on progress' },
              { num: '5', title: 'Resolve', desc: 'Matter is resolved and documented' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report Categories */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">What You Can Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Workplace Harassment',
              'Discrimination',
              'Safety Violations',
              'Financial Misconduct',
              'Code of Conduct Violations',
              'Management Abuse',
              'Unethical Behavior',
              'Policy Violations',
            ].map((category) => (
              <div key={category} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3 hover:shadow-md transition">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Ready to Share Your Concerns?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of employees who have securely reported concerns through our trusted platform. Your voice matters.
          </p>
          <Link href="/submit" className="inline-block bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition text-sm sm:text-base">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-200 bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Abhitech-WKYuLp4lUYbxjEWZoDP9cQw60WckgV.webp"
                  alt="Abhitech"
                  width={30}
                  height={30}
                  className="h-8 w-auto"
                />
                <span className="font-bold text-white text-sm sm:text-base">Abhitech</span>
              </div>
              <p className="text-xs sm:text-sm">Speak Up System - Your voice matters.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/submit" className="hover:text-green-400 transition">Submit Report</Link></li>
                <li><Link href="/track" className="hover:text-green-400 transition">Track Report</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="https://www.abhitech.co.id" className="hover:text-green-400 transition">About Abhitech</a></li>
                <li><Link href="/" className="hover:text-green-400 transition">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>Email: support@abhitech.co.id</li>
                <li>24/7 Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-xs sm:text-sm text-gray-400">
              © 2026 Abhitech. All Rights Reserved. Speak Up, Be Heard, Stay Safe.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
