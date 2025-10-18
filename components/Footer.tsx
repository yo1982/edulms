import React from 'react';

const Footer: React.FC = () => {
    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Deliverables', href: '#deliverables' },
        { name: 'Contact', href: '#cta' },
    ];
  return (
    <footer id="footer" className="bg-dark-card border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-1">
                <a href="#home" className="text-white text-2xl font-bold tracking-tight">
                    <span className="text-primary">Pro</span>Learn
                </a>
            </div>
          <div className="mt-8 md:mt-0 md:order-2 flex justify-center space-x-6">
             {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} ProLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;