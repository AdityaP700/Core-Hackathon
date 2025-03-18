"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "What is ColorFi?",
      answer:
        "ColorFi is a Web3-based color trading platform that allows users to buy, sell, and trade unique digital colors as assets using Bitcoin. The platform incorporates AI-driven analytics to provide personalized recommendations and insights.",
    },
    {
      question: "How do I get started with ColorFi?",
      answer:
        "To get started, you need to connect your cryptocurrency wallet by clicking the 'Connect Wallet' or 'Get Started' button. Once connected, you can browse available colors, make transactions, and access your portfolio.",
    },
    {
      question: "What cryptocurrencies are supported?",
      answer:
        "Currently, ColorFi supports Bitcoin (BTC) for all transactions. We plan to add support for additional cryptocurrencies in the future based on user demand and market conditions.",
    },
    {
      question: "How does the color trading work?",
      answer:
        "Each color on ColorFi is a unique digital asset with its own rarity and value. You can purchase colors from the marketplace, trade them with other users, or sell them for Bitcoin. The value of colors can fluctuate based on demand and rarity.",
    },
    // {
    //   question: "What are the transaction fees?",
    //   answer:
    //     "ColorFi charges a small transaction fee for each trade, typically around 1-2% of the transaction value. These fees help maintain the platform and support ongoing development.",
    // },
    {
      question: "How does the AI analytics feature work?",
      answer:
        "Our AI analytics system analyzes market trends, user behavior, and historical data to provide personalized recommendations and insights. This can help you make more informed trading decisions and optimize your strategy.",
    },
    {
      question: "Is ColorFi secure?",
      answer:
        "Yes, security is our top priority. ColorFi uses industry-leading security measures, including encryption, secure wallet connections, and transparent blockchain transactions to ensure your assets and data are protected.",
    },
  ]

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common questions about ColorFi</p>
        </div>

        <div className="mx-auto max-w-[800px]">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="https://x.com/AdityaPat_" className="font-medium text-primary underline underline-offset-4">
              Connect on X
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

