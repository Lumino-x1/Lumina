import React, { useCallback, useEffect, useState } from 'react'

export interface CompanyData {
  id: string
  name: string
  logo: string | null
  website: string | null
  description: string | null
  industry: string | null
  location: string | null
}

export interface InternshipData {
  id: string
  companyId: string
  title: string
  description: string | null
  location: string | null
  stipend: number | null
  type: string
  mode: string
  status: string
  requirements: string[]
  skills: string[]
  deadline: string | null
  contactEmail: string | null
  company: CompanyData
  _count?: {
    applications: number
  }
}

export interface ApplicationData {
  id: string
  internshipId: string
  userId: string
  resumeUrl: string | null
  coverLetter: string | null
  status:
    | 'APPLIED'
    | 'REVIEWING'
    | 'SHORTLISTED'
    | 'INTERVIEW'
    | 'OFFERED'
    | 'SELECTED'
    | 'REJECTED'
    | 'WITHDRAWN'
  notes: string | null
  createdAt: string
  internship: InternshipData
}

interface InternshipsViewProps {
  onBackToHome: () => void
}

export default function InternshipsView({ onBackToHome }: InternshipsViewProps) {
  const [activeTab, setActiveTab] = useState<'explore' | 'my-applications' | 'recruiter'>('explore')
  const [internships, setInternships] = useState<InternshipData[]>([])
  const [companies, setCompanies] = useState<CompanyData[]>([])
  const [myApplications, setMyApplications] = useState<ApplicationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [managedApplications, setManagedApplications] = useState<any[]>([])
  const [managingInternship, setManagingInternship] = useState<InternshipData | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMode, setSelectedMode] = useState<string>('ALL')
  const [selectedType, setSelectedType] = useState<string>('ALL')

  // Selected Internship for Detail / Apply Modal
  const [selectedInternship, setSelectedInternship] = useState<InternshipData | null>(null)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [coverLetterInput, setCoverLetterInput] = useState('')
  const [resumeUrlInput, setResumeUrlInput] = useState('https://example.com/resumes/my_resume.pdf')
  const [uploadingResume, setUploadingResume] = useState(false)
  const [uploadedResumeName, setUploadedResumeName] = useState<string | null>(null)
  const [applicationSuccessMsg, setApplicationSuccessMsg] = useState<string | null>(null)

  // Recruiter Posting State
  const [isNewInternshipModalOpen, setIsNewInternshipModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCompanyId, setNewCompanyId] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newStipend, setNewStipend] = useState('4000')
  const [newMode] = useState('HYBRID')
  const [newType] = useState('FULL_TIME')
  const [newSkills] = useState('React, TypeScript, Node.js')

  const api = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1'
  const unwrap = (value: any) => value?.data ?? value
  const request = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const response = await fetch(api + path, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      })
      const payload = response.status === 204 ? null : await response.json().catch(() => null)
      if (!response.ok) throw new Error(payload?.message || payload?.error || 'Request failed')
      return unwrap(payload)
    },
    [api]
  )

  const asList = (value: any, key: string) =>
    Array.isArray(value) ? value : value?.[key] || value?.items || []

  const loadPortal = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [internshipData, companyData, applicationData] = await Promise.all([
        request('/internships'),
        request('/internships/companies'),
        request('/internships/my-applications').catch(() => []),
      ])
      setInternships(asList(internshipData, 'internships'))
      const loadedCompanies = asList(companyData, 'companies')
      setCompanies(loadedCompanies)
      setMyApplications(asList(applicationData, 'applications'))
      if (loadedCompanies[0]) setNewCompanyId((prev) => prev || loadedCompanies[0].id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [request])

  useEffect(() => {
    void loadPortal()
  }, [loadPortal])

  const handleResumeFileUpload = async (file: File) => {
    setUploadingResume(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const res = await fetch(api + '/internships/resume', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Resume upload failed')
      if (data?.resumeUrl) {
        setResumeUrlInput(data.resumeUrl)
        setUploadedResumeName(file.name)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to upload resume file')
    } finally {
      setUploadingResume(false)
    }
  }

  // Filtered Internships
  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesMode = selectedMode === 'ALL' || item.mode === selectedMode
    const matchesType = selectedType === 'ALL' || item.type === selectedType
    return matchesSearch && matchesMode && matchesType
  })

  // Apply Action
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInternship) return
    setSubmitting(true)
    setApplicationSuccessMsg(null)
    try {
      await request('/internships/' + selectedInternship.id + '/apply', {
        method: 'POST',
        body: JSON.stringify({
          resumeUrl: resumeUrlInput || undefined,
          coverLetter: coverLetterInput || undefined,
        }),
      })
      await loadPortal()
      setApplicationSuccessMsg('Application submitted successfully!')
      setTimeout(() => {
        setIsApplyModalOpen(false)
        setSelectedInternship(null)
        setApplicationSuccessMsg(null)
        setCoverLetterInput('')
      }, 900)
    } catch (e: any) {
      setApplicationSuccessMsg(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Withdraw Action
  const handleWithdraw = async (applicationId: string) => {
    const application = myApplications.find((item) => item.id === applicationId)
    if (!application) return
    setSubmitting(true)
    try {
      await request('/internships/' + application.internshipId + '/withdraw', { method: 'POST' })
      await loadPortal()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteInternship = async (internship: InternshipData) => {
    if (!window.confirm('Delete "' + internship.title + '"? This cannot be undone.')) return
    setSubmitting(true)
    try {
      await request('/internships/' + internship.id, { method: 'DELETE' })
      await loadPortal()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }
  const handleEditInternship = async (internship: InternshipData) => {
    const title = window.prompt('Internship title', internship.title)
    if (title === null || !title.trim()) return
    const location = window.prompt('Location', internship.location || '')
    const description = window.prompt('Description', internship.description || '')
    try {
      await request('/internships/' + internship.id, {
        method: 'PATCH',
        body: JSON.stringify({
          title: title.trim(),
          location: location ?? internship.location,
          description: description ?? internship.description,
        }),
      })
      await loadPortal()
    } catch (e: any) {
      setError(e.message)
    }
  }
  const handleManageApplicants = async (internship: InternshipData) => {
    setManagingInternship(internship)
    setManagedApplications([])
    setLoading(true)
    try {
      const data = await request('/internships/' + internship.id + '/applications')
      setManagedApplications(asList(data, 'applications'))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  const handleApplicationStatus = async (applicationId: string, status: string) => {
    try {
      await request('/internships/applications/' + applicationId + '/status', {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      if (managingInternship) await handleManageApplicants(managingInternship)
      await loadPortal()
    } catch (e: any) {
      setError(e.message)
    }
  }
  const handleCreateCompany = async () => {
    const name = window.prompt('Company name')
    if (!name?.trim()) return
    const website = window.prompt('Website (optional)')
    try {
      await request('/internships/companies', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), website: website || undefined }),
      })
      await loadPortal()
    } catch (e: any) {
      setError(e.message)
    }
  }
  const handleEditCompany = async (company: CompanyData) => {
    const name = window.prompt('Company name', company.name)
    if (!name?.trim()) return
    try {
      await request('/internships/companies/' + company.id, {
        method: 'PATCH',
        body: JSON.stringify({ name: name.trim() }),
      })
      await loadPortal()
    } catch (e: any) {
      setError(e.message)
    }
  }

  // Recruiter Create Internship Action
  const handleCreateInternship = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await request('/internships', {
        method: 'POST',
        body: JSON.stringify({
          companyId: newCompanyId,
          title: newTitle,
          description: newDescription || undefined,
          location: newLocation || undefined,
          stipend: Number(newStipend) || undefined,
          mode: newMode,
          type: newType,
          skills: newSkills
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      })
      await loadPortal()
      setIsNewInternshipModalOpen(false)
      setNewTitle('')
      setNewDescription('')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#090d16',
        color: '#f3f4f6',
        minHeight: '100vh',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {error && (
        <div style={{ backgroundColor: '#451a1a', color: '#fecaca', padding: '12px 24px' }}>
          {error}
        </div>
      )}
      {loading && (
        <div style={{ padding: '12px 24px', color: '#93c5fd' }}>Loading internship portal…</div>
      )}
      {/* Top Bar Navigation */}
      <header
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onBackToHome}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#94a3b8',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
            >
              ← Home
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-[#3b82f6,#8b5cf6]',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                }}
              >
                💼
              </div>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}
              >
                Internship Portal
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <button
              onClick={() => setActiveTab('explore')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'explore' ? '#3b82f6' : 'transparent',
                color: activeTab === 'explore' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              Explore Internships
            </button>
            <button
              onClick={() => setActiveTab('my-applications')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'my-applications' ? '#3b82f6' : 'transparent',
                color: activeTab === 'my-applications' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              My Applications ({myApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('recruiter')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'recruiter' ? '#3b82f6' : 'transparent',
                color: activeTab === 'recruiter' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              Career Office / Post Listing
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* TAB 1: EXPLORE INTERNSHIPS */}
        {activeTab === 'explore' && (
          <div>
            {/* Hero Search Banner */}
            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(30,58,138,0.4) 0%, rgba(88,28,135,0.4) 100%)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '32px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h2
                style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0', color: '#f8fafc' }}
              >
                Launch Your Career with Top Campus & Tech Internships
              </h2>
              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '15px',
                  margin: '0 0 24px 0',
                  maxWidth: '600px',
                }}
              >
                Verified openings from top technology firms and campus partner startups. Apply with
                one-click resume verification.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search title, company, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '260px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#fff',
                    fontSize: '15px',
                  }}
                />
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#fff',
                    fontSize: '15px',
                  }}
                >
                  <option value="ALL">All Work Modes</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ONSITE">Onsite</option>
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#fff',
                    fontSize: '15px',
                  }}
                >
                  <option value="ALL">All Job Types</option>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                </select>
              </div>
            </div>

            {/* Internship Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredInternships.map((internship) => {
                const hasApplied = myApplications.some((a) => a.internshipId === internship.id)
                return (
                  <div
                    key={internship.id}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s, border-color 0.2s',
                    }}
                  >
                    <div>
                      {/* Header Info */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          marginBottom: '16px',
                        }}
                      >
                        <img
                          src={internship.company.logo || 'https://via.placeholder.com/60'}
                          alt={internship.company.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                        <div>
                          <h3
                            style={{
                              fontSize: '18px',
                              fontWeight: 700,
                              margin: '0 0 2px 0',
                              color: '#f8fafc',
                            }}
                          >
                            {internship.title}
                          </h3>
                          <span style={{ fontSize: '14px', color: '#60a5fa', fontWeight: 600 }}>
                            {internship.company.name}
                          </span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap',
                          marginBottom: '14px',
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            color: '#60a5fa',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          📍 {internship.location}
                        </span>
                        <span
                          style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#34d399',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          💰 ${internship.stipend}/mo
                        </span>
                        <span
                          style={{
                            backgroundColor: 'rgba(168, 85, 247, 0.15)',
                            color: '#c084fc',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          ⚡ {internship.mode}
                        </span>
                      </div>

                      <p
                        style={{
                          color: '#94a3b8',
                          fontSize: '14px',
                          lineHeight: 1.5,
                          margin: '0 0 16px 0',
                        }}
                      >
                        {internship.description}
                      </p>

                      {/* Required Skills */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '6px',
                          flexWrap: 'wrap',
                          marginBottom: '20px',
                        }}
                      >
                        {internship.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              color: '#cbd5e1',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                            }}
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '16px',
                      }}
                    >
                      <span style={{ fontSize: '13px', color: '#64748b' }}>
                        👥 {internship._count?.applications || 0} Applicants
                      </span>

                      <button
                        onClick={() => {
                          setSelectedInternship(internship)
                          setIsApplyModalOpen(true)
                        }}
                        style={{
                          backgroundColor: hasApplied ? 'rgba(16, 185, 129, 0.2)' : '#3b82f6',
                          color: hasApplied ? '#34d399' : '#ffffff',
                          border: hasApplied ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        {hasApplied ? '✓ Applied' : 'View & Apply'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MY APPLICATIONS */}
        {activeTab === 'my-applications' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
              Student Application Tracking Dashboard
            </h2>

            {myApplications.length === 0 ? (
              <div
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(15,23,42,0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p style={{ color: '#94a3b8' }}>
                  You haven't submitted any internship applications yet.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {myApplications.map((app) => {
                  let statusColor = '#3b82f6'
                  let statusBg = 'rgba(59,130,246,0.15)'
                  if (app.status === 'SHORTLISTED' || app.status === 'INTERVIEW') {
                    statusColor = '#f59e0b'
                    statusBg = 'rgba(245,158,11,0.15)'
                  } else if (app.status === 'OFFERED' || app.status === 'SELECTED') {
                    statusColor = '#10b981'
                    statusBg = 'rgba(16,185,129,0.15)'
                  } else if (app.status === 'REJECTED' || app.status === 'WITHDRAWN') {
                    statusColor = '#ef4444'
                    statusBg = 'rgba(239,68,68,0.15)'
                  }

                  return (
                    <div
                      key={app.id}
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '14px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img
                          src={app.internship.company.logo || 'https://via.placeholder.com/60'}
                          alt={app.internship.company.name}
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                          }}
                        />
                        <div>
                          <h3
                            style={{
                              fontSize: '18px',
                              fontWeight: 700,
                              margin: '0 0 4px 0',
                              color: '#f8fafc',
                            }}
                          >
                            {app.internship.title}
                          </h3>
                          <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                            {app.internship.company.name} • Applied on{' '}
                            {new Date(app.createdAt).toLocaleDateString()}
                          </div>
                          {app.notes && (
                            <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#fbbf24' }}>
                              📝 Note: {app.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontWeight: 700,
                            fontSize: '13px',
                            color: statusColor,
                            backgroundColor: statusBg,
                            border: `1px solid ${statusColor}44`,
                          }}
                        >
                          {app.status}
                        </span>

                        {app.status !== 'WITHDRAWN' && app.status !== 'REJECTED' && (
                          <button
                            onClick={() => handleWithdraw(app.id)}
                            style={{
                              backgroundColor: 'transparent',
                              color: '#ef4444',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '13px',
                            }}
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RECRUITER & CAREER OFFICE */}
        {activeTab === 'recruiter' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px 0' }}>
                  Career Office & Company Portal
                </h2>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
                  Post new verified internship openings and review student applications.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleCreateCompany}
                  style={{
                    backgroundColor: 'rgba(59,130,246,0.15)',
                    color: '#93c5fd',
                    border: '1px solid rgba(59,130,246,0.35)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  + Company
                </button>
                {companies.length > 0 && (
                  <button
                    onClick={() => {
                      const company = companies[0]
                      if (company) void handleEditCompany(company)
                    }}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit Company
                  </button>
                )}
                <button
                  onClick={() => setIsNewInternshipModalOpen(true)}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  + Post New Internship
                </button>
              </div>
            </div>

            {/* List of Managed Postings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {internships.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 4px 0' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
                      {item.company.name} • {item.location} • Stipend: ${item.stipend}/mo
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(16,185,129,0.15)',
                        color: '#34d399',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleEditInternship(item)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInternship(item)}
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        color: '#fca5a5',
                        border: '1px solid rgba(239,68,68,0.3)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleManageApplicants(item)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      Manage Applicants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {managingInternship && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 120,
            overflow: 'auto',
            padding: '32px',
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: '#0f172a',
              padding: '24px',
              borderRadius: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>Applicants — {managingInternship.title}</h3>
              <button onClick={() => setManagingInternship(null)}>Close</button>
            </div>
            {managedApplications.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>No applications yet.</p>
            ) : (
              managedApplications.map((app) => (
                <div
                  key={app.id}
                  style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,.1)' }}
                >
                  <strong>{app.user?.name || app.user?.email || 'Student'}</strong>
                  <div style={{ color: '#94a3b8', fontSize: '13px' }}>{app.user?.email}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {[
                      'APPLIED',
                      'REVIEWING',
                      'SHORTLISTED',
                      'INTERVIEW',
                      'OFFERED',
                      'SELECTED',
                      'REJECTED',
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleApplicationStatus(app.id, status)}
                        disabled={app.status === status}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {/* MODAL: APPLY TO INTERNSHIP */}
      {isApplyModalOpen && selectedInternship && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '560px',
              padding: '28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
                Apply to {selectedInternship.title}
              </h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {applicationSuccessMsg ? (
              <div
                style={{
                  backgroundColor: 'rgba(16,185,129,0.2)',
                  color: '#34d399',
                  border: '1px solid rgba(16,185,129,0.4)',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                {applicationSuccessMsg}
              </div>
            ) : (
              <form
                onSubmit={handleApply}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}
                  >
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#cbd5e1',
                      }}
                    >
                      Resume Document / URL
                    </label>
                    <label
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: '#60a5fa',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: uploadingResume ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {uploadingResume ? 'Uploading...' : '📁 Upload PDF/DOCX'}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        disabled={uploadingResume}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) void handleResumeFileUpload(file)
                        }}
                      />
                    </label>
                  </div>
                  {uploadedResumeName && (
                    <div style={{ fontSize: '12px', color: '#34d399', marginBottom: '6px' }}>
                      ✓ Uploaded: {uploadedResumeName}
                    </div>
                  )}
                  <input
                    type="url"
                    required
                    value={resumeUrlInput}
                    onChange={(e) => setResumeUrlInput(e.target.value)}
                    placeholder="https://... or upload file above"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: 'rgba(30,41,59,0.8)',
                      color: '#fff',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#cbd5e1',
                      marginBottom: '6px',
                    }}
                  >
                    Cover Letter / Statement of Interest
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your background and why you are a great fit..."
                    value={coverLetterInput}
                    onChange={(e) => setCoverLetterInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: 'rgba(30,41,59,0.8)',
                      color: '#fff',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    marginTop: '12px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#94a3b8',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: POST NEW INTERNSHIP */}
      {isNewInternshipModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '600px',
              padding: '28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
                Post New Internship Listing
              </h3>
              <button
                onClick={() => setIsNewInternshipModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateInternship}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#cbd5e1',
                    marginBottom: '4px',
                  }}
                >
                  Company
                </label>
                <select
                  value={newCompanyId}
                  onChange={(e) => setNewCompanyId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                  }}
                >
                  {companies.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#cbd5e1',
                    marginBottom: '4px',
                  }}
                >
                  Internship Title
                </label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Frontend Engineering Intern"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#cbd5e1',
                    marginBottom: '4px',
                  }}
                >
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Role responsibilities..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      color: '#cbd5e1',
                      marginBottom: '4px',
                    }}
                  >
                    Stipend ($/mo)
                  </label>
                  <input
                    type="number"
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      color: '#cbd5e1',
                      marginBottom: '4px',
                    }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. San Francisco / Remote"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                  marginTop: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsNewInternshipModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Publishing...' : 'Publish Posting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
