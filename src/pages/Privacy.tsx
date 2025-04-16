import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Privacy
                            Policy</h1>
                        <p className="mt-6 text-xl text-gray-500">
                            Last updated: April 6, 2025
                        </p>
                    </div>

                    <div className="mt-12 prose prose-lg max-w-3xl mx-auto">
                        <section>
                            <h2>Introduction</h2>
                            <p>
                                At Blinkly, we take your privacy seriously. This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information when you use our link shortening and
                                analytics service. Please read this privacy policy carefully. If you do not agree with
                                the terms of this privacy policy, please do not access the site.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>Information We Collect</h2>
                            <p>
                                We may collect information about you in various ways when you use our service. The
                                information we may collect includes:
                            </p>
                            <ul>
                                <li><strong>Personal Data:</strong> Name, email address, and other contact information
                                    you provide when creating an account.
                                </li>
                                <li><strong>Usage Data:</strong> Information about how you use our service, including
                                    clicked links, device information, IP address, browser type, pages visited, and time
                                    spent.
                                </li>
                                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar
                                    tracking technologies to track activity on our service and hold certain information.
                                </li>
                            </ul>
                        </section>

                        <section className="mt-8">
                            <h2>How We Use Your Information</h2>
                            <p>
                                We may use the information we collect for various purposes, including:
                            </p>
                            <ul>
                                <li>To provide and maintain our service</li>
                                <li>To notify you about changes to our service</li>
                                <li>To provide customer support</li>
                                <li>To gather analysis or valuable information to improve our service</li>
                                <li>To monitor the usage of our service</li>
                                <li>To detect, prevent, and address technical issues</li>
                            </ul>
                        </section>

                        <section className="mt-8">
                            <h2>Disclosure of Your Information</h2>
                            <p>
                                We may share your information in the following situations:
                            </p>
                            <ul>
                                <li><strong>With Service Providers:</strong> We may share your information with
                                    third-party vendors and service providers that perform services for us or on our
                                    behalf.
                                </li>
                                <li><strong>Business Transfers:</strong> We may share or transfer your information in
                                    connection with, or during negotiations of, any merger, sale of company assets,
                                    financing, or acquisition of all or a portion of our business.
                                </li>
                                <li><strong>With Your Consent:</strong> We may disclose your personal information for
                                    any other purpose with your consent.
                                </li>
                                <li><strong>Legal Requirements:</strong> We may disclose your information where we are
                                    legally required to do so.
                                </li>
                            </ul>
                        </section>

                        <section className="mt-8">
                            <h2>Security of Your Information</h2>
                            <p>
                                We implement security measures designed to protect your information from unauthorized
                                access. However, no electronic transmission over the internet or information storage
                                technology can be guaranteed to be 100% secure.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>Your Data Protection Rights</h2>
                            <p>
                                Depending on your location, you may have certain rights regarding your personal
                                information, such as:
                            </p>
                            <ul>
                                <li>The right to access, update, or delete your information</li>
                                <li>The right to rectification if your information is inaccurate or incomplete</li>
                                <li>The right to object to our processing of your personal data</li>
                                <li>The right to request that we restrict the processing of your personal information
                                </li>
                                <li>The right to data portability</li>
                            </ul>
                        </section>

                        <section className="mt-8">
                            <h2>Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at
                                privacy@blinkly.app.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Privacy;
