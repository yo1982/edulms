import React from 'react';

const CheckIcon = () => (
    <svg className="h-6 w-6 flex-none text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Deliverables: React.FC = () => {
    const finalOutputs = [
        "A fully integrated, ready-to-use educational platform.",
        "System User and Administration Manual.",
        "Comprehensive training on course and user management.",
        "6 months warranty on all technical and workmanship aspects.",
    ];

    return (
        <section id="deliverables" className="bg-dark-card py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-base font-semibold leading-7 text-primary">Final Outputs</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">What You'll Receive</p>
                    <p className="mt-6 text-lg leading-8 text-gray-400">
                        Our commitment is to provide you with a turnkey solution. We handle the technical details so you can focus on creating amazing content. Here’s what you get when you partner with us.
                    </p>
                    <ul role="list" className="mt-8 space-y-4 text-gray-300">
                        {finalOutputs.map((output, index) => (
                            <li key={index} className="flex gap-x-3">
                                <CheckIcon />
                                <span>{output}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="lg:w-1/2">
                    <img
                        src="https://picsum.photos/seed/deliverables/600/400"
                        alt="Deliverables"
                        className="rounded-xl shadow-2xl ring-1 ring-white/10 w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default Deliverables;