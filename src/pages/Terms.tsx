import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Terms
                            of Service</h1>
                        <p className="mt-6 text-xl text-gray-500">
                            Last updated: April 6, 2025
                        </p>
                    </div>

                    <div className="mt-12 prose prose-lg max-w-3xl mx-auto">
                        <section>
                            <h2>1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the Blinkly service, you agree to be bound by these Terms of
                                Service and all applicable laws and regulations. If you do not agree with any of these
                                terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>2. Use License</h2>
                            <p>
                                Permission is granted to temporarily use the Blinkly service for personal, educational,
                                or commercial link management, subject to the following restrictions:
                            </p>
                            <ul>
                                <li>You must not use the service to distribute spam, malware, or illegal content</li>
                                <li>You must not attempt to decompile or reverse engineer any software contained on
                                    Blinkly's servers
                                </li>
                                <li>You must not remove any copyright or other proprietary notations from the
                                    materials
                                </li>
                                <li>You must not transfer the materials to another person or "mirror" the materials on
                                    any other server
                                </li>
                            </ul>
                            <p>
                                This license shall automatically terminate if you violate any of these restrictions and
                                may be terminated by Blinkly at any time.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>3. Account Terms</h2>
                            <p>
                                To access certain features of the service, you may be required to register for an
                                account. You agree to provide accurate, current, and complete information during the
                                registration process and to update such information to keep it accurate, current, and
                                complete. You are responsible for safeguarding the password that you use to access the
                                service and for any activities or actions under your password.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>4. Prohibited Activities</h2>
                            <p>
                                You may not use the service to:
                            </p>
                            <ul>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe upon the rights of others or violate their privacy</li>
                                <li>Distribute malicious or harmful content</li>
                                <li>Impersonate any person or entity</li>
                                <li>Engage in any activity that interferes with or disrupts the service</li>
                                <li>Attempt to gain unauthorized access to the service or related systems</li>
                            </ul>
                        </section>

                        <section className="mt-8">
                            <h2>5. Content Policy</h2>
                            <p>
                                Links created through our service must not direct to content that:
                            </p>
                            <ul>
                                <li>Is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
                                <li>Contains viruses, malware, or other harmful components</li>
                                <li>Infringes on intellectual property rights</li>
                                <li>Promotes illegal activities or physical harm against any group or individual</li>
                                <li>Contains personally identifiable information without appropriate consent</li>
                            </ul>
                            <p>
                                We reserve the right to remove any links that violate this policy without notice.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>6. Service Modifications</h2>
                            <p>
                                Blinkly reserves the right to modify or discontinue, temporarily or permanently, the
                                service with or without notice. We shall not be liable to you or any third party for any
                                modification, suspension, or discontinuance of the service.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>7. Disclaimer</h2>
                            <p>
                                The service is provided on an "as is" and "as available" basis. Blinkly makes no
                                warranties, expressed or implied, regarding the operation or availability of the
                                service. We do not warrant that the service will be uninterrupted or error-free.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>8. Limitation of Liability</h2>
                            <p>
                                In no event shall Blinkly be liable for any indirect, incidental, special,
                                consequential, or punitive damages, including without limitation, loss of profits, data,
                                use, goodwill, or other intangible losses resulting from your access to or use of or
                                inability to access or use the service.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>9. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws applicable in
                                the jurisdiction of our headquarters, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>10. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. We will notify users of any
                                material changes by posting the new Terms on the site. Your continued use of the service
                                after any such changes constitutes your acceptance of the new Terms.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2>11. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at terms@blinkly.app.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Terms;
