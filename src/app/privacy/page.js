import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Waco3",
  description: "Privacy policy detailing how Waco3 collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '900px', padding: '2rem 1.5rem', lineHeight: '1.7', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>PRIVACY POLICY</h1>

      <p style={{ marginBottom: '0.5rem' }}><strong>Effective Date:</strong> [EFFECTIVE DATE]</p>
      <p style={{ color: '#666', marginBottom: '2rem' }}><strong>Last Updated:</strong> [LAST UPDATED DATE]</p>

      <p style={{ marginBottom: '2rem' }}>
        This Privacy Policy explains how [COMPANY LEGAL NAME] collects, uses, and shares information.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Account details (name, email, login credentials)</li>
          <li>User Content (documents, uploaded assets)</li>
          <li>Usage data (events, page interactions, device data)</li>
          <li>Session replay data (interaction recordings)</li>
          <li>Billing metadata (handled by Stripe)</li>
          <li>Email engagement data (opens, clicks)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. How We Use Information</h2>
        <p>We use information to:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Provide and secure the Service</li>
          <li>Process payments</li>
          <li>Generate documents and AI output</li>
          <li>Improve product functionality</li>
          <li>Send communications</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. AI Processing</h2>
        <p>
          If you use AI features, your prompts and related content are processed to generate outputs using third-party AI providers (such as Google). You remain responsible for AI-generated content.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>4. Session Replay and Analytics</h2>
        <p>We record sessions to diagnose issues and improve usability.</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Session replay data is retained up to 30 days</li>
          <li>Sensitive fields are intended to be excluded where feasible</li>
          <li>You consent to this processing by using the Service</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>5. Sharing of Information</h2>
        <p>We share data with:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Payment processors (Stripe)</li>
          <li>Email providers (SendGrid)</li>
          <li>Analytics and monitoring providers</li>
          <li>Cloud hosting providers (AWS)</li>
        </ul>
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>We do not sell personal information.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>6. Your Rights</h2>
        <p>Depending on location, you may request to:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Access or delete your personal data</li>
          <li>Export certain data</li>
          <li>Opt out of marketing emails</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>Requests can be made at [SUPPORT EMAIL].</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>7. Data Retention</h2>
        <p>
          We retain data only as long as necessary to operate the Service, comply with law, and resolve disputes.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>8. Security</h2>
        <p>We use reasonable technical and organizational safeguards. No system is perfectly secure.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>9. International Users</h2>
        <p>Your data may be processed in the United States.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>10. Children</h2>
        <p>The Service is not intended for users under 18.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>11. Changes</h2>
        <p>We may update this Privacy Policy. Continued use means acceptance.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>12. Contact</h2>
        <p>[COMPANY LEGAL NAME]</p>
        <p>[ADDRESS WITH ZIP CODE AND CITY AND STATE]</p>
        <p>[SUPPORT EMAIL]</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <p><strong>Third-Party Licenses:</strong> [LINK TO THIRD-PARTY LICENSES PAGE]</p>
      </section>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
