import React from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

interface CampusBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const LuminaCampusBlocks: React.FC<CampusBlockProps> = ({ block, isSelected }) => {
  const { updateBlock } = useEditorStore()

  // 1. Campus Event Card
  if (block.type === 'campus-event') {
    const meta = {
      title: block.metadata?.title || 'Annual Campus Hackathon & Demo Day',
      date: block.metadata?.date || 'October 24, 2026',
      time: block.metadata?.time || '10:00 AM - 5:00 PM',
      location: block.metadata?.location || 'Student Innovation Center & Discord',
      organizer: block.metadata?.organizer || 'Lumina Engineering Council',
      buttonText: block.metadata?.buttonText || 'Register for Event',
      buttonUrl: block.metadata?.buttonUrl || 'https://lumina.edu/events',
    }

    return (
      <div className={`lumina-campus-card is-event ${isSelected ? 'is-selected' : ''}`}>
        <div className="campus-card-badge">
          <EditorIcons.Calendar size={13} />
          <span>Official Campus Event</span>
        </div>

        <h3
          className="campus-card-title"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateBlock(block.id, {
              metadata: { ...block.metadata, title: e.currentTarget.innerText },
            })
          }
        >
          {meta.title}
        </h3>

        <div className="campus-card-details">
          <div className="detail-item">
            <EditorIcons.Clock size={14} />
            <span>{meta.date} • {meta.time}</span>
          </div>
          <div className="detail-item">
            <EditorIcons.MapPin size={14} />
            <span>{meta.location}</span>
          </div>
          <div className="detail-item">
            <EditorIcons.Users size={14} />
            <span>Hosted by {meta.organizer}</span>
          </div>
        </div>

        <button
          type="button"
          className="campus-card-cta-btn"
          onClick={() => window.open(meta.buttonUrl, '_blank')}
        >
          <span>{meta.buttonText}</span>
          <span>→</span>
        </button>
      </div>
    )
  }

  // 2. Internship Opportunity Card
  if (block.type === 'internship') {
    const meta = {
      company: block.metadata?.company || 'Lumina Core Labs',
      role: block.metadata?.role || 'Full-Stack Distributed Systems Intern',
      location: block.metadata?.location || 'San Francisco, CA (Hybrid / Remote)',
      salary: block.metadata?.salary || '$60 / hour + $4,000 Housing Stipend',
      deadline: block.metadata?.deadline || 'November 15, 2026',
      applyUrl: block.metadata?.applyUrl || 'https://careers.lumina.edu',
    }

    return (
      <div className={`lumina-campus-card is-internship ${isSelected ? 'is-selected' : ''}`}>
        <div className="campus-card-badge is-green">
          <EditorIcons.Briefcase size={13} />
          <span>Verified Student Opportunity</span>
        </div>

        <div className="internship-company-row">
          <div className="company-logo-placeholder">💼</div>
          <div>
            <h4
              className="internship-role"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBlock(block.id, {
                  metadata: { ...block.metadata, role: e.currentTarget.innerText },
                })
              }
            >
              {meta.role}
            </h4>
            <span
              className="internship-company"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBlock(block.id, {
                  metadata: { ...block.metadata, company: e.currentTarget.innerText },
                })
              }
            >
              {meta.company}
            </span>
          </div>
        </div>

        <div className="campus-card-details">
          <div className="detail-item">
            <EditorIcons.MapPin size={14} />
            <span>{meta.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-tag-pill">{meta.salary}</span>
            <span className="detail-tag-pill is-deadline">Deadline: {meta.deadline}</span>
          </div>
        </div>

        <button
          type="button"
          className="campus-card-cta-btn is-green"
          onClick={() => window.open(meta.applyUrl, '_blank')}
        >
          <span>Apply with Lumina Identity</span>
          <span>→</span>
        </button>
      </div>
    )
  }

  // 3. Club Card
  if (block.type === 'club-card') {
    const meta = {
      name: block.metadata?.name || 'Autonomous Robotics & Drones Society',
      description:
        block.metadata?.description ||
        'Student-led engineering club building autonomous quadcopters and competing in collegiate robotics leagues.',
      members: block.metadata?.members || '142 active student members',
      joinUrl: block.metadata?.joinUrl || 'https://robotics.lumina.edu',
    }

    return (
      <div className={`lumina-campus-card is-club ${isSelected ? 'is-selected' : ''}`}>
        <div className="campus-card-badge is-blue">
          <EditorIcons.GraduationCap size={13} />
          <span>Recognized Student Organization</span>
        </div>

        <h3
          className="campus-card-title"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateBlock(block.id, {
              metadata: { ...block.metadata, name: e.currentTarget.innerText },
            })
          }
        >
          {meta.name}
        </h3>

        <p
          className="campus-card-desc"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateBlock(block.id, {
              metadata: { ...block.metadata, description: e.currentTarget.innerText },
            })
          }
        >
          {meta.description}
        </p>

        <div className="campus-card-details">
          <div className="detail-item">
            <EditorIcons.Users size={14} />
            <span>{meta.members}</span>
          </div>
        </div>

        <button
          type="button"
          className="campus-card-cta-btn is-blue"
          onClick={() => window.open(meta.joinUrl, '_blank')}
        >
          <span>Request Membership</span>
          <span>→</span>
        </button>
      </div>
    )
  }

  // 4. Student Profile Card
  if (block.type === 'profile-card') {
    const meta = {
      name: block.metadata?.name || 'Caitlyn King',
      department: block.metadata?.department || 'Computer Science & AI',
      year: block.metadata?.year || 'Class of 2027',
      avatar:
        block.metadata?.avatar ||
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      skills: block.metadata?.skills || 'Distributed Systems · Next.js · Rust',
    }

    return (
      <div className={`lumina-campus-card is-profile ${isSelected ? 'is-selected' : ''}`}>
        <div className="profile-row">
          <img src={meta.avatar} alt={meta.name} className="profile-avatar-img" />
          <div className="profile-text-meta">
            <h4 className="profile-name">{meta.name}</h4>
            <span className="profile-dept">{meta.department} • {meta.year}</span>
            <div className="profile-skills-tag">{meta.skills}</div>
          </div>
          <button type="button" className="profile-connect-btn" onClick={() => alert('Connect request sent')}>
            Connect
          </button>
        </div>
      </div>
    )
  }

  // 5. Official Announcement Banner
  if (block.type === 'announcement') {
    const title = block.metadata?.title || 'Campus Advisory: Library Extended Hours for Finals'
    const desc =
      block.content ||
      'All floors of the main academic library will remain open 24/7 with peer tutoring available from 6 PM to midnight.'

    return (
      <div className={`lumina-campus-card is-announcement ${isSelected ? 'is-selected' : ''}`}>
        <div className="announcement-header">
          <EditorIcons.Megaphone size={16} />
          <span className="announcement-tag">Official Announcement</span>
        </div>
        <h4
          className="announcement-title"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateBlock(block.id, {
              metadata: { ...block.metadata, title: e.currentTarget.innerText },
            })
          }
        >
          {title}
        </h4>
        <p
          className="announcement-desc"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.innerText })}
        >
          {desc}
        </p>
      </div>
    )
  }

  // 6. Achievement Badge Card
  return (
    <div className={`lumina-campus-card is-achievement ${isSelected ? 'is-selected' : ''}`}>
      <div className="achievement-icon-wrap">
        <EditorIcons.Award size={24} />
      </div>
      <div>
        <h4 className="achievement-title">{block.metadata?.title || 'Dean’s Honor List & Research Grant'}</h4>
        <p className="achievement-desc">
          {block.content || 'Awarded for outstanding technical contribution to collegiate autonomous drone localization.'}
        </p>
      </div>
    </div>
  )
}
