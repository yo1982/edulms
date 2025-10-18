import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="bg-dark-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-dark-card px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16 border border-gray-700">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Build Your Online Academy?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Let's discuss your project. Get a free, no-obligation consultation with our e-learning experts and receive a personalized quote.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#cta"
              className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-transform transform hover:scale-105"
            >
              Request a Free Quote
            </a>
            <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors">
              Explore Features <span aria-hidden="true">→</span>
            </a>
          </div>

          <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#10B981" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CTASection;