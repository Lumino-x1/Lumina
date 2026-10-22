import type { LuminaBlock } from '../types'

export interface EditorTemplate {
  id: string
  title: string
  category: string
  description: string
  thumbnailUrl: string
  blocks: LuminaBlock[]
}

export const TEMPLATES_DATA: EditorTemplate[] = [
  {
    id: 'hackathon-2026',
    title: 'Campus Hackathon 2026 Poster',
    category: 'Events',
    description: 'High-impact design template for technical competitions, hackathons, and prizes.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=80',
    blocks: [
      {
        id: 't1',
        type: 'heading-1',
        content: 'Lumina HackSphere 2026',
        styles: { fontSize: 36, fontWeight: 700, color: '#ffffff', textAlign: 'center', letterSpacing: '-0.03em' },
      },
      {
        id: 't2',
        type: 'paragraph',
        content: 'Build the future of decentralized campus intelligence in 48 hours. $25,000 in prizes across Web3, AI Agents, and Community Infrastructure.',
        styles: { fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', lineHeight: 1.6 },
      },
      {
        id: 't3',
        type: 'campus-event',
        content: '',
        metadata: {
          title: 'Lumina HackSphere Opening Keynote & Team Formation',
          date: 'October 24 - 26, 2026',
          time: '6:00 PM EST',
          location: 'Main Science Auditorium & Virtual Discord',
          organizer: 'Lumina Engineering Club & Faculty Labs',
          buttonText: 'Register Hacker Team',
          buttonUrl: 'https://hackathon.lumina.edu',
        },
      },
      {
        id: 't4',
        type: 'heading-2',
        content: 'Key Challenge Tracks',
        styles: { fontSize: 22, fontWeight: 600, color: '#ffffff' },
      },
      {
        id: 't5',
        type: 'bullet-list',
        content: 'Track 1: Autonomous AI Student Mentors & Realtime Peer Tutoring',
      },
      {
        id: 't6',
        type: 'bullet-list',
        content: 'Track 2: Zero-Knowledge Student Identity & Verifiable Credentials',
      },
      {
        id: 't7',
        type: 'bullet-list',
        content: 'Track 3: Smart Campus Energy & IoT Sensor Networks',
      },
      {
        id: 't8',
        type: 'callout',
        content: 'All currently enrolled college students are eligible. Free meals, mentorship sessions, and recruiter networking hours provided throughout the event.',
        styles: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' },
      },
    ],
  },
  {
    id: 'internship-spotlight',
    title: 'Software Engineer Internship Spotlight',
    category: 'Career',
    description: 'Clean structured job posting with role specs, requirements, and direct application CTA.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    blocks: [
      {
        id: 'i1',
        type: 'heading-1',
        content: 'Summer 2027 Engineering Internship Opportunity',
        styles: { fontSize: 32, fontWeight: 700, color: '#ffffff' },
      },
      {
        id: 'i2',
        type: 'internship',
        content: '',
        metadata: {
          company: 'Lumina Core Labs',
          role: 'Full-Stack Systems Engineer Intern',
          location: 'San Francisco, CA / Remote Option',
          salary: '$55 - $70 / hr + Housing Stipend',
          deadline: 'November 15, 2026',
          applyUrl: 'https://careers.lumina.edu/jobs/swe-intern',
        },
      },
      {
        id: 'i3',
        type: 'heading-3',
        content: 'What You Will Work On',
        styles: { fontSize: 18, fontWeight: 600, color: '#ffffff' },
      },
      {
        id: 'i4',
        type: 'paragraph',
        content: 'You will work side-by-side with principal distributed systems engineers designing high-throughput messaging fabrics, Redis cache synchronization, and real-time collaboration engines serving 150+ university campuses.',
      },
      {
        id: 'i5',
        type: 'heading-3',
        content: 'Minimum Qualifications',
        styles: { fontSize: 18, fontWeight: 600, color: '#ffffff' },
      },
      {
        id: 'i6',
        type: 'checklist',
        content: 'Pursuing a B.S., M.S., or Ph.D. in Computer Science or related STEM field',
        metadata: { checked: true },
      },
      {
        id: 'i7',
        type: 'checklist',
        content: 'Proficiency in TypeScript, Go, Rust, or Python with distributed systems foundations',
        metadata: { checked: true },
      },
      {
        id: 'i8',
        type: 'checklist',
        content: 'Prior project or open-source contribution demonstrating self-directed technical execution',
        metadata: { checked: false },
      },
    ],
  },
  {
    id: 'study-guide',
    title: 'Comprehensive Midterm Study Guide',
    category: 'Study',
    description: 'Notion/Medium styled academic notes with callouts, formulas, and checklists.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80',
    blocks: [
      {
        id: 's1',
        type: 'heading-1',
        content: 'CS 341: Distributed Algorithms & Consensus Notes',
        styles: { fontSize: 32, fontWeight: 700, color: '#ffffff' },
      },
      {
        id: 's2',
        type: 'paragraph',
        content: 'Summary notes covering Paxos, Raft consensus, Byzantine Fault Tolerance (BFT), and Vector Clocks ahead of the fall examination.',
        styles: { fontSize: 15, color: 'rgba(255, 255, 255, 0.65)' },
      },
      {
        id: 's3',
        type: 'callout',
        content: 'Exam Rule Reminder: 1 double-sided handwritten 8.5x11 reference sheet allowed. Calculators not permitted.',
        styles: { backgroundColor: 'rgba(247, 243, 235, 0.15)', borderColor: 'rgba(255, 255, 255, 0.15)' },
      },
      {
        id: 's4',
        type: 'heading-2',
        content: '1. The Raft Consensus Protocol',
        styles: { fontSize: 22, fontWeight: 600, color: '#ffffff' },
      },
      {
        id: 's5',
        type: 'paragraph',
        content: 'Raft decomposes consensus into three independent sub-problems: Leader Election, Log Replication, and Safety invariants.',
      },
      {
        id: 's6',
        type: 'code',
        content: '// Raft RPC Invariant:\nif (term < currentTerm) {\n  return { success: false, term: currentTerm };\n}',
        metadata: { language: 'typescript' },
      },
      {
        id: 's7',
        type: 'heading-3',
        content: 'Review Checklist',
        styles: { fontSize: 18, fontWeight: 600, color: '#ffffff' },
      },
      {
        id: 's8',
        type: 'checklist',
        content: 'Understand split vote prevention via randomized election timeouts (150ms - 300ms)',
        metadata: { checked: true },
      },
      {
        id: 's9',
        type: 'checklist',
        content: 'Differentiate between Lamport Timestamps and Vector Clocks in causality tracking',
        metadata: { checked: false },
      },
    ],
  },
  {
    id: 'club-recruitment',
    title: 'Student Robotics Club Recruitment',
    category: 'Clubs',
    description: 'Vibrant visual card and schedule template for student organizations and recruitment drives.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80',
    blocks: [
      {
        id: 'c1',
        type: 'heading-1',
        content: 'Autonomous Robotics & Drones Society (ARDS)',
        styles: { fontSize: 32, fontWeight: 700, color: '#ffffff' },
      },
      {
        id: 'c2',
        type: 'club-card',
        content: '',
        metadata: {
          name: 'Autonomous Robotics Society',
          description: 'University robotics team competing in NASA Swarmathon, RoboSub, and Autonomous Quadcopter Racing.',
          members: '142 active members',
          joinUrl: 'https://robotics.lumina.edu/join',
        },
      },
      {
        id: 'c3',
        type: 'heading-2',
        content: 'Sub-Teams Open for Fall Applications',
        styles: { fontSize: 22, fontWeight: 600, color: '#ffffff' },
      },
      {
        id: 'c4',
        type: 'bullet-list',
        content: 'Computer Vision: Realtime SLAM, LiDAR point clouds, and Jetson Orin edge neural inference.',
      },
      {
        id: 'c5',
        type: 'bullet-list',
        content: 'Mechanical & CAD: Chassis FEA analysis, generative aluminum machining, and 3D prototyping.',
      },
      {
        id: 'c6',
        type: 'bullet-list',
        content: 'Firmware & Embedded: Low-latency STM32 motor controllers and CAN bus networking.',
      },
    ],
  },
]
