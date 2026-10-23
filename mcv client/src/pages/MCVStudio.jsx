import React, { useEffect, useState } from 'react';
import './MCVStudio.css';

/* =========================================
   DATA: GALLERY IMAGES (Our Work)
   ========================================= */
const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&h=400&fit=crop', alt: 'Studio portrait session', category: 'Portrait' },
  { id: 2, src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop', alt: 'Professional podcast recording setup', category: 'Podcast' },
  { id: 3, src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop', alt: 'Product photography setup', category: 'Product' },
  { id: 4, src: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=400&fit=crop', alt: 'Multi-camera livestreaming production', category: 'Livestreaming' },
  { id: 5, src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop', alt: 'Fashion editorial shoot', category: 'Fashion' },
  { id: 6, src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop', alt: 'Corporate headshot session', category: 'Headshot' },
];

/* =========================================
   MAIN COMPONENT: MC VISUAL STUDIOS PAGE
   ========================================= */
const MCVStudio = () => {
  const [isLoaded, setIsLoaded] = useState(false); 
  const [pricingPackages, setPricingPackages] = useState([]); 
  const [isLoadingPricing, setIsLoadingPricing] = useState(true); 
  const [pricingError, setPricingError] = useState(null); 

  // --- Multi-Step Form State ---
  const [formStep, setFormStep] = useState(1); // 1: AI Estimate, 2: Details, 3: Payment
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [aiEstimate, setAiEstimate] = useState(null);
  const [aiInputs, setAiInputs] = useState({
    serviceType: 'portrait',
    duration: '1',
    extras: []
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    estimatedBudget: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300); 
    const fetchPricingData = async () => {
      try {
        setIsLoadingPricing(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const mockBackendData = [
          { id: 1, name: 'Portrait & Headshot', price: 'KSh 30,000', duration: 'Per Session', categories: ['Portrait', 'Headshot'], features: ['1 Hour Studio Time', '15 Professionally Edited Photos', 'Online Digital Gallery', 'Basic Retouching', '1 Outfit Change'], popular: false },
          { id: 2, name: 'Podcast & Livestream', price: 'KSh 65,000', duration: 'Per Episode / Stream', categories: ['Podcast', 'Livestreaming'], features: ['Up to 2 Hours Recording', 'Multi-Camera Setup (3 cams)', 'Professional Audio Mixing', '1 Fully Edited Video', 'Thumbnail & Social Clips'], popular: true },
          { id: 3, name: 'Commercial & Product', price: 'Custom Quote', duration: 'Project Based', categories: ['Product', 'Fashion'], features: ['Full-Scale Commercial Production', 'Advanced Color Grading', 'Dedicated Producer & Director', 'Unlimited Studio Time', 'Commercial Usage Rights'], popular: false }
        ];
        setPricingPackages(mockBackendData); 
        setPricingError(null); 
      } catch (error) {
        setPricingError('Unable to load pricing information. Please try again later.');
      } finally {
        setIsLoadingPricing(false);
      }
    };
    fetchPricingData();
    return () => clearTimeout(timer); 
  }, []);

  // --- AI Estimator Logic ---
  const handleAICalculate = () => {
    setIsCalculating(true);
    // Simulate AI "thinking" delay
    setTimeout(() => {
      let basePrice = 5000; // Minimum starts at 5k
      let serviceName = 'Custom Shoot';

      if (aiInputs.serviceType === 'portrait') { basePrice = 5000; serviceName = 'Portrait & Headshot'; }
      else if (aiInputs.serviceType === 'podcast') { basePrice = 15000; serviceName = 'Podcast & Livestream'; }
      else if (aiInputs.serviceType === 'commercial') { basePrice = 25000; serviceName = 'Commercial & Product'; }

      const hours = parseInt(aiInputs.duration) || 1;
      const hourlyRate = aiInputs.serviceType === 'commercial' ? 10000 : 5000;
      let total = basePrice + ((hours - 1) * hourlyRate);

      if (aiInputs.extras.includes('rush')) total += 10000;
      if (aiInputs.extras.includes('extra_photos')) total += (hours * 2000);
      if (aiInputs.extras.includes('makeup')) total += 8000;

      // Ensure minimum is always 5000
      total = Math.max(5000, total);

      setAiEstimate({
        serviceName,
        min: total,
        max: total + 15000, // Give a realistic range
        breakdown: `Base ${serviceName} + ${hours}hr(s) + Selected Add-ons`
      });
      setIsCalculating(false);
    }, 1500);
  };

  const applyEstimateToForm = () => {
    if (aiEstimate) {
      setFormData(prev => ({
        ...prev,
        service: aiEstimate.serviceName,
        estimatedBudget: `KSh ${aiEstimate.min.toLocaleString()} - ${aiEstimate.max.toLocaleString()}`
      }));
    }
    setFormStep(2);
  };

  // --- Form Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExtraToggle = (extra) => {
    setAiInputs(prev => {
      const extras = prev.extras.includes(extra) 
        ? prev.extras.filter(e => e !== extra) 
        : [...prev.extras, extra];
      return { ...prev, extras };
    });
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStep(3); // Move to payment step
    }, 1500);
  };

  const titleText = 'MCV STUDIOS'; 

  return (
    <div className="mcv-page"> 
      {/* HERO SECTION */}
      <section className="mcv-hero"> 
        <div className="mcv-hero-overlay"> 
          <h1 className={`mcv-hero-title ${isLoaded ? 'mcv-hero-title--visible' : ''}`}> 
            {titleText.split('').map((char, index) => ( 
              <span key={index} className="mcv-hero-letter" style={{ animationDelay: `${index * 0.08}s` }}>
                {char === ' ' ? '\u00A0' : char} 
              </span>
            ))}
          </h1>
          <p className={`mcv-hero-subtitle ${isLoaded ? 'mcv-hero-subtitle--visible' : ''}`}> 
            Elevating Brands Through Visual Storytelling. 
          </p>
          <a href="#mcv-pricing" className={`mcv-hero-cta ${isLoaded ? 'mcv-hero-cta--visible' : ''}`}>
            View Our Rates 
          </a>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="mcv-gallery"> 
        <span className="mcv-section-badge">Our Work</span> 
        <h2 className="mcv-section-title">Recent Productions</h2> 
        <div className="mcv-gallery-grid"> 
          {galleryImages.map((image) => ( 
            <div key={image.id} className="mcv-gallery-item"> 
              <img src={image.src} alt={image.alt} className="mcv-gallery-img" loading="lazy" />
              <div className="mcv-gallery-overlay"> 
                <span className="mcv-gallery-category">{image.category}</span> 
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="mcv-pricing" className="mcv-pricing"> 
        <span className="mcv-section-badge">Our Rates</span> 
        <h2 className="mcv-section-title">Investment & Packages</h2> 
        <p className="mcv-pricing-subtitle"> 
          Transparent pricing tailored to your production needs.
        </p>

        {isLoadingPricing ? (
          <div className="mcv-pricing-loading"><div className="mcv-loading-spinner"></div><p>Loading rates...</p></div>
        ) : pricingError ? (
          <div className="mcv-pricing-error"><p>{pricingError}</p><button onClick={() => window.location.reload()} className="mcv-retry-btn">Retry</button></div>
        ) : (
          <div className="mcv-pricing-grid"> 
            {pricingPackages.map((pkg) => ( 
              <div key={pkg.id} className={`mcv-pricing-card ${pkg.popular ? 'mcv-pricing-card--popular' : ''}`}>
                {pkg.popular && <span className="mcv-popular-badge">Most Popular</span>} 
                <h3 className="mcv-pricing-name">{pkg.name}</h3> 
                <div className="mcv-pricing-categories">{pkg.categories.map((cat, i) => <span key={i} className="mcv-pricing-category-tag">{cat}</span>)}</div>
                <div className="mcv-pricing-amount">{pkg.price}</div> 
                <div className="mcv-pricing-duration">{pkg.duration}</div> 
                <ul className="mcv-pricing-features">{pkg.features.map((feature, i) => <li key={i} className="mcv-pricing-feature"><span className="mcv-check">✓</span> {feature}</li>)}</ul>
                <button onClick={() => { setAiInputs(prev => ({...prev, serviceType: pkg.id === 1 ? 'portrait' : pkg.id === 2 ? 'podcast' : 'commercial'})); setFormStep(1); window.location.href='#mcv-contact'; }} className="mcv-pricing-btn">
                  Get Custom Estimate
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================
          MULTI-STEP CONTACT, AI & PAYMENT SECTION
          ========================================= */}
      <section id="mcv-contact" className="mcv-contact"> 
        <div className="mcv-contact-container">
          <div className="mcv-contact-header">
            <span className="mcv-section-badge">Book Your Session</span>
            <h2 className="mcv-contact-title">Start Your Project</h2> 
            <p className="mcv-contact-text">Estimate your budget with our AI, fill in your details, and securely reserve your date.</p>
          </div>

          {/* Progress Steps */}
          <div className="mcv-form-steps">
            <div className={`mcv-step ${formStep >= 1 ? 'active' : ''}`}>1. AI Estimate</div>
            <div className="mcv-step-line"></div>
            <div className={`mcv-step ${formStep >= 2 ? 'active' : ''}`}>2. Your Details</div>
            <div className="mcv-step-line"></div>
            <div className={`mcv-step ${formStep >= 3 ? 'active' : ''}`}>3. Payment</div>
          </div>

          {/* STEP 1: AI BUDGET ESTIMATOR */}
          {formStep === 1 && (
            <div className="mcv-ai-estimator-card">
              <div className="mcv-ai-header">
                <span className="mcv-ai-icon">🤖</span>
                <h3>AI Budget Estimator</h3>
                <p>Tell us what you need, and our AI will generate a custom estimate starting from KSh 5,000.</p>
              </div>
              
              <div className="mcv-ai-form-grid">
                <div className="mcv-form-group">
                  <label>Service Type</label>
                  <select value={aiInputs.serviceType} onChange={(e) => setAiInputs({...aiInputs, serviceType: e.target.value})}>
                    <option value="portrait">Portrait & Headshot (Starts KSh 5,000)</option>
                    <option value="podcast">Podcast & Livestream (Starts KSh 15,000)</option>
                    <option value="commercial">Commercial & Product (Starts KSh 25,000)</option>
                  </select>
                </div>
                <div className="mcv-form-group">
                  <label>Duration (Hours)</label>
                  <input type="number" min="1" max="10" value={aiInputs.duration} onChange={(e) => setAiInputs({...aiInputs, duration: e.target.value})} />
                </div>
              </div>

              <div className="mcv-ai-extras">
                <label>Add-ons:</label>
                <div className="mcv-checkbox-group">
                  <label className="mcv-checkbox"><input type="checkbox" checked={aiInputs.extras.includes('rush')} onChange={() => handleExtraToggle('rush')} /> Rush Delivery (+KSh 10,000)</label>
                  <label className="mcv-checkbox"><input type="checkbox" checked={aiInputs.extras.includes('extra_photos')} onChange={() => handleExtraToggle('extra_photos')} /> Extra Edited Photos (+KSh 2,000/hr)</label>
                  <label className="mcv-checkbox"><input type="checkbox" checked={aiInputs.extras.includes('makeup')} onChange={() => handleExtraToggle('makeup')} /> Professional Makeup Artist (+KSh 8,000)</label>
                </div>
              </div>

              <button onClick={handleAICalculate} disabled={isCalculating} className="mcv-ai-calculate-btn">
                {isCalculating ? '🧠 AI is analyzing...' : 'Calculate My Estimate'}
              </button>

              {aiEstimate && !isCalculating && (
                <div className="mcv-ai-result">
                  <h4>Estimated Budget: <span className="mcv-highlight">KSh {aiEstimate.min.toLocaleString()} - {aiEstimate.max.toLocaleString()}</span></h4>
                  <p className="mcv-ai-breakdown">{aiEstimate.breakdown}</p>
                  <button onClick={applyEstimateToForm} className="mcv-ai-apply-btn">Use This Estimate & Continue →</button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: PROJECT DETAILS FORM */}
          {formStep === 2 && (
            <form className="mcv-project-form" onSubmit={handleSubmitDetails}>
              <div className="mcv-form-row">
                <div className="mcv-form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., John Kamau" required />
                </div>
                <div className="mcv-form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="e.g., john@company.co.ke" required />
                </div>
              </div>
              <div className="mcv-form-row">
                <div className="mcv-form-group">
                  <label>Phone Number (M-Pesa) *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g., 0712 345 678" required />
                </div>
                <div className="mcv-form-group">
                  <label>Selected Service</label>
                  <input type="text" name="service" value={formData.service} onChange={handleInputChange} placeholder="e.g., Portrait & Headshot" required />
                </div>
              </div>
              <div className="mcv-form-group">
                <label>Estimated Budget (From AI or your own)</label>
                <input type="text" name="estimatedBudget" value={formData.estimatedBudget} onChange={handleInputChange} placeholder="e.g., KSh 15,000 - 20,000" />
              </div>
              <div className="mcv-form-group">
                <label>Project Details & Vision *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your vision, target audience, desired timeline, and any specific requirements..." rows="4" required></textarea>
              </div>
              <div className="mcv-form-actions">
                <button type="button" onClick={() => setFormStep(1)} className="mcv-back-btn">← Back to Estimator</button>
                <button type="submit" disabled={isSubmitting} className="mcv-submit-btn">
                  {isSubmitting ? 'Processing...' : 'Review & Proceed to Payment →'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT & CONFIRMATION */}
          {formStep === 3 && (
            <div className="mcv-payment-card">
              <div className="mcv-success-icon-large">🎉</div>
              <h3>Booking Request Received!</h3>
              <p>To secure your date and lock in your estimated budget of <strong>{formData.estimatedBudget || 'your selected package'}</strong>, please complete the initial deposit of <strong>KSh 5,000</strong> using one of the methods below.</p>
              
              <div className="mcv-payment-methods">
                <div className="mcv-payment-option mpesa">
                  <div className="mcv-payment-logo">M-PESA</div>
                  <h4>Lipa Na M-Pesa (Paybill)</h4>
                  <p><strong>Business No:</strong> 123456</p>
                  <p><strong>Account No:</strong> MCV-{formData.name.replace(/\s+/g, '').toUpperCase()}</p>
                  <p className="mcv-payment-note">You will receive an M-Pesa confirmation SMS. Please keep it safe.</p>
                </div>
                <div className="mcv-payment-option bank">
                  <div className="mcv-payment-logo">BANK</div>
                  <h4>Bank Transfer</h4>
                  <p><strong>Bank:</strong> KCB Bank Kenya</p>
                  <p><strong>Account Name:</strong> MC Visual Studios Ltd</p>
                  <p><strong>Account No:</strong> 1234567890</p>
                  <p><strong>Branch:</strong> Nairobi CBD</p>
                </div>
              </div>

              <div className="mcv-payment-actions">
                <p className="mcv-payment-disclaimer">* Full balance is due on the day of the shoot. A 100% refund applies if cancelled 48hrs prior.</p>
                <button onClick={() => { alert('Payment confirmation submitted! We will verify and email you shortly.'); setFormStep(1); setFormData({name:'',email:'',phone:'',service:'',estimatedBudget:'',message:''}); }} className="mcv-confirm-payment-btn">
                  I Have Made the Payment
                </button>
                <button onClick={() => setFormStep(2)} className="mcv-back-btn">← Edit Details</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </div> 
  );
};

export default MCVStudio;