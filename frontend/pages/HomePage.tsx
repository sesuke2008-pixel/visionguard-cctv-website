import React from 'react';
import HeroSection from '../sections/HeroSection';
import TrustBar from '../sections/TrustBar';
import ServicesSection from '../sections/ServicesSection';
import ProcessSection from '../sections/ProcessSection';
import PricingSection from '../sections/PricingSection';
import PortfolioSection from '../sections/PortfolioSection';
import IndustriesSection from '../sections/IndustriesSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BlogSection from '../sections/BlogSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <PortfolioSection />
      <IndustriesSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
