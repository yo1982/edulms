
import React from 'react';
import FeatureCard from './FeatureCard';
import { featureSections } from '../constants/features';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything Included</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A Complete Solution for Online Education
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
            We've bundled everything you need to launch, manage, and grow your online school.
          </p>
        </div>

        {featureSections.map((section) => (
          <div key={section.title} className="mt-20">
            <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl text-center mb-12 flex items-center justify-center gap-x-3">
              {section.icon} {section.title}
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {section.features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
