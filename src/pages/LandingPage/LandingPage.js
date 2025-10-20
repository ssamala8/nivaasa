import React from 'react';
import './LandingPage.scss';
// 1. UPDATED: Corrected paths to the 'features' folder
import FeatureCard from '../../features/landing/components/FeatureCard/FeatureCard';
import PriceTier from '../../features/landing/components/PriceTier/PriceTier';
// 2. UPDATED: Removed unused 'FontAwesomeIcon'
import { faRupeeSign, faBell, faChartBar, faComments } from '@fortawesome/free-solid-svg-icons';
// 3. UPDATED: Removed unused 'faUpi' import

const LandingPage = () => {
  const paymentIcon = faRupeeSign; 

  return (
    <div className="homepage-content">
      {/* --- Section 1: Hero --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">
            Simplify Society Living. One App for Everything.
          </h1>
          <p className="hero-subheadline">
            The all-in-one platform for modern apartment communities in India. Manage maintenance, communicate with residents, track finances, and automate billing—all in one place.
          </p>
          <div className="hero-buttons">
            <a href="#!" className="btn btn--primary">Request a Demo</a>
            <a href="#!" className="btn btn--secondary">See Pricing</a>
          </div>
        </div>
      </section>

      {/* --- Section 2: The Problem --- */}
      <section className="problem-section">
        <h2 className="section-headline">Tired of the Management Chaos?</h2>
        <p className="section-subheadline">
          Managing an apartment society means endless Excel sheets, lost notices on boards, chasing pending payments, and constant WhatsApp group noise. It's time for a smarter, digital solution.
        </p>
      </section>

      {/* --- Section 3: Features --- */}
      <section className="features-section">
        <h2 className="section-headline">Everything You Need for a Better Community</h2>
        <div className="features-grid">
          <FeatureCard
            icon={paymentIcon}
            title="Effortless Maintenance & Payments"
            text="Automate monthly billing. Track pending payments, and let residents pay securely online in seconds via UPI, Cards, and Netbanking."
          />
          <FeatureCard
            icon={faBell}
            title="Instant & Centralized Communication"
            text="Send important alerts, society guidelines, and monthly meeting invitations directly to residents' phones. No more printed circulars."
          />
          <FeatureCard
            icon={faChartBar}
            title="Full Financial Transparency"
            text="Build trust. Share monthly expenditure reports, view available society funds, and upload weekly cleaning reports with photos."
          />
          <FeatureCard
            icon={faComments}
            title="A Connected Community"
            text="Give residents a voice with built-in polls. Manage all flat and resident details from one simple admin dashboard."
          />
        </div>
      </section>

      {/* --- Section 4: How It Works --- */}
      <section className="how-it-works-section">
        <h2 className="section-headline">Get Started in 3 Simple Steps</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Choose Your Plan</h3>
            <p>Select a simple monthly subscription based on the number of flats in your society. No hidden fees.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>We Set Up Your Society</h3>
            <p>Our team will help you onboard, add your flat details, and train your Managing Committee.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Go Live</h3>
            <p>Invite your residents to download the app to see their dues, join discussions, and receive alerts.</p>
          </div>
        </div>
      </section>

      {/* --- Section 5: Pricing --- */}
      <section className="pricing-section">
        <h2 className="section-headline">Simple, Transparent Pricing (in ₹)</h2>
        <p className="section-subheadline">
          Our pricing is based on the number of units you manage. All plans are billed in Indian Rupees (INR) and include all features.
        </p> 
        {/* ^-- 4. THIS WAS THE SYNTAX ERROR. It's now corrected to </p> --^ */}
        <div className="pricing-grid">
          <PriceTier
            title="Small Community"
            description="Up to 50 Flats"
            buttonText="Get a Quote"
          />
          <PriceTier
            title="Medium Society"
            description="51-150 Flats"
            buttonText="Get a Quote"
          />
          <PriceTier
            title="Large Township"
            description="150+ Flats"
            buttonText="Contact Sales"
          />
        </div>
      </section>

      {/* --- Section 6: Final CTA --- */}
      <section className="cta-section">
        <h2>Ready to Transform Your Society?</h2>
        <p>
          See how our platform can reduce stress for your Managing Committee and improve the living experience for all residents.
        </p>
        <a href="#!" className="btn btn--primary btn--large">
          Request a Free Demo
        </a>
      </section>
    </div>
  );
};

export default LandingPage;