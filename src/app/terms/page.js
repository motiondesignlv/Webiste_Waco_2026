import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Waco3",
  description: "Terms and conditions for using Waco3 AI proposal creation platform.",
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '900px', padding: '2rem 1.5rem', lineHeight: '1.7', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>TERMS AND CONDITIONS (TERMS OF SERVICE)</h1>

      <p style={{ marginBottom: '0.5rem' }}><strong>Effective Date:</strong> [EFFECTIVE DATE]</p>
      <p style={{ color: '#666', marginBottom: '2rem' }}><strong>Last Updated:</strong> [LAST UPDATED DATE]</p>

      <p style={{ marginBottom: '1.5rem' }}>
        These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;you,&quot; &quot;User&quot;) and [COMPANY LEGAL NAME] (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), located at [ADDRESS WITH ZIP CODE AND CITY AND STATE], governing your access to and use of our invoice, quote, and proposal creation platform and related services (collectively, the &quot;Service&quot;).
      </p>

      <p style={{ marginBottom: '2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
        BY CREATING AN ACCOUNT, STARTING A TRIAL, OR USING THE SERVICE, YOU AGREE TO THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SERVICE.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Eligibility (Adults Only)</h2>
        <p>
          You must be 18 years or older to use the Service. By using the Service, you represent that you are at least 18 and legally capable of entering into a binding contract.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Accounts, Teams, and Responsibility</h2>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Account Owner</h3>
        <p>
          The individual or entity that creates the account is the Account Owner. The Account Owner is responsible for all activity under the account.
        </p>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Teams and Authorized Users</h3>
        <p>If the Service allows multiple users:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>The Account Owner may invite team members (&quot;Authorized Users&quot;).</li>
          <li>The Account Owner represents and warrants they have authority to add and manage Authorized Users.</li>
          <li>All actions taken by Authorized Users are deemed actions of the Account Owner.</li>
          <li>The Account Owner is financially and legally responsible for all usage, content, and activity under the account.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Security</h3>
        <p>
          You are responsible for maintaining the confidentiality of your login credentials. You must notify us immediately at [SUPPORT EMAIL] if you suspect unauthorized access.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Free Trial, Billing, Auto-Renewal, and Taxes</h2>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Free Trial (Card Required)</h3>
        <p>We may offer a free trial to new users. A valid payment method is required at trial start.</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>The trial length will be disclosed at signup or within the Service.</li>
          <li>If you do not cancel before the trial ends, your subscription will automatically convert to a paid subscription, and your payment method will be charged at the applicable rate.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Subscription and Auto-Renewal</h3>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Subscriptions renew automatically at the end of each billing period unless canceled.</li>
          <li>You may cancel at any time through your account settings or by contacting [SUPPORT EMAIL].</li>
          <li>Canceling prevents future charges but does not refund fees already paid.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Payments</h3>
        <p>Payments are processed by Stripe. We do not store full payment card details.</p>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Failed Payments</h3>
        <p>If a charge fails, we may suspend or restrict access until payment is resolved.</p>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Refunds</h3>
        <p>Fees are non-refundable, except where required by law.</p>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.25rem' }}>Taxes</h3>
        <p>You are responsible for any applicable taxes or government charges unless we are legally required to collect them.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Use the Service for unlawful purposes.</li>
          <li>Upload or generate content that is illegal, infringing, defamatory, obscene, or harmful.</li>
          <li>Misuse AI features to produce prohibited or abusive content.</li>
          <li>Reverse engineer, bypass security measures, or interfere with Service operation.</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>We may suspend or terminate access for violations.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>5. User Content and Document Sharing</h2>
        <p>You retain ownership of content you create or upload (&quot;User Content&quot;).</p>
        <p style={{ marginTop: '1rem' }}>
          You grant us a limited, non-exclusive, worldwide, royalty-free license to host, process, and display User Content solely to operate and improve the Service.
        </p>
        <p style={{ marginTop: '1rem' }}>If you share documents:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>You are responsible for ensuring you have the right to share them.</li>
          <li>We may provide engagement analytics (views, interactions, timestamps) related to shared documents.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>6. AI Features (Important Disclaimers)</h2>
        <p>The Service includes AI-powered features.</p>
        <p style={{ marginTop: '1rem' }}>You acknowledge and agree:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>AI-generated content may be inaccurate or incomplete.</li>
          <li>AI output does not constitute legal, financial, or professional advice.</li>
          <li>You are solely responsible for reviewing and approving AI-generated content before use.</li>
          <li>We make no guarantees regarding accuracy, originality, or suitability of AI output.</li>
          <li>You assume all risk arising from reliance on AI-generated content.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>7. Session Recording and Analytics</h2>
        <p>We use analytics and session replay technologies to improve performance, security, and usability.</p>
        <p style={{ marginTop: '1rem' }}>
          By using the Service, you consent to the collection of interaction data, including session recordings, as described in our Privacy Policy.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>8. Communications</h2>
        <p>We may send:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Transactional and administrative communications (required).</li>
          <li>Marketing communications (you may opt out of marketing at any time).</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>9. Third-Party Services and Licenses</h2>
        <p>The Service relies on third-party services (e.g., Stripe, SendGrid, AWS, Google AI, analytics tools).</p>
        <p style={{ marginTop: '1rem' }}>
          Third-Party Licenses and Notices are available here: [LINK TO THIRD-PARTY LICENSES PAGE]
        </p>
        <p style={{ marginTop: '1rem' }}>Your use of third-party services may be subject to their terms.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>10. Intellectual Property</h2>
        <p>We own all rights to the Service, excluding User Content. No rights are granted except as expressly stated.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>11. Suspension and Termination</h2>
        <p>We may suspend or terminate access for violations, security risks, or legal compliance.</p>
        <p style={{ marginTop: '1rem' }}>Upon termination:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Access ends immediately.</li>
          <li>You may request a data export within 30 days.</li>
          <li>Data may then be deleted per our retention policies.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>12. Disclaimers</h2>
        <p style={{ fontWeight: 'bold' }}>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>13. Limitation of Liability</h2>
        <p style={{ fontWeight: 'bold' }}>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR SPECIAL DAMAGES.</li>
          <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>14. Indemnification</h2>
        <p>You agree to indemnify and hold harmless the Company from claims arising out of:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Your use of the Service</li>
          <li>Your content</li>
          <li>Your violation of these Terms or third-party rights</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>15. DMCA Notice</h2>
        <p><strong>DMCA Agent:</strong> [DMCA AGENT NAME]</p>
        <p><strong>Email:</strong> [DMCA EMAIL]</p>
        <p><strong>Address:</strong> [DMCA ADDRESS]</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>16. Governing Law and Venue</h2>
        <p>
          These Terms are governed by Florida law. Any dispute must be brought in state or federal courts located in [COUNTY], Florida.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>17. Changes</h2>
        <p>We may update these Terms. Continued use after changes means acceptance.</p>
      </section>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}
