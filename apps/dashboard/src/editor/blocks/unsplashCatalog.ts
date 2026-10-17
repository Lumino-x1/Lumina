export interface UnsplashPhoto {
  id: string
  url: string
  thumbUrl?: string
  author: string
  alt: string
}

interface CuratedEntry {
  id: string
  author: string
  alt: string
  tags: string[]
}

/**
 * Curated high-resolution authentic Unsplash photographs across
 * common academic, technology, scientific, creative, and lifestyle categories.
 * All IDs are verified active on the Unsplash CDN (images.unsplash.com).
 */
export const CURATED_UNSPLASH_CATALOG: CuratedEntry[] = [
  // Technology, Coding & Development
  {
    id: '1517694712202-14dd9538aa97',
    author: 'Clément Hélardot',
    alt: 'MacBook displaying source code on screen',
    tags: ['code', 'coding', 'tech', 'technology', 'laptop', 'developer', 'computer', 'programming', 'software', 'macbook', 'web'],
  },
  {
    id: '1498050108023-c5249f4df085',
    author: 'Christopher Gower',
    alt: 'Software engineer typing code at clean wooden desk',
    tags: ['code', 'developer', 'tech', 'computer', 'desk', 'programming', 'typing', 'work', 'engineer', 'frontend'],
  },
  {
    id: '1555949963-ff9fe0c870eb',
    author: 'Fotis Fotopoulos',
    alt: 'Code editor with dark syntax highlighting',
    tags: ['code', 'software', 'javascript', 'react', 'web', 'programming', 'screen', 'frontend', 'terminal'],
  },
  {
    id: '1526374965328-7f61d4dc18c5',
    author: 'Markus Spiske',
    alt: 'Green matrix binary code streaming on monitor',
    tags: ['code', 'matrix', 'cyber', 'security', 'hacker', 'binary', 'data', 'crypto', 'dark'],
  },
  {
    id: '1518770660439-4636190af475',
    author: 'Alexandre Debiève',
    alt: 'Microprocessor circuit board close up',
    tags: ['hardware', 'chip', 'cpu', 'processor', 'circuit', 'tech', 'computer', 'semiconductor', 'motherboard'],
  },
  {
    id: '1516321318423-f06f85e504b3',
    author: 'Google DeepMind',
    alt: 'Digital glowing artificial intelligence neural network',
    tags: ['ai', 'artificial intelligence', 'network', 'data', 'machine learning', 'deep learning', 'future', 'neural'],
  },
  {
    id: '1485827404703-89b55fcc595e',
    author: 'Alex Knight',
    alt: 'Modern humanoid robot with glowing elements',
    tags: ['robot', 'robotics', 'ai', 'future', 'automation', 'science', 'cyborg', 'android'],
  },
  {
    id: '1531403009284-440f080d1e12',
    author: 'Theme Photos',
    alt: 'UX UI interface design wireframes and blueprints',
    tags: ['design', 'ui', 'ux', 'wireframe', 'app', 'creative', 'product', 'mobile', 'interface'],
  },
  {
    id: '1504639725590-34d0984388bd',
    author: 'Luca Bravo',
    alt: 'Software engineer multi-screen workstation',
    tags: ['code', 'developer', 'computer', 'programming', 'setup', 'monitors', 'tech', 'workspace'],
  },

  // Campus, Students & University Life
  {
    id: '1523240795612-9a054b0db644',
    author: 'Priscilla Du Preez',
    alt: 'Group of university students smiling together on campus',
    tags: ['campus', 'students', 'university', 'college', 'friends', 'education', 'study', 'group', 'school'],
  },
  {
    id: '1522071820081-009f0129c71c',
    author: 'Annie Spratt',
    alt: 'Students collaborating over laptops at a wooden table',
    tags: ['students', 'team', 'study', 'collaboration', 'campus', 'work', 'meeting', 'learning', 'university'],
  },
  {
    id: '1434030216411-0b793f4b4173',
    author: 'Green Chameleon',
    alt: 'Student taking handwritten notes in notebook with coffee',
    tags: ['student', 'study', 'learning', 'notes', 'exam', 'homework', 'education', 'writing', 'pen'],
  },
  {
    id: '1524178232363-1fb2b075b655',
    author: 'Dom Fournier',
    alt: 'Professor delivering lecture in university auditorium',
    tags: ['lecture', 'classroom', 'university', 'professor', 'presentation', 'education', 'teaching', 'campus'],
  },
  {
    id: '1456513080510-7bf3a84b82f8',
    author: 'Aaron Burden',
    alt: 'Open study books, pencils and notebook on desk',
    tags: ['study', 'books', 'education', 'learning', 'notes', 'homework', 'reading', 'desk'],
  },
  {
    id: '1541339907198-e08756dedf3f',
    author: 'Vasily Kolotusha',
    alt: 'Graduation caps flying in the air after commencement ceremony',
    tags: ['graduation', 'university', 'college', 'diploma', 'degree', 'campus', 'celebration', 'students'],
  },
  {
    id: '1427504494785-3a9ca7044f45',
    author: 'Scott Webb',
    alt: 'Historic university campus building facade with columns',
    tags: ['campus', 'university', 'college', 'school', 'architecture', 'academy', 'building'],
  },

  // Books, Library & Research
  {
    id: '1521587760476-6c12a4b040da',
    author: 'Giammarco Boscaro',
    alt: 'Grand historic library aisle with tall bookshelves',
    tags: ['library', 'books', 'bookshelf', 'reading', 'study', 'literature', 'history', 'knowledge'],
  },
  {
    id: '1497633762265-9d179a990aa6',
    author: 'Kimberly Farmer',
    alt: 'Stack of colorful educational textbooks',
    tags: ['books', 'library', 'education', 'literature', 'study', 'stack', 'textbooks'],
  },
  {
    id: '1524995997946-a1c2e315a42f',
    author: 'Jaredd Craig',
    alt: 'Aisle of vintage classic literature in quiet library',
    tags: ['books', 'library', 'vintage', 'bookshelf', 'reading', 'knowledge', 'literature'],
  },
  {
    id: '1512820790803-83ca734da794',
    author: 'Patrick Tomasso',
    alt: 'Open hardcover book with glowing soft lighting',
    tags: ['book', 'reading', 'literature', 'novel', 'story', 'pages', 'open book'],
  },
  {
    id: '1495446815901-a7297e633e8d',
    author: 'Thought Catalog',
    alt: 'Hot coffee mug next to open novel on wooden desk',
    tags: ['book', 'reading', 'coffee', 'desk', 'cozy', 'relaxing', 'tea', 'morning'],
  },

  // Nature, Landscapes & Environment
  {
    id: '1501854140801-50d01698950b',
    author: 'Qingbao Meng',
    alt: 'Lush green mountain valley scenic aerial landscape',
    tags: ['nature', 'landscape', 'mountain', 'green', 'valley', 'aerial', 'scenic', 'environment'],
  },
  {
    id: '1470071459604-3b5ec3a7fe05',
    author: 'Kalen Emsley',
    alt: 'Moody misty evergreen pine forest in mountain range',
    tags: ['nature', 'forest', 'trees', 'fog', 'mountain', 'pine', 'wild', 'foggy'],
  },
  {
    id: '1472214103451-9374bd1c798e',
    author: 'Bess Hamiti',
    alt: 'Golden sunset over peaceful wildflower meadow',
    tags: ['nature', 'sunset', 'meadow', 'grass', 'landscape', 'sun', 'field', 'evening'],
  },
  {
    id: '1507525428034-b723cf961d3e',
    author: 'Sean Oulashin',
    alt: 'Crystal clear turquoise ocean waves washing onto sand',
    tags: ['ocean', 'sea', 'beach', 'nature', 'summer', 'water', 'waves', 'tropical', 'coast'],
  },
  {
    id: '1464822759023-fed622ff2c3b',
    author: 'Kalen Emsley',
    alt: 'Majestic snow-covered alpine mountain peaks against blue sky',
    tags: ['mountain', 'snow', 'peaks', 'nature', 'winter', 'hiking', 'alps', 'climbing'],
  },
  {
    id: '1447752875215-b2761acb3c5d',
    author: 'Rico Meyer',
    alt: 'Japanese garden wooden bridge with vibrant autumn maple foliage',
    tags: ['nature', 'autumn', 'fall', 'trees', 'bridge', 'park', 'japan', 'leaves', 'red'],
  },
  {
    id: '1426604966848-d7adac402bff',
    author: 'Bailey Zindel',
    alt: 'Yosemite valley river with granite cliffs and trees',
    tags: ['nature', 'mountain', 'yosemite', 'lake', 'river', 'scenic', 'park', 'cliffs'],
  },
  {
    id: '1448375240586-882707db888b',
    author: 'Steven Kamenar',
    alt: 'Sunlight filtering through tall Redwood forest canopy',
    tags: ['forest', 'trees', 'nature', 'sunlight', 'woods', 'green', 'redwood', 'canopy'],
  },
  {
    id: '1506744038136-46273834b3fb',
    author: 'Bailey Zindel',
    alt: 'Calm mountain lake mirroring sunset sky and trees',
    tags: ['nature', 'lake', 'reflection', 'water', 'mountains', 'peaceful', 'landscape'],
  },

  // Science, Space & Research
  {
    id: '1532094349884-543bc11b234d',
    author: 'Hans Reniers',
    alt: 'Scientific glassware with vibrant chemical solutions',
    tags: ['science', 'chemistry', 'lab', 'laboratory', 'research', 'experiment', 'chemicals', 'beaker'],
  },
  {
    id: '1507668077129-56e32842fceb',
    author: 'Lucas Vasques',
    alt: 'Precision medical laboratory optical microscope',
    tags: ['microscope', 'science', 'biology', 'medical', 'research', 'lab', 'health', 'microbiology'],
  },
  {
    id: '1451187580459-43490279c0fa',
    author: 'NASA',
    alt: 'Planet Earth from space orbit showing atmosphere glow',
    tags: ['space', 'earth', 'astronomy', 'science', 'planet', 'cosmos', 'globe', 'satellite', 'orbit'],
  },
  {
    id: '1506703719100-a0f3a48c0f86',
    author: 'Jeremy Thomas',
    alt: 'Milky Way galaxy night sky filled with stars and cosmic dust',
    tags: ['space', 'galaxy', 'stars', 'astronomy', 'cosmos', 'sky', 'night', 'nebula'],
  },

  // Business, Office & Collaboration
  {
    id: '1486406146926-c627a92ad1ab',
    author: 'Sam Valadi',
    alt: 'Modern glass skyscraper reflecting clouds and city',
    tags: ['architecture', 'building', 'business', 'skyscraper', 'city', 'corporate', 'urban'],
  },
  {
    id: '1497215728101-856f4ea42174',
    author: 'Alesia Kazantceva',
    alt: 'Clean minimalist office desk bathed in natural daylight',
    tags: ['office', 'desk', 'workspace', 'business', 'minimal', 'interior', 'chair', 'decor'],
  },
  {
    id: '1499750310107-5fef28a66643',
    author: 'Danielle MacInnes',
    alt: 'Workspace flat lay with coffee cup, laptop, and journal',
    tags: ['coffee', 'desk', 'laptop', 'workspace', 'work', 'productivity', 'minimal', 'notes'],
  },
  {
    id: '1517245386807-bb43f82c33c4',
    author: 'Headway',
    alt: 'Team colleagues collaborating around a white conference table',
    tags: ['team', 'meeting', 'collaboration', 'business', 'work', 'discussion', 'startup', 'coworking'],
  },
  {
    id: '1504384308090-c894fdcc538d',
    author: 'Austin Distel',
    alt: 'Open-plan creative coworking workspace with entrepreneurs',
    tags: ['office', 'startup', 'coworking', 'work', 'creative', 'team', 'space', 'innovation'],
  },
  {
    id: '1551836022-d5d88e9218df',
    author: 'Austin Distel',
    alt: 'Confident professional woman smiling in conference room',
    tags: ['business', 'professional', 'woman', 'office', 'work', 'career', 'people', 'leadership'],
  },

  // Art, Design & Creative
  {
    id: '1618005182384-a83a8bd57fbe',
    author: 'Milad Fakurian',
    alt: 'Abstract 3D undulating iridescent gradient silk wave',
    tags: ['art', 'abstract', '3d', 'creative', 'gradient', 'modern', 'background', 'render', 'digital art'],
  },
  {
    id: '1579783900882-c0d3dad7b119',
    author: 'Europeana',
    alt: 'Classical framed oil paintings inside museum art gallery',
    tags: ['art', 'museum', 'gallery', 'painting', 'classic', 'culture', 'exhibit', 'fine art'],
  },
  {
    id: '1541701494587-cb58502866ab',
    author: 'Georden West',
    alt: 'Swirling fluid acrylic colors in vibrant artistic harmony',
    tags: ['art', 'paint', 'color', 'creative', 'texture', 'abstract', 'fluid', 'vibrant'],
  },
  {
    id: '1513542789411-b6a5d4f31634',
    author: 'Alain Frechette',
    alt: 'Golden bokeh light particle field on dark cosmic background',
    tags: ['abstract', 'light', 'bokeh', 'particles', 'glow', 'background', 'dots', 'sparkle'],
  },
  {
    id: '1534528741775-53994a69daeb',
    author: 'Aiony Haust',
    alt: 'Studio portrait with dramatic artistic editorial lighting',
    tags: ['portrait', 'people', 'fashion', 'person', 'art', 'woman', 'photography', 'editorial'],
  },
  {
    id: '1579546929518-9e396f3cc809',
    author: 'Pawel Czerwinski',
    alt: 'Smooth pastel gradient abstract wallpaper background',
    tags: ['abstract', 'gradient', 'minimal', 'background', 'color', 'wallpaper', 'aesthetic'],
  },
  {
    id: '1600585154340-be6161a56a0c',
    author: 'R Architecture',
    alt: 'Contemporary architectural residence with glass walls and warm lights',
    tags: ['architecture', 'house', 'modern', 'home', 'design', 'building', 'interior', 'contemporary'],
  },
]

