/**
 * A/B Testing Utilities using localStorage
 * 
 * Implements client-side variant assignment with localStorage persistence.
 * Compatible with static export deployment.
 */

import { setUserProperty } from './analytics';

const STORAGE_PREFIX = 'waco3_experiment_';
const STORAGE_EXPIRY_SUFFIX = '_expiry';

/**
 * Get or assign a variant for an A/B test experiment
 * @param {string} experimentName - The name of the experiment (e.g., 'hero_copy')
 * @param {Array<string>} variants - Array of variant names (e.g., ['control', 'variant_a'])
 * @param {Object} options - Additional options
 * @param {Array<number>} options.weights - Weight distribution for variants (e.g., [70, 30] for 70/30 split)
 * @returns {string} The assigned variant
 */
export function getVariant(experimentName, variants, options = {}) {
  if (typeof window === 'undefined') return variants[0];
  
  const { weights = null } = options;
  const storageKey = STORAGE_PREFIX + experimentName;
  
  // Try to get existing variant from localStorage
  try {
    const existingVariant = localStorage.getItem(storageKey);
    if (existingVariant && variants.includes(existingVariant)) {
      return existingVariant;
    }
  } catch (error) {
    console.warn('localStorage not available, using session-based variant:', error);
    // Fallback to sessionStorage for Safari private mode
    try {
      const existingVariant = sessionStorage.getItem(storageKey);
      if (existingVariant && variants.includes(existingVariant)) {
        return existingVariant;
      }
    } catch (sessionError) {
      // If both fail, proceed with random assignment without persistence
    }
  }
  
  // Assign new variant
  let selectedVariant;
  
  if (weights && weights.length === variants.length) {
    // Weighted random selection
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < variants.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedVariant = variants[i];
        break;
      }
    }
  } else {
    // Equal distribution
    const randomIndex = Math.floor(Math.random() * variants.length);
    selectedVariant = variants[randomIndex];
  }
  
  // Save variant to localStorage
  try {
    localStorage.setItem(storageKey, selectedVariant);
  } catch (error) {
    // Try sessionStorage as fallback
    try {
      sessionStorage.setItem(storageKey, selectedVariant);
    } catch (sessionError) {
      // Neither available, variant won't persist
      console.warn('Storage not available, variant assignment will not persist');
    }
  }
  
  return selectedVariant;
}

/**
 * Track the assigned variant in Google Analytics as a user property
 * @param {string} experimentName - The name of the experiment
 * @param {string} variant - The assigned variant
 */
export function trackVariant(experimentName, variant) {
  // Set as user property so all events are tagged with this experiment variant
  setUserProperty(`experiment_${experimentName}`, variant);
  
  // Also send as a dedicated event
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'experiment_view', {
      experiment_name: experimentName,
      variant_name: variant,
    });
  }
}

/**
 * Clear a specific experiment variant (useful for testing)
 * @param {string} experimentName - The name of the experiment to clear
 */
export function clearVariant(experimentName) {
  if (typeof window === 'undefined') return;
  
  const storageKey = STORAGE_PREFIX + experimentName;
  
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    try {
      sessionStorage.removeItem(storageKey);
    } catch (sessionError) {
      // Storage not available
    }
  }
}

/**
 * Clear all experiment variants (useful for testing)
 */
export function clearAllVariants() {
  if (typeof window === 'undefined') return;
  
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    // localStorage not available
  }
}

/**
 * Get all active experiments and their variants
 * @returns {Object} Object with experiment names as keys and variants as values
 */
export function getActiveExperiments() {
  if (typeof window === 'undefined') return {};
  
  const experiments = {};
  
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX) && !key.endsWith(STORAGE_EXPIRY_SUFFIX)) {
        const experimentName = key.replace(STORAGE_PREFIX, '');
        experiments[experimentName] = localStorage.getItem(key);
      }
    });
  } catch (error) {
    // localStorage not available
  }
  
  return experiments;
}
