import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, GraduationCap, Users } from 'lucide-react'
import './CommunityAndFaqSection.css'

export interface CommunityFaqProps {
  communityTitle?: string
  communitySubtitle?: string
  faqTitle?: string
  faqSubtitle?: string
}

export const CommunityAndFaqSection: React.FC<CommunityFaqProps> = ({
  communityTitle = 'Built around your college community.',
  communitySubtitle = 'From the people you meet to the opportunities you discover, Lumina brings your campus into one connected experience.',
  faqTitle = 'Frequently Asked Questions',
  faqSubtitle = 'Everything you need to know about Lumina.',
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const faqItems = [
    {
      question: 'What is Lumina?',
      answer:
        'Lumina is a verified college community platform connecting students, faculty, alumni, communities, opportunities, and campus experiences in one place.',
    },
    {
      question: 'Who can use Lumina?',
      answer:
        'Lumina is designed for students, faculty, alumni, clubs, communities, and college administrators, with access based on role and institutional policies.',
    },
    {
      question: 'How does college verification work?',
      answer:
        'Lumina supports college email, student ID, alumni, faculty, and administrative verification workflows depending on the institution\'s configured policies.',
    },
    {
      question: 'Can I use Lumina for study groups?',
      answer:
        'Yes. Lumina supports study groups, academic discussions, shared resources, events, and real-time communication.',
    },
    {
      question: 'Can students find internships and mentors?',
      answer:
        'Yes. Lumina includes internship discovery, placement preparation, mentorship, and alumni networking.',
    },
    {
      question: 'Does Lumina support chat?',
      answer:
        'Yes. Lumina supports personal chat, group chat, and voice-room experiences.',
    },
    {
      question: 'Is Lumina secure?',
      answer:
        'Lumina is designed around secure authentication, privacy, authorization, moderation, reporting, and accountable platform governance.',
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="community-faq-section" id="community" aria-label="Community and FAQ">
      {/* Continuous Centered Container Frame with Vertical Dashed Guide Lines */}
      <div className="community-faq-frame">
        {/* ====================================================================
            1. SECTION 3: Built around your college community.
            ==================================================================== */}
        <div className="community-block">
          <div className="community-header">
            <h2 className="community-title">{communityTitle}</h2>
            <p className="community-subtitle">{communitySubtitle}</p>
          </div>

          {/* 2-Column Side-by-Side Role Statements */}
          <div className="community-cards-grid">
            {/* Corner Crosshairs */}
            <span className="crosshair-marker crosshair-top-left" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-top-right" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>

            {/* Left Card: For Students */}
            <div className="community-card card-left">
              <div className="community-card-icon" aria-hidden="true">
                <GraduationCap className="w-6 h-6 text-white stroke-[1.6]" />
              </div>

              <div className="community-card-body">
                <h3 className="community-card-headline">For Students</h3>
                <p className="community-card-text">
                  Connect with classmates, join communities, collaborate on academics, and discover opportunities around campus.
                </p>

                {/* Author Info */}
                <div className="community-author-row">
                  <span className="community-by-label">By</span>
                  <span className="community-author-name">Student</span>
                </div>
              </div>
            </div>

            {/* Right Card: For Faculty & Alumni */}
            <div className="community-card card-right">
              <div className="community-card-icon" aria-hidden="true">
                <Users className="w-6 h-6 text-white stroke-[1.6]" />
              </div>

              <div className="community-card-body">
                <h3 className="community-card-headline">For Faculty & Alumni</h3>
                <p className="community-card-text">
                  Stay connected with students and the wider college community through collaboration, mentorship, events, and opportunities.
                </p>

                {/* Author Info */}
                <div className="community-author-row">
                  <span className="community-by-label">By</span>
                  <span className="community-author-name">Faculty & Alumni</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. Hatched Blueprint Spacer Gap with Crosshairs (+)
            ==================================================================== */}
        <div className="community-hatch-gap" aria-hidden="true">
          <span className="crosshair-marker crosshair-hatch-tl">+</span>
          <span className="crosshair-marker crosshair-hatch-tr">+</span>
          <span className="crosshair-marker crosshair-hatch-bl">+</span>
          <span className="crosshair-marker crosshair-hatch-br">+</span>
        </div>

        {/* ====================================================================
            3. SECTION 4: Frequently Asked Questions
            ==================================================================== */}
        <div className="faq-box-container" id="faq">
          {/* Left Column: Heading & Contact link */}
          <div className="faq-box-left">
            <h2 className="faq-box-title">{faqTitle}</h2>
            <p className="faq-box-sub">
              {faqSubtitle}{' '}
              <a href="#contact" className="faq-box-contact-link">
                Contact Us
              </a>
            </p>
          </div>

          {/* Right Column: Accordion List */}
          <div className="faq-box-right">
            <div className="faq-box-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index

                return (
                  <div key={index} className={`faq-box-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-box-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-box-question">{item.question}</span>
                      <span className="faq-box-chevron" aria-hidden="true">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-white/50" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/50" />
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
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="faq-box-answer-wrap"
                        >
                          <p className="faq-box-answer-text">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ====================================================================
            4. Bottom Hatched Blueprint Spacer Gap with Crosshairs (+)
            ==================================================================== */}
        <div className="community-hatch-gap" aria-hidden="true">
          <span className="crosshair-marker crosshair-hatch-tl">+</span>
          <span className="crosshair-marker crosshair-hatch-tr">+</span>
          <span className="crosshair-marker crosshair-hatch-bl">+</span>
          <span className="crosshair-marker crosshair-hatch-br">+</span>
        </div>
      </div>
    </section>
  )
}

export default CommunityAndFaqSection
