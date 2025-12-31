export const metadata = {
  title: "Cookie Policy | Waco3",
  description: "Information about how Waco3 uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <div style={{ maxWidth: '900px', padding: '2rem 1.5rem', lineHeight: '1.7', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Cookie Policy</h1>
      <p style={{ color: '#666', marginBottom: '3rem' }}>Last updated: December 29, 2024</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit a website. They are widely used to 
          make websites work more efficiently and provide information to website owners.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>2. Our Approach to Cookies</h2>
        <p>
          Waco3 takes a privacy-first approach. We primarily use <strong>localStorage</strong> instead of traditional cookies 
          for most functionality, which means:
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>No cross-site tracking</li>
          <li>Data stays on your device</li>
          <li>Better privacy protection</li>
          <li>No cookie consent banner required for localStorage</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>3. How We Use localStorage</h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3.1 A/B Testing</h3>
        <p>
          We use localStorage to remember which version of our website you've seen during A/B tests. This ensures 
          a consistent experience across visits.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Storage Key:</strong> <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>waco3_experiment_*</code>
        </p>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3.2 User Preferences</h3>
        <p>
          We store your language preference (English or Spanish) so you don't have to select it every time you visit.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>4. Third-Party Services</h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4.1 Google Analytics</h3>
        <p>
          We use Google Analytics to understand how visitors use our website. Google Analytics may set cookies to collect:
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Pages visited</li>
          <li>Time spent on site</li>
          <li>Device and browser information</li>
          <li>Anonymized IP addresses</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          We have configured Google Analytics with IP anonymization to enhance privacy protection.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Cookie Names:</strong> <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>_ga, _gid, _gat</code>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Learn more: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Google Privacy Policy</a>
        </p>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4.2 Stripe (Payment Processing)</h3>
        <p>
          When you make a payment, Stripe may set cookies for fraud prevention and secure payment processing.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Learn more: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Stripe Privacy Policy</a>
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>5. Types of Data Storage</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '0.75rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Purpose</th>
              <th style={{ textAlign: 'left', padding: '0.75rem 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 0' }}>localStorage</td>
              <td style={{ padding: '0.75rem 0' }}>A/B testing, preferences</td>
              <td style={{ padding: '0.75rem 0' }}>Until cleared</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 0' }}>Google Analytics</td>
              <td style={{ padding: '0.75rem 0' }}>Website analytics</td>
              <td style={{ padding: '0.75rem 0' }}>2 years</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 0' }}>Stripe</td>
              <td style={{ padding: '0.75rem 0' }}>Payment security</td>
              <td style={{ padding: '0.75rem 0' }}>Session</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>6. Managing Your Data</h2>
        
        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>6.1 Clear localStorage</h3>
        <p>You can clear localStorage through your browser settings or developer console:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', overflow: 'auto', marginTop: '0.5rem' }}>
          <code>localStorage.clear()</code>
        </pre>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>6.2 Block or Delete Cookies</h3>
        <p>Most browsers allow you to:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <li>View and delete existing cookies</li>
          <li>Block third-party cookies</li>
          <li>Block all cookies (may affect site functionality)</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>6.3 Opt Out of Google Analytics</h3>
        <p>
          Install the{' '}
          <a 
            href="https://tools.google.com/dlpage/gaoptout" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#3b82f6' }}
          >
            Google Analytics Opt-out Browser Add-on
          </a>
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>7. Do Not Track</h2>
        <p>
          Some browsers support "Do Not Track" (DNT) signals. We respect DNT signals and do not track users when DNT is enabled.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>8. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>9. Contact Us</h2>
        <p>
          If you have questions about our use of cookies or localStorage, please contact us at:{' '}
          <a href="mailto:hello@waco3.io" style={{ color: '#3b82f6' }}>hello@waco3.io</a>
        </p>
      </section>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  );
}
