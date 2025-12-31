"use client";

import { useLocale } from "@/lib/LocaleProvider";
import NavBar from "@/ui/organisms/NavBar/NavBar";
import NewHero from "@/ui/organisms/NewHero/NewHero";
import SocialProofBar from "@/ui/organisms/SocialProofBar/SocialProofBar";
import NeedSelector from "@/ui/organisms/NeedSelector/NeedSelector";
import FeatureHighlight from "@/ui/organisms/FeatureHighlight/FeatureHighlight";
import ProblemSection from "@/ui/organisms/ProblemSection/ProblemSection";
import ImpactTimeline from "@/ui/organisms/ImpactTimeline/ImpactTimeline";
import HowItWorks from "@/ui/organisms/HowItWorks/HowItWorks";
import ConditionGrid from "@/ui/organisms/ConditionGrid/ConditionGrid";
import FeaturesGrid from "@/ui/organisms/FeaturesGrid/FeaturesGrid";
import AnalyticsSection from "@/ui/organisms/AnalyticsSection/AnalyticsSection";
import EvolutionFeatures from "@/ui/organisms/EvolutionFeatures/EvolutionFeatures";
import InfiniteCarousel from "@/ui/organisms/InfiniteCarousel/InfiniteCarousel";
import RoleComparison from "@/ui/organisms/RoleComparison/RoleComparison";
import PricingSection from "@/ui/organisms/PricingSection/PricingSection";
import QuickAnswers from "@/ui/organisms/QuickAnswers/QuickAnswers";
import CTASection from "@/ui/organisms/CTASection/CTASection";
import SimpleFooter from "@/ui/organisms/SimpleFooter/SimpleFooter";

export default function LandingPage() {
  const { dictionary } = useLocale();

  return (
    <>
      <NavBar dictionary={dictionary} />
      <main id="main-content">
        {/* Hero Section */}
        <NewHero dictionary={dictionary} />

        {/* Social Proof Bar */}
        <SocialProofBar dictionary={dictionary} />

        {/* Keep existing sections */}
        <NeedSelector dictionary={dictionary} />

        {/* Feature Highlight */}
        <FeatureHighlight dictionary={dictionary} />

        {/* Problem Agitation */}
        <ProblemSection dictionary={dictionary} />

        {/* Keep existing */}
        <ImpactTimeline dictionary={dictionary} />

        {/* Solution - How It Works */}
        <HowItWorks dictionary={dictionary} />

        {/* Keep existing */}
        <ConditionGrid dictionary={dictionary} />

        {/* Key Features Grid */}
        <FeaturesGrid dictionary={dictionary} />

        {/* Analytics Deep Dive */}
        <AnalyticsSection dictionary={dictionary} />

        {/* Keep existing */}
        <EvolutionFeatures dictionary={dictionary} />

        {/* Testimonials */}
        <InfiniteCarousel dictionary={dictionary} />

        {/* Keep existing */}
        <RoleComparison dictionary={dictionary} />

        {/* Pricing */}
        <PricingSection dictionary={dictionary} />

        {/* FAQ */}
        <QuickAnswers dictionary={dictionary} />

        {/* Final CTA */}
        <CTASection dictionary={dictionary} />
      </main>
      <SimpleFooter dictionary={dictionary} />
    </>
  );
}
