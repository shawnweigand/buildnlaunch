'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from '@inertiajs/react'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What services do you offer?',
            answer: 'We offer comprehensive design and development services including UI/UX design, web development, mobile app development, brand identity design, digital marketing, and content creation. Our team specializes in creating beautiful, functional solutions that drive business growth.',
        },
        {
            id: 'item-2',
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary depending on scope and complexity. A simple website typically takes 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
        },
        {
            id: 'item-3',
            question: 'What is your design process?',
            answer: 'Our design process follows a proven methodology: Discovery & Research, Strategy & Planning, Design & Prototyping, Development & Testing, and Launch & Optimization. We involve you at every step to ensure the final product exceeds your expectations.',
        },
        {
            id: 'item-4',
            question: 'Do you work with clients outside your local area?',
            answer: "Yes, we work with clients worldwide! We're experienced in remote collaboration and use modern tools to ensure seamless communication regardless of location. We've successfully completed projects for clients across different time zones.",
        },
        {
            id: 'item-5',
            question: 'What makes your agency different?',
            answer: 'We combine creative excellence with technical expertise, focusing on user-centered design and measurable results. Our team stays updated with the latest trends and technologies, ensuring your project is built with modern best practices and future-proof solutions.',
        },
        {
            id: 'item-6',
            question: 'Do you provide ongoing support after project completion?',
            answer: 'Yes, we offer comprehensive post-launch support including maintenance, updates, performance monitoring, and feature enhancements. We have flexible support packages to meet your ongoing needs and ensure your project continues to perform optimally.',
        },
    ]

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 rounded-3xl mx-auto">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Discover quick and comprehensive answers to common questions about our platform, services, and features.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-background border border-muted rounded-3xl w-full px-8 py-3 shadow-sm">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-b border-muted last:border-b-0">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-muted-foreground">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 text-center">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#contact"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
