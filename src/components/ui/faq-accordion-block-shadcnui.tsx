import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CometCardDemo from "./comet-card-demo";

export function FAQAccordionBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI Scam Analyzer work?",
      answer: "Our AI model analyzes patterns, language markers, and known fraudulent database links to determine if a message is suspicious. It evaluates the context and intent of the sender in real time."
    },
    {
      question: "Can I use ScamShield for free?",
      answer: "Yes, our core safety tools, including the Scam Analyzer and Learning Hub, are completely free for individual users. We believe digital safety should be accessible to everyone."
    },
    {
      question: "Which languages are supported?",
      answer: "Currently, we support English, Hindi (हिंदी), and Kannada (ಕನ್ನಾಡ). We are actively working on adding more regional languages to ensure everyone can stay protected locally."
    },
    {
      question: "How do I report a new scam?",
      answer: "Use our 'Report a Scam' form on the contact page. Your report helps train our AI and protects other users by adding new fraud patterns to our detection database."
    },
    {
      question: "Is my pasted data stored?",
      answer: "We prioritize your privacy. Pasted snippets for analysis are processed and then discarded. We only store anonymized fraud patterns to improve our detection algorithms."
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-background to-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="mr-1 h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Have a question? We've got answers. If you don't find what you're looking for, please check our documentation or security guides.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Accordion - Left Side */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="overflow-hidden border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-md">
                    <motion.button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-4 text-left md:p-6"
                      whileHover={{
                        backgroundColor: "rgba(var(--primary), 0.03)",
                      }}
                    >
                      <span className="pr-4 text-base font-semibold md:text-lg">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border/50 p-4 md:p-6" key="content">
                            <motion.p
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              className="text-sm text-muted-foreground md:text-base"
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Comet Card Demo - Right Side */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CometCardDemo />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
