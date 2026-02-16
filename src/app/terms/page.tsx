import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-12">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to home
        </a>

        <h1
          className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2"
          style={{ fontFamily: '"HelveticaNeueLTPro-Bd", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Terms of Service
        </h1>
        <p className="text-gray-400 text-sm mb-16">Last updated: February 16, 2026</p>

        <div className="space-y-10 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by Sckry Inc. (&ldquo;Sckry,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), including our website at sckry.com and any associated applications (collectively, the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              Sckry provides an AI-powered platform that allows users to visualize, search, and manage their professional networks. The Service may include features such as contact importing, network graph visualization, AI-powered search, and relationship intelligence tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Eligibility</h2>
            <p>
              You must be at least 18 years of age to use the Service. By using the Service, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Account Registration</h2>
            <p>
              To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. User Data and Content</h2>
            <p>
              You retain ownership of any data, contacts, or content you provide to the Service (&ldquo;User Content&rdquo;). By submitting User Content, you grant Sckry a limited, non-exclusive, worldwide license to process, store, and display your User Content solely for the purpose of providing and improving the Service. We will not sell your User Content to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Use the Service for any unlawful purpose or in violation of any applicable law or regulation</li>
              <li>Scrape, harvest, or collect data from the Service through automated means without our written consent</li>
              <li>Attempt to gain unauthorized access to any part of the Service, other accounts, or systems</li>
              <li>Upload or transmit viruses, malware, or any other malicious code</li>
              <li>Use the Service to send unsolicited communications, spam, or bulk messages</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Resell, sublicense, or redistribute the Service without our prior written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Subscription and Payments</h2>
            <p>
              Certain features of the Service may require a paid subscription. By purchasing a subscription, you agree to pay the applicable fees as described at the time of purchase. Subscriptions automatically renew at the end of each billing period unless canceled before the renewal date. Fees are non-refundable except as required by law or as expressly stated in these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Intellectual Property</h2>
            <p>
              The Service, including its design, code, features, logos, and trademarks, is owned by Sckry Inc. and is protected by copyright, trademark, and other intellectual property laws. These Terms do not grant you any right, title, or interest in the Service except for the limited right to use it in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Third-Party Services</h2>
            <p>
              The Service may integrate with or contain links to third-party services. We are not responsible for the content, privacy policies, or practices of any third-party services. Your use of third-party services is at your own risk and subject to the terms of those services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. SCKRY DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">11. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCKRY INC., ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO SCKRY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Sckry Inc. and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">13. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service ceases immediately. You may delete your account at any time through the Service settings. Sections that by their nature should survive termination will survive, including ownership, warranty disclaimers, indemnification, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">14. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we will notify you by updating the date at the top of these Terms and, where appropriate, providing additional notice (such as via email or in-app notification). Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">16. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@sckry.com" className="text-[#5885ec] hover:underline">legal@sckry.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
