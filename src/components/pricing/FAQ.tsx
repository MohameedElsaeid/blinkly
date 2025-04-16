import React from "react";

const FAQ = () => {
    return (
        <div className="max-w-3xl mx-auto px-8 py-8 bg-alchemy-purple-light/20 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">Can I change plans later?</h4>
                    <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take
                        effect at the start of your next billing cycle.</p>
                </div>
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">Is there a free trial?</h4>
                    <p className="text-gray-600">All paid plans come with a 14-day free trial. No credit card required
                        to start.</p>
                </div>
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">Do you offer discounts?</h4>
                    <p className="text-gray-600">We offer special pricing for non-profits, educational institutions, and
                        open source projects. Contact us for details.</p>
                </div>
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">What happens if I exceed my limits?</h4>
                    <p className="text-gray-600">We'll notify you when you're approaching your limits. You can upgrade
                        your plan or wait until the next month's reset.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
