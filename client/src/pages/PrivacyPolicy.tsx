import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                Welcome to AltChain ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              <p>
                <strong>Personal Data:</strong> When you sign up for our waitlist, we collect your email address. This information is used to keep you updated about our services and launch date.
              </p>
              <p>
                <strong>Usage Data:</strong> We may also collect information on how the website is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (IP address), browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide and maintain our service</li>
                <li>Notify you about changes to our service</li>
                <li>Provide customer support</li>
                <li>Monitor the usage of our service</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Provide you with news, special offers, and general information about other goods, services, and events which we offer</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">4. Email Communications</h2>
              <p>
                If you decide to opt-in to our mailing list, you will receive emails that may include company news, updates, related product or service information, etc. We may use third-party service providers to help us operate our business and the site or administer activities on our behalf, such as sending out newsletters or surveys.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">5. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">6. Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">7. Service Providers</h2>
              <p>
                We may employ third-party companies and individuals to facilitate our service ("Service Providers"), to provide the service on our behalf, to perform service-related services, or to assist us in analyzing how our service is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
              <p>
                Our Service Providers include:
              </p>
              <ul>
                <li>SendGrid for email communications</li>
                <li>Database service providers for storing waitlist information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">8. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul>
                <li>The right to access, update, or delete the information we have on you</li>
                <li>The right of rectification - the right to have your information corrected</li>
                <li>The right to object - the right to object to our processing of your personal data</li>
                <li>The right of restriction - the right to request that we restrict the processing of your personal information</li>
                <li>The right to data portability - the right to be provided with a copy of your personal information in a structured, machine-readable, and commonly used format</li>
                <li>The right to withdraw consent - the right to withdraw your consent at any time</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@altchain.com
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