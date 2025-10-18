import React from 'react';

const LMSIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>;
const HostingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const UIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const PaymentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const SecurityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944L12 22l9-1.056A12.02 12.02 0 0021 7.928a11.955 11.955 0 01-4.382-3.04z" /></svg>;
const SEOIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

export const featureSections = [
    {
        title: "Learning Management System (LMS)",
        icon: <LMSIcon />,
        features: [
            { icon: <LMSIcon />, title: "Unified Control Panel", description: "Integrated dashboards for administrators, teachers, and students for seamless management." },
            { icon: <LMSIcon />, title: "Dynamic Course Builder", description: "Support for multiple courses, levels, and interactive tests to engage learners." },
            { icon: <LMSIcon />, title: "Automatic Certificates", description: "Designable and printable completion certificates to reward student achievement." },
            { icon: <LMSIcon />, title: "Progress Tracking", description: "Advanced analytics to track student progress, and evaluate and review lessons." },
            { icon: <LMSIcon />, title: "Live Streaming", description: "Integrated live streaming capabilities with Zoom/Google Meet for virtual classrooms." },
            { icon: <LMSIcon />, title: "E-commerce Ready", description: "Built-in support for direct sales of online courses via WooCommerce integration." },
        ]
    },
    {
        title: "High-Performance Hosting",
        icon: <HostingIcon />,
        features: [
            { icon: <HostingIcon />, title: "Dedicated E-learning Servers", description: "Blazing-fast SSD NVMe servers optimized for e-learning workloads." },
            { icon: <HostingIcon />, title: "Professional Domain & SSL", description: "Includes a professional domain and free SSL protection for security and trust." },
            { icon: <HostingIcon />, title: "Global CDN", description: "Content Delivery Network for fast loading speeds for your students worldwide." },
            { icon: <HostingIcon />, title: "Daily Automated Backups", description: "Complete peace of mind with automated daily backups of your entire platform." },
            { icon: <HostingIcon />, title: "DDoS Protection", description: "Robust, always-on protection against DDoS attacks to ensure maximum uptime." },
            { icon: <HostingIcon />, title: "cPanel/Cloud Control", description: "Easy-to-use cPanel or Cloud Hosting control panel for full server management." },
        ]
    },
    {
        title: "User Interface (UI/UX) & Payments",
        icon: <UIIcon />,
        features: [
            { icon: <UIIcon />, title: "Modern Responsive Design", description: "A beautiful, modern design that is fully responsive on all devices (desktop, mobile, tablet)." },
            { icon: <UIIcon />, title: "Brand Identity", description: "Harmonious colors and design that reflects your educational brand identity." },
            { icon: <UIIcon />, title: "Intuitive Experience", description: "Effortless course browsing and registration designed to maximize student engagement." },
            { icon: <UIIcon />, title: "Attractive Page Templates", description: "Ready-to-use pages for trainers, courses, certificates, blogs, and technical support." },
            { icon: <PaymentIcon />, title: "Global Payment Gateways", description: "Connect local and international payment gateways like Paymob, PayTabs, and PayPal." },
            { icon: <PaymentIcon />, title: "Sales Management", description: "Manage all sales, generate reports, and create discount coupons from within the platform." },
        ]
    },
    {
        title: "Security, Maintenance & SEO",
        icon: <SecurityIcon />,
        features: [
            { icon: <SecurityIcon />, title: "Advanced Firewall", description: "Enhanced security with an advanced Web Application Firewall (WAF) and reCAPTCHA." },
            { icon: <SecurityIcon />, title: "Plugin & Theme Updates", description: "We handle all regular updates for plugins and themes to keep your site secure." },
            { icon: <SecurityIcon />, title: "Performance Monitoring", description: "Continuous performance and speed monitoring to ensure a smooth user experience." },
            { icon: <SEOIcon />, title: "Google-Friendly Structure", description: "Built with a search-engine-friendly structure to improve your rankings." },
            { icon: <SEOIcon />, title: "Automatic Metadata", description: "Automatic metadata generation for all your lessons and blog articles to boost visibility." },
            { icon: <SEOIcon />, title: "Analytics & Sitemaps", description: "Automatic sitemap.xml generation and seamless Google Analytics integration." },
        ]
    }
];
