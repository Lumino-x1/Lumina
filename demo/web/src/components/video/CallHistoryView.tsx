import React from 'react'

export interface CallHistoryItem {
  id: string
  title: string
  type: string
  durationMinutes: number
  date: string
  createdBy: {
    name: string
    image?: string
  }
}

export interface CallHistoryViewProps {
  history: CallHistoryItem[]
  onRejoinCall?: (callId: string) => void
}

export const CallHistoryView: React.FC<CallHistoryViewProps> = ({ history, onRejoinCall }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Recent Call History</h3>
      {history.length === 0 ? (
        <div style={styles.emptyState}>No previous video calls found.</div>
      ) : (
        <div style={styles.list}>
          {history.map((item) => (
            <div
              key={item.id}
              style={styles.card}
            >
              <div style={styles.cardInfo}>
                <span style={styles.cardTitle}>{item.title}</span>
                <span style={styles.cardMeta}>
                  {item.type} · {item.date} · {item.durationMinutes} min
                </span>
              </div>
              {onRejoinCall && (
                <button
                  onClick={() => onRejoinCall(item.id)}
                  style={styles.rejoinBtn}
                >
                  Rejoin
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '24px',
    backgroundColor: '#0F172A',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '16px',
  },
  emptyState: {
    color: '#94A3B8',
    fontSize: '14px',
    padding: '16px 0',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#1E293B',
    borderRadius: '12px',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
  },
  cardMeta: {
    fontSize: '12px',
    color: '#94A3B8',
  },
  rejoinBtn: {
    padding: '6px 14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
