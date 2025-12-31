'use client';

import { useMemo, useEffect } from 'react';
import { getVariant, trackVariant } from '@/lib/abtest';

/**
 * React hook for A/B testing
 * 
 * Usage:
 * const variant = useABTest('hero_copy', ['control', 'variant_a', 'variant_b']);
 * 
 * @param {string} experimentName - The name of the experiment
 * @param {Array<string>} variants - Array of variant names
 * @param {Object} options - Additional options
 * @param {Array<number>} options.weights - Weight distribution for variants
 * @returns {string} The assigned variant
 */
export default function useABTest(experimentName, variants, options = {}) {
  // Memoize the variant assignment to avoid recalculating on every render
  const variant = useMemo(() => {
    return getVariant(experimentName, variants, options);
  }, [experimentName, variants, options]);

  // Track the variant in Google Analytics (side effect)
  useEffect(() => {
    trackVariant(experimentName, variant);
  }, [experimentName, variant]);

  return variant;
}
