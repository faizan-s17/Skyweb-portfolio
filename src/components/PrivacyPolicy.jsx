import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy({ onBack }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-bg-primary min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-accent-teal hover:text-accent-teal/80 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading font-bold text-4xl text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-lg">Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8 text-white/70 leading-relaxed"
        >
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              SkyWeb ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, www.skyweb.uk, and use our services, including but not limited to UI/UX design, AI automation, SEO optimization, chatbots, and AI-powered agent services.
            </p>
            <p className="mt-3">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.1 Information Provided Directly by You</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and mailing address</li>
              <li><strong>Communication Data:</strong> Messages, inquiries, and feedback you send through our contact forms, email, WhatsApp, or other communication channels</li>
              <li><strong>Project Information:</strong> Details about your business, requirements, and preferences relevant to our services</li>
              <li><strong>Payment Information:</strong> Billing details, transaction history, and payment methods (processed securely through third-party providers)</li>
              <li><strong>Account Information:</strong> Passwords, usernames, and profile data if you create an account with us</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your browsing experience and gather analytics data</li>
              <li><strong>Device Information:</strong> IP address, browser type, device type, operating system, and referral source</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, clicks, scroll depth, and interaction patterns</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address (not precise location unless you provide it)</li>
              <li><strong>Analytics:</strong> We use tools like Google Analytics and Vercel Speed Insights to understand user behavior</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.3 Third-Party Information</h3>
            <p>We may receive information about you from third parties, including business partners, service providers, and publicly available sources, to verify information and enhance our services.</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your inquiries and customer service requests</li>
              <li>Sending marketing and promotional communications (with your consent)</li>
              <li>Conducting research, analytics, and understanding user preferences</li>
              <li>Detecting, preventing, and addressing fraud, security issues, and technical problems</li>
              <li>Complying with legal obligations and enforcing our agreements</li>
              <li>Personalizing your experience and delivering targeted content</li>
              <li>Improving our website functionality and user interface</li>
              <li>Creating de-identified and aggregated data for business purposes</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. However, we may share information in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.1 Service Providers</h3>
            <p>We share information with trusted third-party service providers who perform services on our behalf, including hosting providers, payment processors, analytics services, CRM platforms, and communication tools.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.2 Business Partners</h3>
            <p>We may share information with business partners to provide integrated services, with your consent.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.3 Legal Requirements</h3>
            <p>We may disclose information when required by law, court order, government request, or to protect the rights, privacy, safety, or property of SkyWeb, our users, or the public.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.4 Business Transfers</h3>
            <p>If SkyWeb is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.5 With Your Consent</h3>
            <p>We may share your information for other purposes with your explicit consent or at your direction.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p>
              We implement comprehensive security measures to protect your personal information, including encryption, secure servers, access controls, and regular security audits. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, and you provide information at your own risk.
            </p>
            <p className="mt-3">
              If we experience a data breach that compromises your personal information, we will notify you as required by applicable law.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Data Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate information</li>
              <li><strong>Right to Erasure:</strong> You can request deletion of your data (subject to legal obligations)</li>
              <li><strong>Right to Restrict Processing:</strong> You can request that we limit how we use your information</li>
              <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
              <li><strong>Right to Object:</strong> You can object to certain types of processing</li>
              <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at <a href="mailto:theskyweb.uk@gmail.com" className="text-accent-teal hover:text-accent-teal/80">theskyweb.uk@gmail.com</a>.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, web beacons, and similar tracking technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Track user behavior and site performance</li>
              <li><strong>Marketing Cookies:</strong> Used for targeted advertising and remarketing</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect website functionality.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Marketing Communications</h2>
            <p>
              We may send you promotional emails, newsletters, and updates about our services. You can opt out of these communications by clicking the "unsubscribe" link in any email or by contacting us directly. Please note that even if you opt out of marketing, we will still send you transactional emails related to your account or services.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, including GitHub, Instagram, WhatsApp, and Upwork. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will delete such information and terminate the child's account.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. International Data Transfers</h2>
            <p>
              We are a UK-based company, and your information may be transferred to, stored in, and processed in countries other than your country of residence. By using our services, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. The retention period varies depending on the context and purpose of processing. When information is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Know what personal information is collected, used, and shared</li>
              <li>Delete personal information collected from you</li>
              <li>Opt-out of the sale of your personal information</li>
              <li>Non-discrimination for exercising your rights</li>
            </ul>
            <p className="mt-3">
              To submit a request, contact us at <a href="mailto:theskyweb.uk@gmail.com" className="text-accent-teal hover:text-accent-teal/80">theskyweb.uk@gmail.com</a>.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. GDPR Compliance</h2>
            <p>
              For users in the European Economic Area, we comply with the General Data Protection Regulation (GDPR). Your personal data is processed only with a valid legal basis, including your consent, contract performance, legal obligation, or our legitimate interests. You have the rights outlined in Section 6 above.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of material changes by updating the "Last Updated" date and, in some cases, by sending you a notification. Your continued use of our services constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
              <p><strong className="text-white">SkyWeb</strong></p>
              <p className="mt-2">
                Email: <a href="mailto:theskyweb.uk@gmail.com" className="text-accent-teal hover:text-accent-teal/80">theskyweb.uk@gmail.com</a>
              </p>
              <p className="mt-1">
                WhatsApp: <a href="https://wa.me/447950328625" target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:text-accent-teal/80">+44 7950 328625</a>
              </p>
              <p className="mt-1">Website: www.skyweb.uk</p>
              <p className="mt-2 text-sm text-white/50">Location: United Kingdom</p>
            </div>
          </section>

          {/* Footer Note */}
          <section className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/40">
              This Privacy Policy is effective as of the date listed above. We will make reasonable efforts to update this policy to reflect changes in our practices and applicable law.
            </p>
          </section>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="mt-12 w-full py-3 px-6 bg-accent-teal/10 border border-accent-teal/30 rounded-lg text-accent-teal hover:bg-accent-teal/20 hover:border-accent-teal/50 transition-all duration-300"
        >
          Back to Top
        </motion.button>
      </div>
    </div>
  )
}
