'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import './FaqSection.css'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const defaultFaqItems: FaqItem[] = [
  {
    id: 'free-plan',
    question: 'Is there a free plan?',
    answer:
      'Yes. Start for free and explore the full dashboard, no card required. Upgrade only when you need more seats or higher limits.',
  },
  {
    id: 'change-plans',
    question: 'Can I change plans later?',
    answer:
      'Yes, you can upgrade, downgrade, or switch plans at any time directly from your account settings with prorated billing.',
  },
  {
    id: 'data-safe',
    question: 'How is my data kept safe?',
    answer:
      'We use end-to-end encryption, student credential verification, and strict data privacy compliance to keep all your campus information protected.',
  },
  {
    id: 'team-accounts',
    question: 'Do you offer team accounts?',
    answer:
      'Yes, student organizations, campus clubs, and university departments can create shared team workspaces with custom roles and permissions.',
  },
  {
    id: 'need-help',
    question: 'What if I need help?',
    answer:
      'Our dedicated support team and active campus community Discord are available 24/7. You can reach out through live chat or email anytime.',
  },
]

export interface FaqSectionProps {
  items?: FaqItem[]
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items = defaultFaqItems,
}) => {
  // First item open by default as in the reference design
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="faq-framed-container">
        {/* Left Column: Heading & Subtitle */}
        <div className="faq-left-col">
          <span className="faq-kicker">FAQ</span>
          <h2 className="faq-serif-title">Questions, answered.</h2>
          <p className="faq-description">
            The things people ask most often. Still stuck? Reach out and we'll walk you through it.
          </p>
        </div>

        {/* Right Column: Accordion List */}
        <div className="faq-right-col">
          <div className="faq-accordion-wrap">
            {items.map((item) => {
              const isOpen = openId === item.id

              return (
                <div key={item.id} className={`faq-row-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-row-btn"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-row-question">{item.question}</span>
                    <span className="faq-row-chevron" aria-hidden="true">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="faq-row-answer-box"
                      >
                        <p className="faq-row-answer-text">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