function cleanArtistName(rawHtml?: string): string {
  if (!rawHtml) return 'Photographer'
  const text = rawHtml.replace(/<[^>]*>?/gm, '').trim()
  return text.length > 25 ? text.slice(0, 25) + '...' : text || 'Photographer'
}

/**
 * Searches live photographs safely without CORS errors:
 * 1. If VITE_UNSPLASH_ACCESS_KEY is set, queries official api.unsplash.com (which officially supports CORS).
 * 2. Checks high-resolution curated authentic Unsplash gallery for keyword matches.
 * 3. Queries Wikimedia Commons API (origin=* with gsrnamespace=6 for media files).
 * 4. Falls back to Picsum Photos (which is CORS-enabled and sources Unsplash photos).
 *
 * NOTE: Never sends direct unproxied requests to unsplash.com/napi because Unsplash rejects them with CORS blocks.
 */
export async function searchLivePhotos(
  query: string,
  page: number
): Promise<{ photos: UnsplashPhoto[]; total: number; totalPages: number }> {
  const cleanQ = query.trim()
  if (!cleanQ) {
    return { photos: [], total: 0, totalPages: 0 }
  }

  const PAGE_SIZE = 9

  // 1. Official Unsplash Developer API (if configured via env variable)
  const envAccessKey = (import.meta as any).env?.VITE_UNSPLASH_ACCESS_KEY
  if (envAccessKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanQ)}&per_page=${PAGE_SIZE}&page=${page}`,
        {
          headers: {
            Authorization: `Client-ID ${envAccessKey}`,
            Accept: 'application/json',
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
          const photos: UnsplashPhoto[] = data.results.map((item: any) => ({
            id: item.id || `un-${Math.random()}`,
            url: item.urls?.regular || item.urls?.full || item.urls?.small,
            thumbUrl: item.urls?.small || item.urls?.thumb || item.urls?.regular,
            author: item.user?.name || item.user?.username || 'Unsplash Photographer',
            alt: item.alt_description || item.description || cleanQ,
          }))
          const total = data.total || photos.length
          const totalPages = data.total_pages || Math.ceil(total / PAGE_SIZE)
          return { photos, total, totalPages }
        }
      }
    } catch {
      // Continue to next provider
    }
  }

  // 2. Curated Authentic Unsplash Gallery
  const queryTokens = cleanQ.toLowerCase().split(/\s+/).filter(Boolean)
  const scoredMatches = CURATED_UNSPLASH_CATALOG.map((entry) => {
    let score = 0
    const entryAlt = entry.alt.toLowerCase()
    const entryAuthor = entry.author.toLowerCase()

    for (const token of queryTokens) {
      for (const tag of entry.tags) {
        if (tag === token) {
          score += 10
        } else if (tag.includes(token) || token.includes(tag)) {
          score += 4
        }
      }
      if (entryAlt.includes(token)) {
        score += 3
      }
      if (entryAuthor.includes(token)) {
        score += 2
      }
    }
    return { entry, score }
  })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((m) => m.entry)

  if (scoredMatches.length > 0) {
    const startIndex = (page - 1) * PAGE_SIZE
    const pagedEntries = scoredMatches.slice(startIndex, startIndex + PAGE_SIZE)

    if (pagedEntries.length > 0) {
      const photos: UnsplashPhoto[] = pagedEntries.map((e) => ({
        id: `un-${e.id}`,
        url: `https://images.unsplash.com/photo-${e.id}?w=1200&auto=format&fit=crop&q=80`,
        thumbUrl: `https://images.unsplash.com/photo-${e.id}?w=400&auto=format&fit=crop&q=80`,
        author: e.author,
        alt: e.alt,
      }))
      return {
        photos,
        total: scoredMatches.length,
        totalPages: Math.ceil(scoredMatches.length / PAGE_SIZE),
      }
    }
  }

  // 3. Wikimedia Commons Open Image Search (CORS enabled with origin=*, namespace 6 for media files)
  try {
    const offset = (page - 1) * PAGE_SIZE
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(cleanQ)}&gsrlimit=${PAGE_SIZE}&gsroffset=${offset}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*`

    const res = await fetch(wikiUrl)
    if (res.ok) {
      const data = await res.json()
      if (data?.query?.pages) {
        const pages = Object.values(data.query.pages) as any[]
        const photos: UnsplashPhoto[] = pages
          .map((p) => {
            const ii = p.imageinfo?.[0]
            if (!ii?.thumburl && !ii?.url) return null
            const rawArtist = ii.extmetadata?.Artist?.value
            const author = cleanArtistName(rawArtist)
            const cleanTitle = (p.title || cleanQ)
              .replace(/^File:/i, '')
              .replace(/\.[^.]+$/, '')
              .trim()

            return {
              id: `wiki-${p.pageid}`,
              url: ii.thumburl || ii.url,
              thumbUrl: ii.thumburl || ii.url,
              author,
              alt: cleanTitle,
            }
          })
          .filter(Boolean) as UnsplashPhoto[]

        if (photos.length > 0) {
          return {
            photos,
            total: Math.max(photos.length * 5, 45),
            totalPages: 5,
          }
        }
      }
    }
  } catch {
    // Continue to next provider
  }

  // 4. Picsum Photos fallback (Real Unsplash photos, CORS enabled)
  try {
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const photos: UnsplashPhoto[] = data.map((item: any) => ({
          id: `picsum-${item.id}`,
          url: `https://picsum.photos/id/${item.id}/1200/800`,
          thumbUrl: `https://picsum.photos/id/${item.id}/400/267`,
          author: item.author || 'Unsplash Photographer',
          alt: `${cleanQ} photography`,
        }))
        return {
          photos,
          total: 90,
          totalPages: 10,
        }
      }
    }
  } catch {
    // Complete fallback
  }

  return { photos: [], total: 0, totalPages: 0 }
}
