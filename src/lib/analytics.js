/**
 * Google Analytics 4 Event Tracking Utilities
 * 
 * Client-side analytics tracking for static export deployment.
 * All functions are safe to call before gtag is loaded.
 */

/**
 * Track a custom event in Google Analytics 4
 * @param {string} eventName - The name of the event (e.g., 'button_click', 'form_submit')
 * @param {Object} parameters - Event parameters (optional)
 */
export function trackEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined') return;
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  } else {
    console.warn('Google Analytics not loaded yet. Event queued:', eventName);
  }
}

/**
 * Track button click events
 * @param {string} buttonLabel - The text or label of the button
 * @param {Object} options - Additional options
 * @param {string} options.category - Category of the button (e.g., 'cta', 'navigation')
 * @param {string} options.destination - Where the button leads (URL or anchor)
 * @param {string} options.variant - Button variant (e.g., 'primary', 'secondary')
 */
export function trackButtonClick(buttonLabel, options = {}) {
  const { category = 'general', destination = '', variant = '' } = options;
  
  trackEvent('button_click', {
    button_label: buttonLabel,
    button_category: category,
    button_destination: destination,
    button_variant: variant,
  });
}

/**
 * Track link click events
 * @param {string} linkText - The text of the link
 * @param {string} url - The destination URL
 * @param {string} category - Category of the link (e.g., 'footer', 'navigation')
 */
export function trackLinkClick(linkText, url, category = 'link') {
  trackEvent('link_click', {
    link_text: linkText,
    link_url: url,
    link_category: category,
  });
}

/**
 * Track form submission events
 * @param {string} formName - The name/identifier of the form
 * @param {boolean} success - Whether the submission was successful
 * @param {string} errorMessage - Error message if submission failed (optional)
 */
export function trackFormSubmit(formName, success, errorMessage = '') {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    error_message: errorMessage,
  });
}

/**
 * Track page view events (useful for SPA navigation)
 * @param {string} pageTitle - The title of the page
 * @param {string} pagePath - The path of the page
 */
export function trackPageView(pageTitle, pagePath) {
  if (typeof window === 'undefined') return;
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
    });
  }
}

/**
 * Set a user property in Google Analytics
 * @param {string} propertyName - The name of the user property
 * @param {any} value - The value of the user property
 */
export function setUserProperty(propertyName, value) {
  if (typeof window === 'undefined') return;
  
  if (typeof window.gtag === 'function') {
    window.gtag('set', 'user_properties', {
      [propertyName]: value,
    });
  }
}

/**
 * Track scroll depth
 * @param {number} percentage - Scroll depth percentage (25, 50, 75, 100)
 */
export function trackScrollDepth(percentage) {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
  });
}
