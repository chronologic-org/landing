import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm mb-16">Last updated: February 16, 2026</p>

        <div className="space-y-10 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Sckry Inc. (&ldquo;Sckry,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at sckry.com and any associated applications (collectively, the &ldquo;Service&rdquo;). Please read this policy carefully. By using the Service, you consent to the practices described herein.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Information We Collect</h2>

            <h3 className="font-medium text-gray-800 mt-4 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
              <li><strong>Profile Information:</strong> Professional title, company, industry, and other details you choose to provide</li>
              <li><strong>Contact Data:</strong> Professional contacts and network information you import or manually add to the Service</li>
              <li><strong>Payment Information:</strong> Billing address and payment method details, processed securely by our third-party payment processor</li>
              <li><strong>Communications:</strong> Messages you send to us, including support requests and feedback</li>
            </ul>

            <h3 className="font-medium text-gray-800 mt-4 mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Usage Data:</strong> Pages visited, features used, search queries, clicks, and time spent on the Service</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution</li>
              <li><strong>Log Data:</strong> IP address, access times, referring URLs, and error logs</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies, pixels, and local storage to operate and improve the Service (see Section 7)</li>
            </ul>

            <h3 className="font-medium text-gray-800 mt-4 mb-2">2.3 Information from Third Parties</h3>
            <p>
              If you connect third-party accounts (e.g., LinkedIn, Google), we may receive profile information and contact data in accordance with the permissions you grant and the third party&rsquo;s privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Provide, operate, and maintain the Service</li>
              <li>Create and manage your account</li>
              <li>Process your network data to generate visualizations, search results, and relationship insights</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send transactional communications (account confirmations, security alerts, billing notices)</li>
              <li>Send product updates and marketing communications (with your consent, where required)</li>
              <li>Analyze usage patterns to improve and develop new features</li>
              <li>Detect, prevent, and address fraud, abuse, and security issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. How We Share Your Information</h2>
            <p className="mb-3">We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who perform services on our behalf (hosting, analytics, payment processing, email delivery), subject to confidentiality obligations</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request</li>
              <li><strong>Safety and Protection:</strong> To protect the rights, property, or safety of Sckry, our users, or the public</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of assets, in which case your information may be transferred as part of the transaction</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information with a third party</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by law or for legitimate business purposes (such as resolving disputes or enforcing our agreements).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard technical and organizational measures to protect your information, including encryption in transit (TLS) and at rest, access controls, and regular security assessments. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Cookies and Tracking Technologies</h2>
            <p className="mb-3">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Essential Cookies:</strong> Required for the Service to function (authentication, security)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Service so we can improve it</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="mt-3">
              You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Your Rights and Choices</h2>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a machine-readable copy of your data</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time using the link in each email</li>
              <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at <a href="mailto:privacy@sckry.com" className="text-[#5885ec] hover:underline">privacy@sckry.com</a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer data internationally, we implement appropriate safeguards, such as standard contractual clauses, to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Children&rsquo;s Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete it promptly. If you believe a child has provided us with personal information, please contact us at <a href="mailto:privacy@sckry.com" className="text-[#5885ec] hover:underline">privacy@sckry.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">11. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to request deletion, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your CCPA rights, contact us at <a href="mailto:privacy@sckry.com" className="text-[#5885ec] hover:underline">privacy@sckry.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">12. European Privacy Rights (GDPR)</h2>
            <p>
              If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have rights under the General Data Protection Regulation (GDPR), including the rights described in Section 8. Our legal bases for processing your data include performance of a contract, legitimate interests, and your consent. You also have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by updating the date at the top of this policy and, where appropriate, providing additional notice. Your continued use of the Service after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">14. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-3 text-gray-700">
              <p className="font-medium">Sckry Inc.</p>
              <p>Email: <a href="mailto:privacy@sckry.com" className="text-[#5885ec] hover:underline">privacy@sckry.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
