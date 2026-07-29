'use client'

import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { ChevronRight, CheckCircle, Star, ShieldCheck, Search, Building2, KeyRound } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
    const features = [
        { icon: Search, title: 'Smart Property Search', description: 'Filter by neighborhood, price, amenities, and pet policies with hyper-local accuracy.' },
        { icon: ShieldCheck, title: 'Verified Listings & Landlords', description: 'Say goodbye to rental scams. Every property and landlord is manually vetted for your safety.' },
        { icon: KeyRound, title: 'Hassle-Free Digital Leases', description: 'Sign secure digital contracts and set up automated monthly rent payments in minutes.' },
    ]

    const testimonials = [
        {
            quote: 'Found my dream apartment in downtown within 3 days. The virtual tour feature saved me so much time.',
            author: 'Sarah Chen',
            role: 'Tenant',
            initial: 'S',
        },
        {
            quote: 'Managing three rental properties used to be a nightmare. RentNest streamlined my tenant screening completely.',
            author: 'Marcus Johnson',
            role: 'Landlord',
            initial: 'M',
        },
        {
            quote: 'The payment tracking and maintenance request system are seamless. Best renting experience yet.',
            author: 'Elena Rodriguez',
            role: 'Tenant',
            initial: 'E',
        },
    ]

    const faqs = [
        {
            question: 'How does RentNest verify listings?',
            answer: 'Our team cross-references property deeds, conducts identity checks on landlords, and frequently audits listings to ensure they are 100% genuine.',
        },
        {
            question: 'Is there a fee for tenants to search and apply?',
            answer: 'Searching and browsing properties on RentNest is completely free. Universal applications have a small one-time fee that covers background and credit checks.',
        },
        {
            question: 'How do landlords list their properties?',
            answer: 'Landlords can create an account, upload property details, photos, and verification documents. Listings usually go live within 24 hours after a quick review.',
        },
        {
            question: 'Can I set up automatic rent payments?',
            answer: 'Yes! Tenants can link their bank accounts or cards to automate monthly rent payments, helping build credit history while never missing a due date.',
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                            <Building2 className="w-3.5 h-3.5" /> Welcome to RentNest
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                            Find a place you'll <span className="text-primary">love to live</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Whether you're hunting for your next apartment or managing properties as a landlord, RentNest makes renting transparent, secure, and effortless.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/browse">
                            <Button size="lg" className="px-8 py-6 text-base w-full sm:w-auto">
                                Browse Properties
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="px-8 py-6 text-base gap-2 w-full sm:w-auto">
                                List Your Property <ChevronRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">Join thousands of verified renters and landlords today.</p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Built for modern renting</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to rent with confidence, stripped of unnecessary complexity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((Feature, idx) => (
                            <div key={idx} className="space-y-4 p-6 rounded-lg border border-border/50 hover:border-border/80 transition-colors">
                                <Feature.icon className="w-8 h-8 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">{Feature.title}</h3>
                                <p className="text-muted-foreground">{Feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">How RentNest works</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Three simple steps to your next home or hassle-free tenancy.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {[
                            { step: '1', title: 'Discover or List', description: 'Explore verified apartments and houses with detailed media, or list your property in minutes.' },
                            { step: '2', title: 'Apply & Screen', description: 'Submit secure background checks or review trusted tenant applications instantly.' },
                            { step: '3', title: 'Move In & Manage', description: 'Sign your digital lease, schedule rent autopay, and manage maintenance with total peace of mind.' },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 md:gap-8">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-lg font-bold text-primary">{item.step}</span>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-1">
                                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground text-lg">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Loved by renters and landlords</h2>
                        <p className="text-lg text-muted-foreground">Real feedback from our community</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="space-y-4 p-6 rounded-lg border border-border/50">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm text-primary">
                                        {testimonial.initial}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
                <div className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Frequently asked questions</h2>
                        <p className="text-lg text-muted-foreground">Everything you need to know about renting with us</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group border border-border/50 rounded-lg p-6 hover:border-border/80 transition-colors cursor-pointer">
                                <summary className="flex items-center justify-between font-semibold text-foreground text-lg list-none">
                                    {faq.question}
                                    <span className="transition-transform group-open:rotate-180">
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </span>
                                </summary>
                                <p className="text-muted-foreground mt-4 leading-relaxed">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-12 md:p-16 text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Ready to find your next home?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join thousands of happy tenants and landlords streamlining their rental journey.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/browse">
                            <Button size="lg" className="px-8 py-6 text-base w-full sm:w-auto">
                                Browse Properties
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="px-8 py-6 text-base w-full sm:w-auto">
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-card/50 mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Platform</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/browse" className="hover:text-foreground transition">Browse Rentals</Link></li>
                                <li><a href="#" className="hover:text-foreground transition">List a Property</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Verification</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Company</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Press</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Resources</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">Tenant Guide</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Landlord Hub</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Support</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Legal</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-foreground transition">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
                        <p className="text-sm text-muted-foreground">&copy; 2026 RentNest. Built by <a className="hover:brightness-80 underline" href="https://www.dibbockb.com/" target='_blank' rel="noreferrer">@dibbockb</a></p>
                        <div className="flex gap-6 text-sm text-muted-foreground mt-4 md:mt-0">
                            <a href="#" className="hover:text-foreground transition">Twitter</a>
                            <a href="#" className="hover:text-foreground transition">GitHub</a>
                            <a href="#" className="hover:text-foreground transition">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}