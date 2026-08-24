import React, { useEffect, useState } from 'react'

export interface Participant {
  id: string
  name: string
  username?: string
  image?: string
  isMicOn: boolean
  isCameraOn: boolean
  isSpeaking: boolean
}

export interface VideoCallContainerProps {
  callId: string
  title?: string
  type?: 'ONE_ON_ONE' | 'GROUP' | 'MENTORSHIP' | 'CLUB_MEETING' | 'FACULTY_SESSION'
  initialParticipants?: Participant[]
  onLeaveCall: () => void
  onEndCall?: () => void
}

export const VideoCallContainer: React.FC<VideoCallContainerProps> = ({
  callId,
  title = 'Lumina Video Session',
  type = 'ONE_ON_ONE',
  initialParticipants = [],
  onLeaveCall,
  onEndCall,
}) => {
  const [participants, setParticipants] = useState<Participant[]>(
    initialParticipants.length > 0
      ? initialParticipants
      : [
          {
            id: 'self',
            name: 'You (Current User)',
            isMicOn: true,
            isCameraOn: true,
            isSpeaking: false,
          },
          {
            id: 'peer_1',
            name: 'Alex Rivera',
            username: 'arivera',
            isMicOn: true,
            isCameraOn: true,
            isSpeaking: true,
          },
        ]
  )

  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [connectionState] = useState<'connecting' | 'connected' | 'reconnecting'>('connected')
  const [durationSeconds, setDurationSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDurationSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleMic = () => {
    const next = !isMicOn
    setIsMicOn(next)
    setParticipants((prev) => prev.map((p) => (p.id === 'self' ? { ...p, isMicOn: next } : p)))
  }

  const toggleCamera = () => {
    const next = !isCameraOn
    setIsCameraOn(next)
    setParticipants((prev) => prev.map((p) => (p.id === 'self' ? { ...p, isCameraOn: next } : p)))
  }

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="lumina-video-root"
      style={styles.root}
      data-call-id={callId}
    >
      {/* Top Header Bar */}
      <header style={styles.header}>
        <div style={styles.headerBrand}>
          <span style={styles.logoBadge}>✨ Lumina</span>
          <span style={styles.callTitle}>{title}</span>
          <span style={styles.typeTag}>{type.replace('_', ' ')}</span>
        </div>
        <div style={styles.headerMeta}>
          <div style={styles.connectionIndicator}>
            <span
              style={{
                ...styles.dot,
                backgroundColor: connectionState === 'connected' ? '#10B981' : '#F59E0B',
              }}
            />
            <span style={styles.statusText}>
              {connectionState === 'connected' ? 'HD Connected' : 'Reconnecting...'}
            </span>
          </div>
          <div style={styles.durationBadge}>{formatDuration(durationSeconds)}</div>
        </div>
      </header>

      {/* Participant Video Grid */}
      <main style={styles.gridContainer}>
        {participants.map((p) => (
          <div
            key={p.id}
            style={{
              ...styles.videoCard,
              border: p.isSpeaking ? '2px solid #6366F1' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: p.isSpeaking ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none',
            }}
          >
            {p.isCameraOn ? (
              <div style={styles.videoPlaceholder}>
                <div style={styles.avatarCircle}>{p.name.charAt(0)}</div>
                <span style={styles.previewText}>HD Video Feed</span>
              </div>
            ) : (
              <div style={styles.cameraOffPlaceholder}>
                <div style={styles.avatarCircleLarge}>{p.name.charAt(0)}</div>
                <span style={styles.cameraOffText}>Camera Paused</span>
              </div>
            )}

            {/* Overlay Info */}
            <div style={styles.cardOverlay}>
              <span style={styles.participantName}>{p.name}</span>
              <div style={styles.statusIcons}>
                <span style={{ ...styles.iconBadge, color: p.isMicOn ? '#10B981' : '#EF4444' }}>
                  {p.isMicOn ? '🎤' : '🔇'}
                </span>
                <span style={{ ...styles.iconBadge, color: p.isCameraOn ? '#10B981' : '#EF4444' }}>
                  {p.isCameraOn ? '📹' : '🚫'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Floating Control Toolbar */}
      <footer style={styles.controlBar}>
        <button
          onClick={toggleMic}
          style={{
            ...styles.controlBtn,
            backgroundColor: isMicOn ? 'rgba(255, 255, 255, 0.15)' : '#EF4444',
          }}
          title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {isMicOn ? '🎤' : '🔇'}
        </button>

        <button
          onClick={toggleCamera}
          style={{
            ...styles.controlBtn,
            backgroundColor: isCameraOn ? 'rgba(255, 255, 255, 0.15)' : '#EF4444',
          }}
          title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        >
          {isCameraOn ? '📹' : '🚫'}
        </button>

        <button
          onClick={onLeaveCall}
          style={styles.leaveBtn}
          title="Leave Call"
        >
          📞 Leave Call
        </button>

        {onEndCall && (
          <button
            onClick={onEndCall}
            style={styles.endBtn}
            title="End Call for All"
          >
            ⏹ End Session
          </button>
        )}
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#090D16',
    color: '#FFFFFF',
    fontFamily: 'Inter, system-ui, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoBadge: {
    fontSize: '14px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6366F1, #A855F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  callTitle: {
    fontSize: '16px',
    fontWeight: 600,
  },
  typeTag: {
    fontSize: '11px',
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: '12px',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    color: '#818CF8',
    letterSpacing: '0.5px',
  },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  connectionIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  statusText: {
    color: '#94A3B8',
  },
  durationBadge: {
    fontFamily: 'monospace',
    fontSize: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '4px 10px',
    borderRadius: '6px',
  },
  gridContainer: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '16px',
    padding: '24px',
    alignContent: 'center',
  },
  videoCard: {
    position: 'relative',
    borderRadius: '16px',
    backgroundColor: '#1E293B',
    minHeight: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  },
  videoPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  cameraOffPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    opacity: 0.6,
  },
  avatarCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#475569',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
  },
  avatarCircleLarge: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 700,
  },
  previewText: {
    fontSize: '12px',
    color: '#64748B',
  },
  cameraOffText: {
    fontSize: '13px',
    color: '#94A3B8',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '12px 16px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantName: {
    fontSize: '14px',
    fontWeight: 500,
  },
  statusIcons: {
    display: 'flex',
    gap: '8px',
  },
  iconBadge: {
    fontSize: '14px',
  },
  controlBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    background: 'rgba(15, 23, 42, 0.9)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  controlBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    color: '#FFF',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s ease',
  },
  leaveBtn: {
    padding: '12px 24px',
    borderRadius: '24px',
    border: 'none',
    backgroundColor: '#DC2626',
    color: '#FFF',
    fontWeight: 600,
    cursor: 'pointer',
  },
  endBtn: {
    padding: '12px 24px',
    borderRadius: '24px',
    border: 'none',
    backgroundColor: '#991B1B',
    color: '#FFF',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
