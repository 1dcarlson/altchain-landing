import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-primary mb-8">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the AltChain website and services. Please read these Terms carefully before using our services.
              </p>
              <p>
                By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">2. Waitlist Registration</h2>
              <p>
                By registering for our waitlist, you agree to receive periodic updates about our services, launch dates, and related information. We will use the email address you provide to communicate with you about AltChain services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">3. Communications</h2>
              <p>
                By providing your email address and signing up for our waitlist, you consent to receive communications from us electronically. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
              <p>
                Our service and its original content, features, and functionality are and will remain the exclusive property of AltChain and its licensors. Our service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AltChain.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">5. Links To Other Web Sites</h2>
              <p>
                Our service may contain links to third-party web sites or services that are not owned or controlled by AltChain.
              </p>
              <p>
                AltChain has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that AltChain shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">6. Termination</h2>
              <p>
                We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">7. Disclaimer</h2>
              <p>
                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
              <p>
                In no event shall AltChain, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">10. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@altchain.com
              </p>
            </section>
          </div>
          
          <p className="mt-10 text-sm text-gray-500">
            Last updated: April 13, 2025
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}