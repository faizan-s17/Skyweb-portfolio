import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService({ onBack }) {
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
          <h1 className="font-heading font-bold text-4xl text-white mb-4">Terms of Service</h1>
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
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website and the services offered by SkyWeb, including but not limited to UI/UX design, AI automation, lead generation agents, voice AI agents, SEO optimization, and chatbots, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="mt-3">
              If you do not agree to these terms, you must not use this website or our services. SkyWeb reserves the right to update these terms at any time without prior notice. Your continued use of our services constitutes your acceptance of any changes.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
            <p>
              SkyWeb provides digital services including, but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>UI/UX Design and Prototyping</li>
              <li>AI Automation and Integration</li>
              <li>Lead Generation and Marketing Agents</li>
              <li>Appointment Booking and Voice AI Agents</li>
              <li>SEO Optimization and Technical SEO</li>
              <li>Chatbot Development and Deployment</li>
              <li>Consulting and Strategy Services</li>
            </ul>
            <p className="mt-3">
              These services are provided on an as-is basis. The specific scope, deliverables, timeline, and terms of each project are outlined in individual service agreements or proposals.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
            <p>
              By using our services, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Provide accurate, current, and complete information in all interactions</li>
              <li>Maintain the confidentiality of any account credentials or access information</li>
              <li>Use our services only for lawful purposes and in compliance with all applicable laws</li>
              <li>Not violate the rights of third parties or use our services to engage in harmful activities</li>
              <li>Not attempt to gain unauthorized access to our systems or data</li>
              <li>Not reverse engineer, decompile, or attempt to derive the source code of our services</li>
              <li>Not use our services for sending unsolicited communications or spam</li>
              <li>Comply with any other terms outlined in your service agreement or proposal</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.1 SkyWeb Property</h3>
            <p>
              All content, design, code, logos, trademarks, and other intellectual property on the SkyWeb website and related to our marketing materials are owned by SkyWeb or our licensors. You may not reproduce, distribute, or use any of this material without our explicit written permission.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.2 Client Work</h3>
            <p>
              The intellectual property rights for custom work created for you (such as designs, code, strategies) depend on the specific terms outlined in your service agreement. Unless otherwise specified:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>SkyWeb retains ownership of methodologies, tools, and pre-existing materials we use in your project</li>
              <li>You receive ownership or a license to the custom deliverables created specifically for your project</li>
              <li>We may use anonymized or non-confidential aspects of the work for portfolio, case studies, and marketing purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.3 Your Content</h3>
            <p>
              You retain ownership of any content you provide to us. By providing content, you grant SkyWeb a non-exclusive, worldwide, royalty-free license to use, modify, and reproduce it for the purpose of delivering our services.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Payment and Fees</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.1 Pricing</h3>
            <p>
              All fees are outlined in your service agreement, proposal, or invoice. Prices are in GBP (British Pounds) unless otherwise specified.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.2 Payment Terms</h3>
            <p>
              Payment is due according to the terms specified in your agreement (typically 50% upfront, 50% upon completion, or as negotiated). Failure to pay may result in suspension or termination of services.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.3 Invoicing</h3>
            <p>
              Invoices are sent via email. You are responsible for providing accurate billing information and promptly notifying us of any errors.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.4 Refunds</h3>
            <p>
              Refund eligibility depends on the specific circumstances and is outlined in your service agreement. Generally, refunds may be issued for services not rendered or due to our failure to meet agreed-upon deliverables, subject to any applicable fees already incurred.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.5 Late Payments</h3>
            <p>
              Late payments may incur interest charges at a rate of 8% per annum plus the Bank of England base rate, or the maximum rate allowed by law, whichever is lower. We reserve the right to suspend services for overdue accounts.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, SkyWeb shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from or related to your use of our services, even if we have been advised of the possibility of such damages.
            </p>
            <p className="mt-3">
              Our total liability for any claim arising from our services shall not exceed the amount you paid for the specific service in question during the 12 months preceding the claim.
            </p>
            <p className="mt-3">
              Some jurisdictions do not allow the exclusion of consequential damages, so this limitation may not apply to you.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimers</h2>
            <p>
              Our services and website are provided on an "as-is" and "as-available" basis without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Non-infringement of intellectual property rights</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Compatibility with your systems or third-party services</li>
              <li>Specific results or performance metrics</li>
            </ul>
            <p className="mt-3">
              While we strive for accuracy, we do not warrant that all information on our website is accurate, complete, or free of errors. You use our services at your own risk.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Services and Integrations</h2>
            <p>
              Our services may integrate with or depend on third-party platforms, tools, and APIs (such as n8n, Make, Zapier, Retell AI, GPT-4, WhatsApp, and others). We are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Downtime or service interruptions from third-party providers</li>
              <li>Changes in third-party terms, pricing, or functionality</li>
              <li>Data loss or security breaches at third-party services</li>
              <li>Compatibility issues or integration failures</li>
            </ul>
            <p className="mt-3">
              You are responsible for maintaining accounts and agreements with third-party services and complying with their terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any sensitive business information shared during the engagement. However, this does not include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Information that is publicly available or becomes publicly available through no breach of this agreement</li>
              <li>Information required to be disclosed by law or court order</li>
              <li>Information disclosed to our service providers or partners under similar confidentiality obligations</li>
              <li>General methodologies and techniques we use across projects</li>
            </ul>
            <p className="mt-3">
              We may use anonymized information about your project for case studies, portfolio purposes, and marketing, unless you explicitly opt out.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless SkyWeb and its officers, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Your violation of these Terms of Service</li>
              <li>Your misuse of our services</li>
              <li>Infringement of intellectual property rights by your content or use</li>
              <li>Your breach of applicable laws</li>
              <li>Disputes with third parties regarding your use of our services</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">11.1 Termination by You</h3>
            <p>
              You may terminate our engagement by providing written notice as specified in your service agreement. Any applicable fees already paid are non-refundable unless otherwise agreed.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">11.2 Termination by SkyWeb</h3>
            <p>
              We reserve the right to suspend or terminate services if:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>You breach these terms or your service agreement</li>
              <li>Payment is not received within the agreed timeframe</li>
              <li>You engage in illegal or harmful activities</li>
              <li>We determine that providing services would expose us to legal or reputational risk</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">11.3 Effect of Termination</h3>
            <p>
              Upon termination, all rights and obligations end, except for those that by their nature are intended to survive (such as payment obligations, confidentiality, and indemnification).
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">12.1 Governing Law</h3>
            <p>
              These Terms of Service are governed by the laws of England and Wales, without regard to conflicts of law principles.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">12.2 Arbitration</h3>
            <p>
              Any dispute arising from these terms or our services shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes may be referred to arbitration under the rules of LCIA (London Court of International Arbitration).
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">12.3 Jurisdiction</h3>
            <p>
              Both parties consent to the exclusive jurisdiction of the courts of England and Wales for any legal proceedings not resolved through arbitration.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">12.4 Waiver of Class Action</h3>
            <p>
              You waive the right to participate in class actions or class arbitrations against SkyWeb.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Modifications to Services</h2>
            <p>
              SkyWeb reserves the right to modify, suspend, or discontinue services or features at any time, with or without notice. We will make reasonable efforts to provide notice of material changes that affect active projects.
            </p>
            <p className="mt-3">
              Changes to website content, design, or functionality do not entitle clients to refunds or compensation unless such changes directly prevent service delivery.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Limitation of Scope of Work</h2>
            <p>
              The scope of our services is strictly limited to what is outlined in your service agreement or proposal. Any work outside this scope requires a separate written agreement and additional fees. Requests for changes or additions will be evaluated on a case-by-case basis.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Accessibility</h2>
            <p>
              We are committed to making our website and services accessible to all users. If you encounter accessibility issues, please contact us at <a href="mailto:theskyweb.uk@gmail.com" className="text-accent-teal hover:text-accent-teal/80">theskyweb.uk@gmail.com</a>.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Prohibition on Scraping and Automated Access</h2>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Use automated tools to scrape, crawl, or extract data from our website</li>
              <li>Access our website through bots or scripts unless explicitly authorized</li>
              <li>Interfere with the normal operation of our website or services</li>
              <li>Circumvent any authentication or access controls</li>
            </ul>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">17. Performance and Results</h2>
            <p>
              While SkyWeb employs industry best practices and expertise, we do not guarantee specific results such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Search engine rankings or traffic improvements from SEO work</li>
              <li>Conversion rates or sales from design or optimization work</li>
              <li>Leads generated from lead generation agents</li>
              <li>Appointment bookings from scheduling agents</li>
              <li>Specific ROI or business outcomes</li>
            </ul>
            <p className="mt-3">
              Results depend on many factors outside our control, including market conditions, competition, user behavior, and third-party platforms.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">18. Entire Agreement</h2>
            <p>
              These Terms of Service, together with your service agreement, proposal, and any amendments, constitute the entire agreement between you and SkyWeb regarding our services. Any prior agreements, negotiations, or understandings are superseded by this agreement.
            </p>
          </section>

          {/* Section 19 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">19. Severability</h2>
            <p>
              If any provision of these Terms of Service is found to be invalid or unenforceable, that provision shall be removed or modified to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* Section 20 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">20. Contact Information</h2>
            <p>For questions about these Terms of Service or to report violations, please contact us:</p>
            <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
              <p><strong className="text-white">SkyWeb</strong></p>
              <p className="mt-2">
                Email: <a href="mailto:theskyweb.uk@gmail.com" className="text-accent-teal hover:text-accent-teal/80">theskyweb.uk@gmail.com</a>
              </p>
              <p className="mt-1">
                WhatsApp: <a href="https://wa.me/447950328625" target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:text-accent-teal/80">+44 7950 328625</a>
              </p>
              <p className="mt-1">Website: www.skyweb.uk</p>
              <p className="mt-1">GitHub: <a href="https://github.com/skyweb" target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:text-accent-teal/80">github.com/skyweb</a></p>
              <p className="mt-2 text-sm text-white/50">Location: United Kingdom</p>
            </div>
          </section>

          {/* Footer Note */}
          <section className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/40">
              These Terms of Service are effective as of the date listed above and apply to all services provided by SkyWeb. We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of any modifications.
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
