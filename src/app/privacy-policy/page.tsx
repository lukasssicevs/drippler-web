import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Drippler",
  description: "Privacy Policy for Drippler - Your Digital Wardrobe Assistant",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-purple-300/60">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-black/40 backdrop-blur-sm rounded-[30px] md:rounded-[40px] p-6 md:p-8 lg:p-12 outline outline-1 outline-offset-[-1px] outline-zinc-900/50">
          <div className="max-w-none space-y-8 md:space-y-10">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Introduction
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Welcome to Drippler (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;). This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our
                digital wardrobe assistant service, including our browser
                extension and web application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Information We Collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-violet-300 mb-3 md:mb-4">
                    Personal Information
                  </h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-300 text-base md:text-lg leading-relaxed space-y-2">
                    <li>
                      Email address (for account creation and authentication)
                    </li>
                    <li>Profile information (name, preferences)</li>
                    <li>Avatar images you upload</li>
                    <li>Clothing images you save to your wardrobe</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-violet-300 mb-3 md:mb-4">
                    Usage Information
                  </h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-300 text-base md:text-lg leading-relaxed space-y-2">
                    <li>Pages you visit while using our extension</li>
                    <li>Images you interact with</li>
                    <li>Features you use within our service</li>
                    <li>Technical information about your device and browser</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-300 text-base md:text-lg leading-relaxed space-y-2">
                <li>Provide and maintain our digital wardrobe service</li>
                <li>Generate virtual try-on images using AI technology</li>
                <li>Store and organize your clothing items and outfits</li>
                <li>Authenticate your account and ensure security</li>
                <li>Improve our services and develop new features</li>
                <li>
                  Communicate with you about your account and our services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Data Storage and Security
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  We use industry-standard security measures to protect your
                  personal information. Your data is stored securely using
                  Supabase infrastructure with encryption in transit and at
                  rest.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Images and personal data are stored securely in the cloud and
                  are only accessible to you through your authenticated account.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Third-Party Services
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  We use the following third-party services to provide our
                  functionality:
                </p>
                <ul className="list-disc pl-6 text-gray-300 text-base md:text-lg leading-relaxed space-y-2">
                  <li>
                    <strong className="text-violet-300">Supabase:</strong> For
                    authentication and data storage
                  </li>
                  <li>
                    <strong className="text-violet-300">
                      Google Gemini AI:
                    </strong>{" "}
                    For virtual try-on generation
                  </li>
                  <li>
                    <strong className="text-violet-300">Stripe:</strong> For
                    payment processing (if applicable)
                  </li>
                </ul>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  These services have their own privacy policies and we
                  encourage you to review them.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Your Rights
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-300 text-base md:text-lg leading-relaxed space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data</li>
                  <li>Opt-out of certain communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Data Retention
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                We retain your personal information only as long as necessary to
                provide our services and fulfill the purposes outlined in this
                privacy policy. You can delete your account at any time, which
                will remove your personal data from our systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Browser Extension Permissions
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Our browser extension requires certain permissions to
                  function:
                </p>
                <ul className="list-disc pl-6 text-gray-300 text-base md:text-lg leading-relaxed space-y-2">
                  <li>
                    <strong className="text-violet-300">Active Tab:</strong> To
                    detect clothing images on websites you visit
                  </li>
                  <li>
                    <strong className="text-violet-300">Storage:</strong> To
                    store your preferences and cache data locally
                  </li>
                  <li>
                    <strong className="text-violet-300">
                      Host Permissions:
                    </strong>{" "}
                    To interact with websites and save images to your wardrobe
                  </li>
                </ul>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  We only access and process information when you actively use
                  our extension features.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Changes to This Policy
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new privacy policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6">
                Contact Us
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="bg-zinc-900/40 rounded-[20px] p-4 md:p-6 border border-purple-500/20">
                  <p className="text-gray-300 text-base md:text-lg">
                    Email:{" "}
                    <a
                      href="mailto:privacy@drippler.com"
                      className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-2"
                    >
                      drippler.support@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
