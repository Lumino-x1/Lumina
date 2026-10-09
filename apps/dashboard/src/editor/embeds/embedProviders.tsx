import React from 'react'

export interface EmbedParsedData {
  provider: string
  id?: string
  embedUrl?: string
  title?: string
  author?: string
  description?: string
  thumbnail?: string
  extra?: Record<string, any>
}

export interface EmbedProvider {
  name: string
  canHandle(url: string): boolean
  parse(url: string): EmbedParsedData | null
  render(data: EmbedParsedData, originalUrl: string): React.ReactNode
}

// 1. YouTube Provider
export const YouTubeProvider: EmbedProvider = {
  name: 'YouTube',
  canHandle(url: string) {
    return /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)/i.test(url)
  },
  parse(url: string) {
    let videoId = ''
    try {
      const parsed = new URL(url)
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.slice(1)
      } else if (parsed.pathname.includes('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1]?.split('/')[0] || ''
      } else if (parsed.pathname.includes('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1]?.split('/')[0] || ''
      } else {
        videoId = parsed.searchParams.get('v') || ''
      }
    } catch {
      return null
    }

    if (!videoId) return null
    return {
      provider: 'YouTube',
      id: videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
      title: 'YouTube Video',
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-media-ratio">
        <iframe
          src={data.embedUrl}
          title={data.title || 'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  },
}

// 2. Vimeo Provider
export const VimeoProvider: EmbedProvider = {
  name: 'Vimeo',
  canHandle(url: string) {
    return /vimeo\.com\/(?:video\/)?(\d+)/i.test(url)
  },
  parse(url: string) {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
    const id = match ? match[1] : ''
    if (!id) return null
    return {
      provider: 'Vimeo',
      id,
      embedUrl: `https://player.vimeo.com/video/${id}`,
      title: 'Vimeo Video',
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-media-ratio">
        <iframe
          src={data.embedUrl}
          title={data.title || 'Vimeo video player'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  },
}

// 3. Spotify Provider
export const SpotifyProvider: EmbedProvider = {
  name: 'Spotify',
  canHandle(url: string) {
    return /open\.spotify\.com\/(track|album|playlist|artist|episode)\/([a-zA-Z0-9]+)/i.test(url)
  },
  parse(url: string) {
    const match = url.match(/open\.spotify\.com\/(track|album|playlist|artist|episode)\/([a-zA-Z0-9]+)/i)
    if (!match) return null
    const type = match[1]
    const id = match[2]
    return {
      provider: 'Spotify',
      id,
      embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
      title: `Spotify ${type}`,
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-spotify-wrap">
        <iframe
          src={data.embedUrl}
          height="152"
          width="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: '12px', border: 'none' }}
        />
      </div>
    )
  },
}

// 4. CodePen Provider
export const CodePenProvider: EmbedProvider = {
  name: 'CodePen',
  canHandle(url: string) {
    return /codepen\.io\/([^/]+)\/pen\/([^/?#]+)/i.test(url)
  },
  parse(url: string) {
    const match = url.match(/codepen\.io\/([^/]+)\/pen\/([^/?#]+)/i)
    if (!match) return null
    const user = match[1]
    const slug = match[2]
    return {
      provider: 'CodePen',
      id: slug,
      author: user,
      embedUrl: `https://codepen.io/${user}/embed/${slug}?default-tab=result&theme-id=dark`,
      title: `CodePen by @${user}`,
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-media-ratio is-codepen">
        <iframe
          src={data.embedUrl}
          title={data.title || 'CodePen Embed'}
          loading="lazy"
          style={{ width: '100%', height: '400px', border: 'none', borderRadius: '8px' }}
        />
      </div>
    )
  },
}

// 5. Figma Provider
export const FigmaProvider: EmbedProvider = {
  name: 'Figma',
  canHandle(url: string) {
    return /figma\.com\/(file|design|proto)\/([a-zA-Z0-9]+)/i.test(url)
  },
  parse(url: string) {
    return {
      provider: 'Figma',
      embedUrl: `https://www.figma.com/embed?embed_host=lumina&url=${encodeURIComponent(url)}`,
      title: 'Figma Design Canvas',
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-media-ratio is-figma">
        <iframe
          src={data.embedUrl}
          title={data.title || 'Figma Embed'}
          allowFullScreen
          loading="lazy"
          style={{ width: '100%', height: '450px', border: 'none', borderRadius: '8px' }}
        />
      </div>
    )
  },
}

// 6. SoundCloud Provider
export const SoundCloudProvider: EmbedProvider = {
  name: 'SoundCloud',
  canHandle(url: string) {
    return /soundcloud\.com\/[^/]+\/[^/?#]+/i.test(url)
  },
  parse(url: string) {
    return {
      provider: 'SoundCloud',
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%232563eb&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false`,
      title: 'SoundCloud Audio',
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-audio-wrap">
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={data.embedUrl}
          style={{ borderRadius: '8px' }}
        />
      </div>
    )
  },
}

// 7. GitHub Provider
export const GitHubProvider: EmbedProvider = {
  name: 'GitHub',
  canHandle(url: string) {
    return /github\.com\/([^/]+)\/([^/?#]+)/i.test(url) && !url.includes('gist.github.com')
  },
  parse(url: string) {
    const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i)
    if (!match) return null
    const owner = match[1]
    const repo = match[2]
    return {
      provider: 'GitHub',
      id: `${owner}/${repo}`,
      title: `${owner}/${repo}`,
      author: owner,
      description: `GitHub open source repository by ${owner}`,
    }
  },
  render(data, originalUrl) {
    return (
      <div className="lumina-provider-card is-github">
        <div className="provider-card-header">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="provider-tag">GitHub Repository</span>
        </div>
        <h3 className="provider-card-title">{data.title}</h3>
        <p className="provider-card-desc">{data.description}</p>
        <div className="provider-card-footer">
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="provider-card-btn">
            View on GitHub →
          </a>
        </div>
      </div>
    )
  },
}

// 8. GitHub Gist Provider
export const GitHubGistProvider: EmbedProvider = {
  name: 'GitHub Gist',
  canHandle(url: string) {
    return /gist\.github\.com\/([^/]+)\/([a-zA-Z0-9]+)/i.test(url)
  },
  parse(url: string) {
    const match = url.match(/gist\.github\.com\/([^/]+)\/([a-zA-Z0-9]+)/i)
    if (!match) return null
    const user = match[1]
    const id = match[2]
    return {
      provider: 'GitHub Gist',
      id,
      author: user,
      title: `Gist: ${id}`,
      description: `Code snippet shared by @${user} on GitHub Gist`,
    }
  },
  render(data, originalUrl) {
    return (
      <div className="lumina-provider-card is-gist">
        <div className="provider-card-header">
          <span className="provider-tag">📄 GitHub Gist</span>
          <span className="provider-author">by @{data.author}</span>
        </div>
        <h4 className="provider-card-title">{data.title}</h4>
        <p className="provider-card-desc">{data.description}</p>
        <div className="provider-card-footer">
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="provider-card-btn">
            Open Gist Code →
          </a>
        </div>
      </div>
    )
  },
}

// 9. X / Twitter Provider
export const TwitterProvider: EmbedProvider = {
  name: 'X (Twitter)',
  canHandle(url: string) {
    return /(?:twitter\.com|x\.com)\/([^/]+)\/status\/(\d+)/i.test(url)
  },
  parse(url: string) {
    const match = url.match(/(?:twitter\.com|x\.com)\/([^/]+)\/status\/(\d+)/i)
    if (!match) return null
    const handle = match[1]
    const id = match[2]
    return {
      provider: 'X (Twitter)',
      id,
      author: handle,
      title: `Post by @${handle}`,
      description: `View post on X (formerly Twitter)`,
    }
  },
  render(data, originalUrl) {
    return (
      <div className="lumina-provider-card is-x">
        <div className="provider-card-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="provider-author">@{data.author}</span>
        </div>
        <p className="provider-card-desc">Click below to read full thread on X</p>
        <div className="provider-card-footer">
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="provider-card-btn">
            View Post on X →
          </a>
        </div>
      </div>
    )
  },
}

// 10. Google Drive & Docs Provider
export const GoogleDriveProvider: EmbedProvider = {
  name: 'Google Drive',
  canHandle(url: string) {
    return /(?:drive|docs)\.google\.com\/(?:document|spreadsheets|presentation|file)\/d\/([a-zA-Z0-9_-]+)/i.test(url)
  },
  parse(url: string) {
    const match = url.match(/(?:drive|docs)\.google\.com\/(?:document|spreadsheets|presentation|file)\/d\/([a-zA-Z0-9_-]+)/i)
    const id = match ? match[1] : ''
    let embedUrl = ''
    if (url.includes('/document/')) {
      embedUrl = `https://docs.google.com/document/d/${id}/pub?embedded=true`
    } else if (url.includes('/presentation/')) {
      embedUrl = `https://docs.google.com/presentation/d/${id}/embed`
    } else {
      embedUrl = `https://drive.google.com/file/d/${id}/preview`
    }
    return {
      provider: 'Google Drive',
      id,
      embedUrl,
      title: 'Google Drive Document',
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-media-ratio is-drive">
        <iframe
          src={data.embedUrl}
          title={data.title || 'Google Drive Preview'}
          loading="lazy"
          style={{ width: '100%', height: '420px', border: 'none', borderRadius: '8px' }}
        />
      </div>
    )
  },
}

// 11. Google Maps Provider
export const GoogleMapsProvider: EmbedProvider = {
  name: 'Google Maps',
  canHandle(url: string) {
    return /(?:maps\.google\.com|google\.com\/maps)/i.test(url)
  },
  parse(url: string) {
    return {
      provider: 'Google Maps',
      embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`,
      title: 'Interactive Google Map',
    }
  },
  render(data) {
    return (
      <div className="lumina-embed-media-ratio is-maps">
        <iframe
          src={data.embedUrl}
          title={data.title || 'Google Maps Embed'}
          loading="lazy"
          style={{ width: '100%', height: '360px', border: 'none', borderRadius: '8px' }}
        />
      </div>
    )
  },
}

// 12. LinkedIn Provider
export const LinkedInProvider: EmbedProvider = {
  name: 'LinkedIn',
  canHandle(url: string) {
    return /linkedin\.com\/(?:posts|feed\/update)\//i.test(url)
  },
  parse(_url: string) {
    return {
      provider: 'LinkedIn',
      title: 'LinkedIn Publication',
      description: 'Professional update shared on LinkedIn',
    }
  },
  render(data, originalUrl) {
    return (
      <div className="lumina-provider-card is-linkedin">
        <div className="provider-card-header">
          <span className="provider-tag">💼 LinkedIn Post</span>
        </div>
        <p className="provider-card-desc">{data.description}</p>
        <div className="provider-card-footer">
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="provider-card-btn">
            Open on LinkedIn →
          </a>
        </div>
      </div>
    )
  },
}

// Master Provider Registry
export const EMBED_PROVIDERS: EmbedProvider[] = [
  YouTubeProvider,
  VimeoProvider,
  SpotifyProvider,
  CodePenProvider,
  FigmaProvider,
  SoundCloudProvider,
  GitHubGistProvider,
  GitHubProvider,
  TwitterProvider,
  GoogleDriveProvider,
  GoogleMapsProvider,
  LinkedInProvider,
]

export function getEmbedProvider(url: string): EmbedProvider | null {
  for (const provider of EMBED_PROVIDERS) {
    if (provider.canHandle(url)) {
      return provider
    }
  }
  return null
}

export function renderFallbackPreviewCard(url: string, title?: string, description?: string): React.ReactNode {
  let hostname = 'Web Link'
  try {
    hostname = new URL(url).hostname
  } catch {
    // ignore
  }

  return (
    <div className="lumina-embed-card">
      <div className="embed-card-inner">
        <div className="embed-card-meta">
          <span className="embed-domain">🔗 {hostname}</span>
          <h4 className="embed-title">{title || `Resource from ${hostname}`}</h4>
          <p className="embed-desc">{description || url}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="embed-visit-link"
            onClick={(e) => e.stopPropagation()}
          >
            Visit external resource →
          </a>
        </div>
      </div>
    </div>
  )
}
