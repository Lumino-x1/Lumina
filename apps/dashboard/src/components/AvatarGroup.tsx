import React from 'react'
import './AvatarGroup.css'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  placeholder?: React.ReactNode
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  placeholder,
}) => {
  return (
    <div className={`avatar-item avatar-${size} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="avatar-img"
          loading="lazy"
          onError={(e) => {
            // Graceful fallback if external image fails to load
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <div className="avatar-placeholder">{placeholder}</div>
      )}
    </div>
  )
}

interface AvatarAddButtonProps {
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

export const AvatarAddButton: React.FC<AvatarAddButtonProps> = ({
  size = 'md',
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`avatar-add-btn avatar-${size} ${className}`}
      onClick={onClick}
      aria-label="Add Member"
      title="Add member"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  )
}

export const HeroAvatarGroup: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  return (
    <div className="avatar-group-container">
      <div className="avatar-stack">
        <Avatar
          size={size}
          alt="Olivia Rhye"
          src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Phoenix Baker"
          src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Lana Steiner"
          src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Demi Wilkinson"
          src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Candice Wu"
          src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Natali Craig"
          src="https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Drew Cano"
          src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Orlando Diggs"
          src="https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Andi Lane"
          src="https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80"
        />
        <Avatar
          size={size}
          alt="Kate Morrison"
          src="https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80"
        />
        <Avatar
          size={size}
          placeholder={<span className="avatar-overflow-count">+5</span>}
        />
      </div>
      <AvatarAddButton size={size} />
    </div>
  )
}
