"use client";

import { useLocale } from "@/lib/LocaleProvider";
import NavBar from "@/ui/organisms/NavBar/NavBar";
import NewHero from "@/ui/organisms/NewHero/NewHero";
import SocialProofBar from "@/ui/organisms/SocialProofBar/SocialProofBar";
import FeatureHighlight from "@/ui/organisms/FeatureHighlight/FeatureHighlight";
import ProblemSection from "@/ui/organisms/ProblemSection/ProblemSection";
import HowItWorks from "@/ui/organisms/HowItWorks/HowItWorks";
import ConditionGrid from "@/ui/organisms/ConditionGrid/ConditionGrid";
import AIProposalSection from "@/ui/organisms/AIProposalSection";
import ShareSection from "@/ui/organisms/ShareSection";
import EngagementSection from "@/ui/organisms/EngagementSection";
import InvoicingDivider from "@/ui/organisms/InvoicingDivider";
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

        {/* Feature Highlight */}
        <FeatureHighlight dictionary={dictionary} />

        {/* Problem Agitation */}
        <ProblemSection dictionary={dictionary} />

        {/* Solution - How It Works */}
        <HowItWorks dictionary={dictionary} />

        {/* Condition Grid */}
        <ConditionGrid dictionary={dictionary} />

        {/* AI Proposal Generation - Create, Edit, Brand */}
        <AIProposalSection dictionary={dictionary} />

        {/* Share - PDFs, Links, Password Protection */}
        <ShareSection dictionary={dictionary} />

        {/* Client Engagement - Analytics, Recordings, Follow-ups */}
        <EngagementSection dictionary={dictionary} />

        {/* Invoicing Divider */}
        <InvoicingDivider dictionary={dictionary} />

        {/* Evolution Features */}
        <EvolutionFeatures dictionary={dictionary} />

        {/* Testimonials */}
        <InfiniteCarousel dictionary={dictionary} />

        {/* Role Comparison */}
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
