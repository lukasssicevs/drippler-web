import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Drippler",
  description: "Privacy Policy for Drippler - Your Digital Wardrobe Assistant",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-400 mb-8">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-sm text-gray-500 mb-6">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to Drippler (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our digital
            wardrobe assistant service, including our browser extension and web
            application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Information We Collect
          </h2>

          <h3 className="text-xl font-medium text-gray-600 mb-3">
            Personal Information
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Email address (for account creation and authentication)</li>
            <li>Profile information (name, preferences)</li>
            <li>Avatar images you upload</li>
            <li>Clothing images you save to your wardrobe</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-600 mb-3">
            Usage Information
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Pages you visit while using our extension</li>
            <li>Images you interact with</li>
            <li>Features you use within our service</li>
            <li>Technical information about your device and browser</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Provide and maintain our digital wardrobe service</li>
            <li>Generate virtual try-on images using AI technology</li>
            <li>Store and organize your clothing items and outfits</li>
            <li>Authenticate your account and ensure security</li>
            <li>Improve our services and develop new features</li>
            <li>Communicate with you about your account and our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Data Storage and Security
          </h2>
          <p className="text-gray-600 mb-4">
            We use industry-standard security measures to protect your personal
            information. Your data is stored securely using Supabase
            infrastructure with encryption in transit and at rest.
          </p>
          <p className="text-gray-600 mb-4">
            Images and personal data are stored securely in the cloud and are
            only accessible to you through your authenticated account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Third-Party Services
          </h2>
          <p className="text-gray-600 mb-4">
            We use the following third-party services to provide our
            functionality:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>
              <strong>Supabase:</strong> For authentication and data storage
            </li>
            <li>
              <strong>Google Gemini AI:</strong> For virtual try-on generation
            </li>
            <li>
              <strong>Stripe:</strong> For payment processing (if applicable)
            </li>
          </ul>
          <p className="text-gray-600 mb-4">
            These services have their own privacy policies and we encourage you
            to review them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and associated data</li>
            <li>Export your data</li>
            <li>Opt-out of certain communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Data Retention
          </h2>
          <p className="text-gray-600 mb-4">
            We retain your personal information only as long as necessary to
            provide our services and fulfill the purposes outlined in this
            privacy policy. You can delete your account at any time, which will
            remove your personal data from our systems.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Browser Extension Permissions
          </h2>
          <p className="text-gray-600 mb-4">
            Our browser extension requires certain permissions to function:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>
              <strong>Active Tab:</strong> To detect clothing images on websites
              you visit
            </li>
            <li>
              <strong>Storage:</strong> To store your preferences and cache data
              locally
            </li>
            <li>
              <strong>Host Permissions:</strong> To interact with websites and
              save images to your wardrobe
            </li>
          </ul>
          <p className="text-gray-600 mb-4">
            We only access and process information when you actively use our
            extension features.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="text-gray-600">Email: privacy@drippler.com</p>
        </section>
      </div>
    </div>
  );
}
