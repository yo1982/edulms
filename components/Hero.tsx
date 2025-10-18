
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-dark-bg pt-16 sm:pt-24 lg:pt-32">
        <div className="absolute inset-0 -z-10 h-full w-full bg-dark-bg bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your All-in-One Professional <span className="text-primary">E-Learning Platform</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Launch your online courses with a powerful, secure, and beautifully designed LMS, fully managed for you. From course creation to payment processing, we provide the complete solution to build your education empire.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#cta"
              className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-transform transform hover:scale-105"
            >
              Get a Free Consultation
            </a>
            <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img src="https://picsum.photos/seed/lms-dashboard/1200/600" alt="App screenshot" width="2432" height="1442" className="rounded-md shadow-2xl ring-1 ring-white/10" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
