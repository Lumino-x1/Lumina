import React from 'react'

export interface IncomingCallModalProps {
  isOpen: boolean
  callerName: string
  callerAvatar?: string
  callType?: string
  onAccept: () => void
  onReject: () => void
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  isOpen,
  callerName,
  callerAvatar,
  callType = 'One-on-One Video Call',
  onAccept,
  onReject,
}) => {
  if (!isOpen) return null

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.avatarWrapper}>
          {callerAvatar ? (
            <img
              src={callerAvatar}
              alt={callerName}
              style={styles.avatar}
            />
          ) : (
            <div style={styles.avatarFallback}>{callerName.charAt(0)}</div>
          )}
        </div>

        <h3 style={styles.callerName}>{callerName}</h3>
        <p style={styles.callType}>{callType}</p>
        <p style={styles.ringingText}>Incoming Lumina Video Call...</p>

        <div style={styles.actionGroup}>
          <button
            onClick={onReject}
            style={styles.rejectBtn}
          >
            🚫 Decline
          </button>
          <button
            onClick={onAccept}
            style={styles.acceptBtn}
          >
            📹 Accept Call
          </button>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#0F172A',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
  avatarWrapper: {
    marginBottom: '16px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarFallback: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    fontSize: '32px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callerName: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#F8FAFC',
    margin: '0 0 4px 0',
  },
  callType: {
    fontSize: '13px',
    color: '#818CF8',
    margin: '0 0 12px 0',
  },
  ringingText: {
    fontSize: '14px',
    color: '#94A3B8',
    marginBottom: '24px',
  },
  actionGroup: {
    display: 'flex',
    gap: '16px',
    width: '100%',
  },
  rejectBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    fontWeight: 600,
    cursor: 'pointer',
  },
  acceptBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
