-- ============================================================================
-- Lumina Platform: Seed 50 Diverse Campus Blog Posts
-- Target Author ID: FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3 (agnesh K K - 24z206@psgtech.ac.in)
-- Covers: Technology, AI, LeetCode, Systems, DevOps, WebDev, Campus Life & Career
-- All posts feature high-res Unsplash CDN cover photos and rich Lumina blocks
-- ============================================================================

BEGIN;

DO $$
DECLARE
  v_author_id TEXT := 'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3';
  v_exists BOOLEAN;
BEGIN
  -- Verify author exists
  SELECT EXISTS(SELECT 1 FROM "User" WHERE id = v_author_id) INTO v_exists;
  IF NOT v_exists THEN
    RAISE EXCEPTION 'Author with id % does not exist in "User" table', v_author_id;
  END IF;
END $$;


-- ----------------------------------------------------------------------------
-- Post #1: Building Resilient Microservices with Go and gRPC: Lessons from Production
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Building Resilient Microservices with Go and gRPC: Lessons from Production',
  'A deep dive into zero-downtime RPC communications, protocol buffers schema evolution, and circuit breaking in distributed campus infrastructures.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_01_agnesh-1","type":"heading-2","styles":{},"content":"Designing for Network Partitions & Failure Domains","metadata":{}},{"id":"block-cmvg_seed_01_agnesh-2","type":"paragraph","styles":{},"content":"When running services across campus clusters, network partitions are an inevitability rather than an edge case. By adopting gRPC with Protocol Buffers v3, our backend services gained strongly-typed interface contracts and compact binary payloads.","metadata":{}},{"id":"block-cmvg_seed_01_agnesh-3","type":"paragraph","styles":{},"content":"Implementing client-side load balancing and exponential backoff retries with jitter ensured that transient network drops no longer cause cascading outages during peak course registration hours.","metadata":{}}]'::jsonb,
  'Transitioning monolithic student services to decoupled gRPC microservices reduced latency by 68% and dramatically simplified contract testing.

Designing for Network Partitions & Failure Domains

When running services across campus clusters, network partitions are an inevitability rather than an edge case. By adopting gRPC with Protocol Buffers v3, our backend services gained strongly-typed interface contracts and compact binary payloads.

Implementing client-side load balancing and exponential backoff retries with jitter ensured that transient network drops no longer cause cascading outages during peak course registration hours.',
  ARRAY['golang', 'grpc', 'microservices', 'distributed-systems', 'backend']::text[],
  'Technology',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '1 days' - INTERVAL '0 minutes',
  NOW() - INTERVAL '1 days' - INTERVAL '0 minutes',
  NULL,
  142,
  18,
  1820,
  14,
  39,
  NULL,
  NOW() - INTERVAL '1 days' - INTERVAL '0 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #2: Mastering LeetCode Patterns: From Two-Pointers to Monotonic Queues
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Mastering LeetCode Patterns: From Two-Pointers to Monotonic Queues',
  'Stop memorizing 500 individual questions. Instead, learn the 14 core patterns that unlock 90% of technical interview challenges.',
  'https://images.unsplash.com/photo-1516116211227-bbc13c744ef1?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_02_agnesh-1","type":"heading-2","styles":{},"content":"The Power of Monotonic Stack and Window Constraints","metadata":{}},{"id":"block-cmvg_seed_02_agnesh-2","type":"paragraph","styles":{},"content":"The biggest bottleneck engineering students face in coding rounds is attempting to brute force every new problem. Once you recognize that sliding windows, two pointers, and monotonic stacks share common invariant patterns, problem solving becomes systematic.","metadata":{}},{"id":"block-cmvg_seed_02_agnesh-3","type":"paragraph","styles":{},"content":"In this breakdown, we examine Next Greater Element, Trapping Rain Water, and Sliding Window Maximum, proving how each is merely an instantiation of monotonic index tracking.","metadata":{}}]'::jsonb,
  'A tactical breakdown of pattern recognition strategies that take candidates from feeling overwhelmed to solving Hard-level DP and graph problems effortlessly.

The Power of Monotonic Stack and Window Constraints

The biggest bottleneck engineering students face in coding rounds is attempting to brute force every new problem. Once you recognize that sliding windows, two pointers, and monotonic stacks share common invariant patterns, problem solving becomes systematic.

In this breakdown, we examine Next Greater Element, Trapping Rain Water, and Sliding Window Maximum, proving how each is merely an instantiation of monotonic index tracking.',
  ARRAY['leetcode', 'algorithms', 'data-structures', 'interviews', 'c++']::text[],
  'Competitive Programming',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '2 days' - INTERVAL '17 minutes',
  NOW() - INTERVAL '2 days' - INTERVAL '17 minutes',
  NULL,
  318,
  42,
  3450,
  56,
  112,
  NULL,
  NOW() - INTERVAL '2 days' - INTERVAL '17 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #3: Demystifying Transformers: Writing an Attention Mechanism from Scratch in PyTorch
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Demystifying Transformers: Writing an Attention Mechanism from Scratch in PyTorch',
  'Hands-on guide implementing Scaled Dot-Product Attention, Multi-Head Attention, and positional encodings without high-level library abstractions.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_03_agnesh-1","type":"heading-2","styles":{},"content":"Why Self-Attention Revolutionized Sequence Modeling","metadata":{}},{"id":"block-cmvg_seed_03_agnesh-2","type":"paragraph","styles":{},"content":"Recurrent Neural Networks suffered from sequential dependency bottlenecks that rendered parallel training over massive text corpora impossible. Attention mechanisms solve this by calculating direct pairwise similarity weights between every token.","metadata":{}},{"id":"block-cmvg_seed_03_agnesh-3","type":"paragraph","styles":{},"content":"We step through torch.bmm matrix multiplications, softmax scaling factors of 1/sqrt(d_k), and causal masking to prevent future tokens from leaking during autoregressive generation.","metadata":{}}]'::jsonb,
  'Understanding the mathematics and tensor shapes of Query, Key, and Value projections by building an attention layer line by line.

Why Self-Attention Revolutionized Sequence Modeling

Recurrent Neural Networks suffered from sequential dependency bottlenecks that rendered parallel training over massive text corpora impossible. Attention mechanisms solve this by calculating direct pairwise similarity weights between every token.

We step through torch.bmm matrix multiplications, softmax scaling factors of 1/sqrt(d_k), and causal masking to prevent future tokens from leaking during autoregressive generation.',
  ARRAY['pytorch', 'deep-learning', 'transformers', 'nlp', 'python']::text[],
  'Artificial Intelligence',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '3 days' - INTERVAL '34 minutes',
  NOW() - INTERVAL '3 days' - INTERVAL '34 minutes',
  NULL,
  275,
  29,
  2980,
  38,
  84,
  NULL,
  NOW() - INTERVAL '3 days' - INTERVAL '34 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #4: Why We Migrated from Docker Desktop to OrbStack on Apple Silicon
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Why We Migrated from Docker Desktop to OrbStack on Apple Silicon',
  'Cutting battery consumption in half, reducing CPU idle load to 0.1%, and achieving lightning-fast container startup speeds on macOS.',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_04_agnesh-1","type":"heading-2","styles":{},"content":"Hypervisor Efficiency and Rosetta 2 Integration","metadata":{}},{"id":"block-cmvg_seed_04_agnesh-2","type":"paragraph","styles":{},"content":"Docker Desktop has historically consumed excessive memory and CPU cycles running background virtualization daemons. OrbStack replaces this with a native lightweight virtual machine engine tightly coupled to macOS framework primitives.","metadata":{}},{"id":"block-cmvg_seed_04_agnesh-3","type":"paragraph","styles":{},"content":"Our Postgres, Redis, and API service test containers boot in under 2 seconds, and machine battery longevity improved by nearly three hours during full-day campus hackathons.","metadata":{}}]'::jsonb,
  'A benchmark-driven comparison of OrbStack versus Docker Desktop for multi-container web app development on M-series chips.

Hypervisor Efficiency and Rosetta 2 Integration

Docker Desktop has historically consumed excessive memory and CPU cycles running background virtualization daemons. OrbStack replaces this with a native lightweight virtual machine engine tightly coupled to macOS framework primitives.

Our Postgres, Redis, and API service test containers boot in under 2 seconds, and machine battery longevity improved by nearly three hours during full-day campus hackathons.',
  ARRAY['docker', 'macos', 'containers', 'performance', 'devops']::text[],
  'DevOps',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '4 days' - INTERVAL '51 minutes',
  NOW() - INTERVAL '4 days' - INTERVAL '51 minutes',
  NULL,
  189,
  23,
  2150,
  19,
  52,
  NULL,
  NOW() - INTERVAL '4 days' - INTERVAL '51 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #5: Deep Dive into PostgreSQL Indexing: B-Tree, GiST, GIN and BRIN Explained
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Deep Dive into PostgreSQL Indexing: B-Tree, GiST, GIN and BRIN Explained',
  'Choosing the right index type for your queries, optimizing composite indexes, and preventing index bloat on high-throughput student portals.',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_05_agnesh-1","type":"heading-2","styles":{},"content":"The Mechanics Behind B-Trees and Multi-Column Selectivity","metadata":{}},{"id":"block-cmvg_seed_05_agnesh-2","type":"paragraph","styles":{},"content":"Every database engineer knows that adding indexes speeds up reads at the cost of write overhead. However, the ordering of columns in composite indexes determines whether your index can satisfy inequality filters or prefix lookups.","metadata":{}},{"id":"block-cmvg_seed_05_agnesh-3","type":"paragraph","styles":{},"content":"We also explore GIN indexes for JSONB unstructured metadata and inverted arrays, showing how PostgreSQL natively powers full-text search with minimal overhead.","metadata":{}}]'::jsonb,
  'How a single multi-column GIN index reduced search query execution times from 420ms to 4ms across 500,000 student activity records.

The Mechanics Behind B-Trees and Multi-Column Selectivity

Every database engineer knows that adding indexes speeds up reads at the cost of write overhead. However, the ordering of columns in composite indexes determines whether your index can satisfy inequality filters or prefix lookups.

We also explore GIN indexes for JSONB unstructured metadata and inverted arrays, showing how PostgreSQL natively powers full-text search with minimal overhead.',
  ARRAY['postgresql', 'databases', 'indexing', 'sql', 'performance']::text[],
  'Databases',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '5 days' - INTERVAL '8 minutes',
  NOW() - INTERVAL '5 days' - INTERVAL '8 minutes',
  NULL,
  230,
  31,
  2640,
  28,
  95,
  NULL,
  NOW() - INTERVAL '5 days' - INTERVAL '8 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #6: Building Production-Grade React 19 Applications with Server Components
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Building Production-Grade React 19 Applications with Server Components',
  'Navigating the architectural shift toward React Server Components, Server Actions, Suspense streaming, and optimistic mutations.',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_06_agnesh-1","type":"heading-2","styles":{},"content":"Rethinking Component Boundaries and Network Waterfalls","metadata":{}},{"id":"block-cmvg_seed_06_agnesh-2","type":"paragraph","styles":{},"content":"React Server Components fundamentally dismantle the traditional client-side SPA waterfall. Instead of fetching initial HTML, downloading heavy JavaScript bundles, and then issuing client-side fetch requests, components resolve on the server.","metadata":{}},{"id":"block-cmvg_seed_06_agnesh-3","type":"paragraph","styles":{},"content":"By passing promises directly through React 19 Suspense boundaries, users perceive immediate page loads while heavy comments and media blocks stream progressively.","metadata":{}}]'::jsonb,
  'A practical guide to eliminating client bundle bloat by rendering data-heavy components exclusively on the server edge.

Rethinking Component Boundaries and Network Waterfalls

React Server Components fundamentally dismantle the traditional client-side SPA waterfall. Instead of fetching initial HTML, downloading heavy JavaScript bundles, and then issuing client-side fetch requests, components resolve on the server.

By passing promises directly through React 19 Suspense boundaries, users perceive immediate page loads while heavy comments and media blocks stream progressively.',
  ARRAY['react', 'typescript', 'frontend', 'webdev', 'javascript']::text[],
  'Web Development',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '6 days' - INTERVAL '25 minutes',
  NOW() - INTERVAL '6 days' - INTERVAL '25 minutes',
  NULL,
  195,
  16,
  2100,
  22,
  61,
  NULL,
  NOW() - INTERVAL '6 days' - INTERVAL '25 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #7: Rust for C++ Developers: Surviving the Borrow Checker and Memory Ownership
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Rust for C++ Developers: Surviving the Borrow Checker and Memory Ownership',
  'How the Rust compiler enforces thread safety, prevents data races, and makes memory leaks virtually impossible without a garbage collector.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_07_agnesh-1","type":"heading-2","styles":{},"content":"Lifetimes, Invariants, and Concurrency Guarantees","metadata":{}},{"id":"block-cmvg_seed_07_agnesh-2","type":"paragraph","styles":{},"content":"Coming from C++, developers are accustomed to manually validating pointer safety and locking mutexes to safeguard shared state. Rust elevates these runtime hazards to compile-time invariant verifications.","metadata":{}},{"id":"block-cmvg_seed_07_agnesh-3","type":"paragraph","styles":{},"content":"Understanding how references borrow ownership and why mutable references must remain exclusive unlocks high-concurrency software architectures free of segmentation faults.","metadata":{}}]'::jsonb,
  'Transitioning mental models from smart pointers and RAII in Modern C++ to lifetimes and affine type semantics in Rust.

Lifetimes, Invariants, and Concurrency Guarantees

Coming from C++, developers are accustomed to manually validating pointer safety and locking mutexes to safeguard shared state. Rust elevates these runtime hazards to compile-time invariant verifications.

Understanding how references borrow ownership and why mutable references must remain exclusive unlocks high-concurrency software architectures free of segmentation faults.',
  ARRAY['rust', 'cpp', 'systems', 'memory-management', 'programming']::text[],
  'Systems Programming',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '7 days' - INTERVAL '42 minutes',
  NOW() - INTERVAL '7 days' - INTERVAL '42 minutes',
  NULL,
  284,
  37,
  3120,
  45,
  88,
  NULL,
  NOW() - INTERVAL '7 days' - INTERVAL '42 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #8: Reflections on Winning the Smart India Hackathon: Our 36-Hour Journey
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Reflections on Winning the Smart India Hackathon: Our 36-Hour Journey',
  'From ideation and rapid prototyping to live jury pitching: how our campus team architected an AI-powered logistics tracking platform.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_08_agnesh-1","type":"heading-2","styles":{},"content":"The Architecture That Helped Us Ship on Time","metadata":{}},{"id":"block-cmvg_seed_08_agnesh-2","type":"paragraph","styles":{},"content":"Hackathons are won in the preparation phase. Choosing familiar tools like Next.js, Tailwind CSS, Supabase, and FastAPI allowed our 4-person team to ship an end-to-end working MVP while other teams were still configuring Docker containers.","metadata":{}},{"id":"block-cmvg_seed_08_agnesh-3","type":"paragraph","styles":{},"content":"More importantly, focusing 40% of our energy on live pitch storytelling and crisp presentation metrics resonated deeply with the evaluation committee.","metadata":{}}]'::jsonb,
  'Key strategies for team task allocation, tech stack pragmatism, and creating compelling product demonstrations under tight deadlines.

The Architecture That Helped Us Ship on Time

Hackathons are won in the preparation phase. Choosing familiar tools like Next.js, Tailwind CSS, Supabase, and FastAPI allowed our 4-person team to ship an end-to-end working MVP while other teams were still configuring Docker containers.

More importantly, focusing 40% of our energy on live pitch storytelling and crisp presentation metrics resonated deeply with the evaluation committee.',
  ARRAY['hackathon', 'psgtech', 'startup', 'teamwork', 'ai']::text[],
  'Campus Life',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '8 days' - INTERVAL '59 minutes',
  NOW() - INTERVAL '8 days' - INTERVAL '59 minutes',
  NULL,
  340,
  51,
  4100,
  64,
  76,
  NULL,
  NOW() - INTERVAL '8 days' - INTERVAL '59 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #9: Demystifying Zero-Knowledge Proofs: An Intuitive Introduction for Engineers
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Demystifying Zero-Knowledge Proofs: An Intuitive Introduction for Engineers',
  'Proving knowledge of a secret without revealing the secret itself: exploring zk-SNARKs, arithmetic circuits, and privacy-first verification.',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_09_agnesh-1","type":"heading-2","styles":{},"content":"From Interactive Proofs to Succinct Non-Interactive Arguments","metadata":{}},{"id":"block-cmvg_seed_09_agnesh-2","type":"paragraph","styles":{},"content":"Zero-knowledge protocols represent one of the crowning achievements of modern cryptography. They allow a prover to convince a verifier that a statement is mathematically true without disclosing any underlying inputs.","metadata":{}},{"id":"block-cmvg_seed_09_agnesh-3","type":"paragraph","styles":{},"content":"We trace how general computational assertions are converted into Rank-1 Constraint Systems (R1CS), transformed into QAP polynomials, and verified in sub-millisecond durations.","metadata":{}}]'::jsonb,
  'Breaking down the mathematical foundations of polynomial commitments and pairing-friendly elliptic curves into accessible engineering concepts.

From Interactive Proofs to Succinct Non-Interactive Arguments

Zero-knowledge protocols represent one of the crowning achievements of modern cryptography. They allow a prover to convince a verifier that a statement is mathematically true without disclosing any underlying inputs.

We trace how general computational assertions are converted into Rank-1 Constraint Systems (R1CS), transformed into QAP polynomials, and verified in sub-millisecond durations.',
  ARRAY['cryptography', 'zero-knowledge', 'security', 'blockchain', 'math']::text[],
  'Cryptography',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '9 days' - INTERVAL '16 minutes',
  NOW() - INTERVAL '9 days' - INTERVAL '16 minutes',
  NULL,
  215,
  24,
  2450,
  31,
  79,
  NULL,
  NOW() - INTERVAL '9 days' - INTERVAL '16 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #10: Tailwind CSS v4 Under the Hood: The Lightning CSS Engine and Native CSS Variables
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Tailwind CSS v4 Under the Hood: The Lightning CSS Engine and Native CSS Variables',
  'Exploring the groundbreaking rewrite of Tailwind CSS: zero-config Vite plugins, oxide engine speedups, and dynamic theme tokens.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_10_agnesh-1","type":"heading-2","styles":{},"content":"Say Goodbye to tailwind.config.js and Hello to @theme","metadata":{}},{"id":"block-cmvg_seed_10_agnesh-2","type":"paragraph","styles":{},"content":"Tailwind v4 is not just an update; it is an overhaul that embraces modern browser CSS features. Custom utility configurations now live directly in CSS stylesheet files using native @theme directives.","metadata":{}},{"id":"block-cmvg_seed_10_agnesh-3","type":"paragraph","styles":{},"content":"The compilation speedups provided by LightningCSS ensure instantaneous hot-module replacement even across expansive monorepos containing thousands of bespoke classes.","metadata":{}}]'::jsonb,
  'Why ditching PostCSS for a custom Rust-powered CSS compiler cut build times from 1200ms to 40ms in enterprise codebases.

Say Goodbye to tailwind.config.js and Hello to @theme

Tailwind v4 is not just an update; it is an overhaul that embraces modern browser CSS features. Custom utility configurations now live directly in CSS stylesheet files using native @theme directives.

The compilation speedups provided by LightningCSS ensure instantaneous hot-module replacement even across expansive monorepos containing thousands of bespoke classes.',
  ARRAY['tailwindcss', 'css', 'frontend', 'vite', 'webdesign']::text[],
  'Web Development',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '10 days' - INTERVAL '33 minutes',
  NOW() - INTERVAL '10 days' - INTERVAL '33 minutes',
  NULL,
  178,
  19,
  1950,
  18,
  44,
  NULL,
  NOW() - INTERVAL '10 days' - INTERVAL '33 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #11: Designing Fault-Tolerant Distributed Job Queues with Redis Streams and BullMQ
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Designing Fault-Tolerant Distributed Job Queues with Redis Streams and BullMQ',
  'Handling high-volume asynchronous tasks, dead-letter queues, idempotent processing, and worker concurrency limits in Node.js.',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_11_agnesh-1","type":"heading-2","styles":{},"content":"Guaranteed Delivery and Exponential Backoff Strategies","metadata":{}},{"id":"block-cmvg_seed_11_agnesh-2","type":"paragraph","styles":{},"content":"Offloading intensive computing tasks like code compilation or automated PDF generation to background workers is essential for responsive APIs. BullMQ leverages Redis Streams for atomic acknowledgment locks.","metadata":{}},{"id":"block-cmvg_seed_11_agnesh-3","type":"paragraph","styles":{},"content":"By ensuring every job payload contains idempotent execution keys and maintaining a structured dead-letter queue, operators can debug failed jobs without losing student requests.","metadata":{}}]'::jsonb,
  'How we prevent duplicated emails, manage LeetCode problem submission evaluations, and recover gracefully from worker process crashes.

Guaranteed Delivery and Exponential Backoff Strategies

Offloading intensive computing tasks like code compilation or automated PDF generation to background workers is essential for responsive APIs. BullMQ leverages Redis Streams for atomic acknowledgment locks.

By ensuring every job payload contains idempotent execution keys and maintaining a structured dead-letter queue, operators can debug failed jobs without losing student requests.',
  ARRAY['redis', 'bullmq', 'nodejs', 'queues', 'backend']::text[],
  'Backend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '11 days' - INTERVAL '50 minutes',
  NOW() - INTERVAL '11 days' - INTERVAL '50 minutes',
  NULL,
  165,
  14,
  1880,
  15,
  49,
  NULL,
  NOW() - INTERVAL '11 days' - INTERVAL '50 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #12: A Comprehensive Guide to Vector Embeddings and RAG Architecture
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'A Comprehensive Guide to Vector Embeddings and RAG Architecture',
  'Building contextual search pipelines using sentence-transformers, pgvector, and hybrid lexical-semantic ranking algorithms.',
  'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_12_agnesh-1","type":"heading-2","styles":{},"content":"Chunking Strategies and Semantic Similarity Metrics","metadata":{}},{"id":"block-cmvg_seed_12_agnesh-2","type":"paragraph","styles":{},"content":"Naively splitting documents into fixed 500-token chunks frequently breaks semantic sentence context. Implementing recursive character splitting and metadata headers preserves core relational meaning.","metadata":{}},{"id":"block-cmvg_seed_12_agnesh-3","type":"paragraph","styles":{},"content":"Combining cosine similarity vector search with PostgreSQL tsvector full-text search using reciprocal rank fusion yields 35% higher answer relevance on student queries.","metadata":{}}]'::jsonb,
  'Overcoming LLM hallucinations by augmenting prompt contexts with semantic chunking and reciprocal rank fusion over course textbooks.

Chunking Strategies and Semantic Similarity Metrics

Naively splitting documents into fixed 500-token chunks frequently breaks semantic sentence context. Implementing recursive character splitting and metadata headers preserves core relational meaning.

Combining cosine similarity vector search with PostgreSQL tsvector full-text search using reciprocal rank fusion yields 35% higher answer relevance on student queries.',
  ARRAY['rag', 'llm', 'vector-database', 'pgvector', 'python']::text[],
  'Artificial Intelligence',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '12 days' - INTERVAL '7 minutes',
  NOW() - INTERVAL '12 days' - INTERVAL '7 minutes',
  NULL,
  298,
  38,
  3200,
  51,
  108,
  NULL,
  NOW() - INTERVAL '12 days' - INTERVAL '7 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #13: Navigating Open Source Contributions: From Your First PR to Maintainer Status
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Navigating Open Source Contributions: From Your First PR to Maintainer Status',
  'Overcoming impostor syndrome, finding good-first-issues, writing clean git commits, and engaging respectfully with global project communities.',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_13_agnesh-1","type":"heading-2","styles":{},"content":"The Etiquette of Constructive Open Source Participation","metadata":{}},{"id":"block-cmvg_seed_13_agnesh-2","type":"paragraph","styles":{},"content":"Many students mistakenly believe they must invent complex features to contribute to open source. In reality, maintainers value well-crafted reproduction tests and clear documentation polish above everything else.","metadata":{}},{"id":"block-cmvg_seed_13_agnesh-3","type":"paragraph","styles":{},"content":"Learning to maintain small, atomic git branches, write descriptive PR descriptions, and welcome constructive code review feedback will accelerate your growth as an engineer.","metadata":{}}]'::jsonb,
  'Actionable advice on how contributing documentation fixes, reproducing bug reports, and writing unit tests opens doors to top tech careers.

The Etiquette of Constructive Open Source Participation

Many students mistakenly believe they must invent complex features to contribute to open source. In reality, maintainers value well-crafted reproduction tests and clear documentation polish above everything else.

Learning to maintain small, atomic git branches, write descriptive PR descriptions, and welcome constructive code review feedback will accelerate your growth as an engineer.',
  ARRAY['opensource', 'git', 'github', 'community', 'career']::text[],
  'Career',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '13 days' - INTERVAL '24 minutes',
  NOW() - INTERVAL '13 days' - INTERVAL '24 minutes',
  NULL,
  245,
  26,
  2750,
  33,
  72,
  NULL,
  NOW() - INTERVAL '13 days' - INTERVAL '24 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #14: The Architecture of Modern WebAssembly: Running C++ and Rust in the Browser
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'The Architecture of Modern WebAssembly: Running C++ and Rust in the Browser',
  'Compiling native compute workloads into portable binary code running at near-native speeds inside client browser sandboxes.',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_14_agnesh-1","type":"heading-2","styles":{},"content":"Shared Linear Memory and JavaScript Interop","metadata":{}},{"id":"block-cmvg_seed_14_agnesh-2","type":"paragraph","styles":{},"content":"WebAssembly provides a compact binary format that executes with predictable performance across all modern web browsers. By passing memory pointers between JS and WASM linear memory, heavy computation bypasses JS garbage collection pauses.","metadata":{}},{"id":"block-cmvg_seed_14_agnesh-3","type":"paragraph","styles":{},"content":"We demonstrate compiling a high-performance image filter pipeline from Rust using wasm-bindgen, achieving 60fps real-time camera processing on laptops.","metadata":{}}]'::jsonb,
  'How WASM enables complex 3D graphics rendering, image manipulation, and cryptography to run client-side with zero server compute costs.

Shared Linear Memory and JavaScript Interop

WebAssembly provides a compact binary format that executes with predictable performance across all modern web browsers. By passing memory pointers between JS and WASM linear memory, heavy computation bypasses JS garbage collection pauses.

We demonstrate compiling a high-performance image filter pipeline from Rust using wasm-bindgen, achieving 60fps real-time camera processing on laptops.',
  ARRAY['webassembly', 'rust', 'cpp', 'performance', 'webdev']::text[],
  'Technology',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '14 days' - INTERVAL '41 minutes',
  NOW() - INTERVAL '14 days' - INTERVAL '41 minutes',
  NULL,
  190,
  17,
  2040,
  21,
  58,
  NULL,
  NOW() - INTERVAL '14 days' - INTERVAL '41 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #15: Essential System Design Concepts Every CS Student Should Know
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Essential System Design Concepts Every CS Student Should Know',
  'Load balancing, horizontal scaling, caching tiers, CAP theorem, and database sharding illustrated with real-world examples.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_15_agnesh-1","type":"heading-2","styles":{},"content":"Trade-offs Between Consistency and Availability","metadata":{}},{"id":"block-cmvg_seed_15_agnesh-2","type":"paragraph","styles":{},"content":"No single system design is universally correct; every architecture involves deliberate trade-offs. The CAP theorem proves that in the presence of network partitions, systems must choose between consistency and availability.","metadata":{}},{"id":"block-cmvg_seed_15_agnesh-3","type":"paragraph","styles":{},"content":"Understanding write-through versus cache-aside patterns, consistent hashing rings, and read-replica replication lag prepares engineers for high-traffic real world deployments.","metadata":{}}]'::jsonb,
  'A high-yield reference guide for passing system design rounds at leading technology firms and building enterprise-scale applications.

Trade-offs Between Consistency and Availability

No single system design is universally correct; every architecture involves deliberate trade-offs. The CAP theorem proves that in the presence of network partitions, systems must choose between consistency and availability.

Understanding write-through versus cache-aside patterns, consistent hashing rings, and read-replica replication lag prepares engineers for high-traffic real world deployments.',
  ARRAY['system-design', 'scalability', 'architecture', 'caching', 'interview']::text[],
  'System Design',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '15 days' - INTERVAL '58 minutes',
  NOW() - INTERVAL '15 days' - INTERVAL '58 minutes',
  NULL,
  310,
  44,
  3600,
  62,
  130,
  NULL,
  NOW() - INTERVAL '15 days' - INTERVAL '58 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #16: Why We Swapped Webpack for Vite in Our 100K-Line Monorepo
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Why We Swapped Webpack for Vite in Our 100K-Line Monorepo',
  'Transforming our local development experience: reducing dev server cold start from 42 seconds to 300 milliseconds using native ESM.',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_16_agnesh-1","type":"heading-2","styles":{},"content":"Unbundled Development and Instant Hot Module Replacement","metadata":{}},{"id":"block-cmvg_seed_16_agnesh-2","type":"paragraph","styles":{},"content":"Traditional bundlers like Webpack crawl and package the entire application dependency graph before spinning up a local development server. As applications grow to hundreds of modules, developer velocity degrades severely.","metadata":{}},{"id":"block-cmvg_seed_16_agnesh-3","type":"paragraph","styles":{},"content":"Vite solves this by serving source code over native ESM, delegating module graph resolution directly to browser HTTP requests and pre-bundling node_modules with esbuild.","metadata":{}}]'::jsonb,
  'An engineering post-mortem detailing how native ES modules and esbuild pre-bundling revolutionized frontend productivity.

Unbundled Development and Instant Hot Module Replacement

Traditional bundlers like Webpack crawl and package the entire application dependency graph before spinning up a local development server. As applications grow to hundreds of modules, developer velocity degrades severely.

Vite solves this by serving source code over native ESM, delegating module graph resolution directly to browser HTTP requests and pre-bundling node_modules with esbuild.',
  ARRAY['vite', 'webpack', 'monorepo', 'frontend', 'tooling']::text[],
  'Frontend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '16 days' - INTERVAL '15 minutes',
  NOW() - INTERVAL '16 days' - INTERVAL '15 minutes',
  NULL,
  168,
  15,
  1820,
  17,
  43,
  NULL,
  NOW() - INTERVAL '16 days' - INTERVAL '15 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #17: Understanding Linux Namespaces and Cgroups: Building a Container from Scratch
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Understanding Linux Namespaces and Cgroups: Building a Container from Scratch',
  'Stripping away the mystique of Docker by writing a minimal Linux container runtime using Go and Linux syscalls.',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_17_agnesh-1","type":"heading-2","styles":{},"content":"What Exactly Is a Container Under the Hood?","metadata":{}},{"id":"block-cmvg_seed_17_agnesh-2","type":"paragraph","styles":{},"content":"A container is not an actual hardware virtualization construct like a VM; it is merely an ordinary Linux process running with restricted namespace views and resource bounds configured via control groups.","metadata":{}},{"id":"block-cmvg_seed_17_agnesh-3","type":"paragraph","styles":{},"content":"By invoking clone() with CLONE_NEWPID and setting cgroup memory.max limits, we can demonstrate how processes appear completely isolated inside their own sandbox.","metadata":{}}]'::jsonb,
  'Exploring PID, Mount, Network, and IPC namespaces alongside memory cgroups to isolate processes inside a Linux chroot jail.

What Exactly Is a Container Under the Hood?

A container is not an actual hardware virtualization construct like a VM; it is merely an ordinary Linux process running with restricted namespace views and resource bounds configured via control groups.

By invoking clone() with CLONE_NEWPID and setting cgroup memory.max limits, we can demonstrate how processes appear completely isolated inside their own sandbox.',
  ARRAY['linux', 'containers', 'golang', 'devops', 'kernel']::text[],
  'DevOps',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '17 days' - INTERVAL '32 minutes',
  NOW() - INTERVAL '17 days' - INTERVAL '32 minutes',
  NULL,
  240,
  28,
  2680,
  36,
  75,
  NULL,
  NOW() - INTERVAL '17 days' - INTERVAL '32 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #18: How to Build Real-Time Web Apps with WebSockets and Socket.io
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'How to Build Real-Time Web Apps with WebSockets and Socket.io',
  'Bi-directional persistent connections, heartbeat pings, room broadcasting, and Redis adapter scaling for campus chat features.',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_18_agnesh-1","type":"heading-2","styles":{},"content":"Handling Connection Lifecycles and Reconnection Storms","metadata":{}},{"id":"block-cmvg_seed_18_agnesh-2","type":"paragraph","styles":{},"content":"HTTP polling introduces unnecessary header overhead and latency when building real-time messaging, collaborative editors, or live notifications. WebSockets establish an uninterrupted full-duplex TCP stream over port 80/443.","metadata":{}},{"id":"block-cmvg_seed_18_agnesh-3","type":"paragraph","styles":{},"content":"To ensure resilience against fluctuating campus Wi-Fi networks, exponential backoff reconnect logic and server-side connection buffering prevent message drops during momentary disconnections.","metadata":{}}]'::jsonb,
  'Architecting a multi-node real-time chat service capable of synchronizing messages across thousands of concurrent active student sessions.

Handling Connection Lifecycles and Reconnection Storms

HTTP polling introduces unnecessary header overhead and latency when building real-time messaging, collaborative editors, or live notifications. WebSockets establish an uninterrupted full-duplex TCP stream over port 80/443.

To ensure resilience against fluctuating campus Wi-Fi networks, exponential backoff reconnect logic and server-side connection buffering prevent message drops during momentary disconnections.',
  ARRAY['websockets', 'socketio', 'realtime', 'nodejs', 'javascript']::text[],
  'Web Development',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '18 days' - INTERVAL '49 minutes',
  NOW() - INTERVAL '18 days' - INTERVAL '49 minutes',
  NULL,
  202,
  21,
  2280,
  24,
  66,
  NULL,
  NOW() - INTERVAL '18 days' - INTERVAL '49 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #19: Mastering Git Internals: Blobs, Trees, Commits and References Explained
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Mastering Git Internals: Blobs, Trees, Commits and References Explained',
  'Peek behind the .git directory curtain to understand content-addressable storage, SHA-1 object hashes, and how git never truly loses your code.',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_19_agnesh-1","type":"heading-2","styles":{},"content":"Git Is a Content-Addressable Directed Acyclic Graph","metadata":{}},{"id":"block-cmvg_seed_19_agnesh-2","type":"paragraph","styles":{},"content":"Most engineers interact with high-level porcelain commands like git commit or git push without understanding that git is essentially a directed acyclic graph built on top of four immutable primitive object types.","metadata":{}},{"id":"block-cmvg_seed_19_agnesh-3","type":"paragraph","styles":{},"content":"By inspecting the zlib-compressed files inside .git/objects using git cat-file -p, you can trace exactly how commits point to root tree objects and directory snapshots.","metadata":{}}]'::jsonb,
  'Demystifying git reflog, detached HEAD states, interactive rebasing, and three-way merge resolution through low-level plumbing commands.

Git Is a Content-Addressable Directed Acyclic Graph

Most engineers interact with high-level porcelain commands like git commit or git push without understanding that git is essentially a directed acyclic graph built on top of four immutable primitive object types.

By inspecting the zlib-compressed files inside .git/objects using git cat-file -p, you can trace exactly how commits point to root tree objects and directory snapshots.',
  ARRAY['git', 'version-control', 'software-engineering', 'programming', 'tools']::text[],
  'Software Engineering',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '19 days' - INTERVAL '6 minutes',
  NOW() - INTERVAL '19 days' - INTERVAL '6 minutes',
  NULL,
  270,
  32,
  2950,
  41,
  89,
  NULL,
  NOW() - INTERVAL '19 days' - INTERVAL '6 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #20: Graph Neural Networks: Predicting Molecular Properties and Campus Social Networks
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Graph Neural Networks: Predicting Molecular Properties and Campus Social Networks',
  'An introduction to Message Passing Neural Networks (MPNN), node embeddings, and edge classification using PyTorch Geometric.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_20_agnesh-1","type":"heading-2","styles":{},"content":"The Message Passing Paradigm: Aggregate and Update","metadata":{}},{"id":"block-cmvg_seed_20_agnesh-2","type":"paragraph","styles":{},"content":"Standard CNNs rely on spatial locality and fixed pixel grids, making them incapable of modeling irregular data like molecular compounds or citation networks. Graph Neural Networks update node representations by aggregating feature vectors from neighboring nodes.","metadata":{}},{"id":"block-cmvg_seed_20_agnesh-3","type":"paragraph","styles":{},"content":"We demonstrate an implementation of Graph Convolutional Networks (GCN) that predicts club affiliation recommendations based on student project co-authorship records.","metadata":{}}]'::jsonb,
  'Extending deep learning beyond regular grid structures like images and text to arbitrary non-Euclidean graph topological domains.

The Message Passing Paradigm: Aggregate and Update

Standard CNNs rely on spatial locality and fixed pixel grids, making them incapable of modeling irregular data like molecular compounds or citation networks. Graph Neural Networks update node representations by aggregating feature vectors from neighboring nodes.

We demonstrate an implementation of Graph Convolutional Networks (GCN) that predicts club affiliation recommendations based on student project co-authorship records.',
  ARRAY['graph-neural-networks', 'ai', 'machine-learning', 'pytorch', 'research']::text[],
  'Artificial Intelligence',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '20 days' - INTERVAL '23 minutes',
  NOW() - INTERVAL '20 days' - INTERVAL '23 minutes',
  NULL,
  228,
  25,
  2520,
  30,
  70,
  NULL,
  NOW() - INTERVAL '20 days' - INTERVAL '23 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #21: Clean Code Practices: Why Readability Trumps Clever One-Liners
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Clean Code Practices: Why Readability Trumps Clever One-Liners',
  'Meaningful variable naming, single-responsibility functions, eliminating deep nesting, and the real cost of premature optimization.',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_21_agnesh-1","type":"heading-2","styles":{},"content":"The Boy Scout Rule and Self-Documenting Architecture","metadata":{}},{"id":"block-cmvg_seed_21_agnesh-2","type":"paragraph","styles":{},"content":"Junior programmers often prioritize showing off arcane syntax or condensing complex algorithms into dense ternary one-liners. Senior engineers intentionally write boring, explicit code that clearly articulates business logic.","metadata":{}},{"id":"block-cmvg_seed_21_agnesh-3","type":"paragraph","styles":{},"content":"Adopting guard clauses, early returns, and descriptive domain terminology reduces cognitive load and prevents regression bugs from slipping into code reviews.","metadata":{}}]'::jsonb,
  'Code is read ten times more often than it is written. Writing maintainable software means optimizing for the human engineer who inherits your codebase tomorrow.

The Boy Scout Rule and Self-Documenting Architecture

Junior programmers often prioritize showing off arcane syntax or condensing complex algorithms into dense ternary one-liners. Senior engineers intentionally write boring, explicit code that clearly articulates business logic.

Adopting guard clauses, early returns, and descriptive domain terminology reduces cognitive load and prevents regression bugs from slipping into code reviews.',
  ARRAY['cleancode', 'programming', 'refactoring', 'best-practices', 'software']::text[],
  'Engineering Best Practices',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '21 days' - INTERVAL '40 minutes',
  NOW() - INTERVAL '21 days' - INTERVAL '40 minutes',
  NULL,
  312,
  46,
  3380,
  58,
  115,
  NULL,
  NOW() - INTERVAL '21 days' - INTERVAL '40 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #22: Building Dark Mode Without CSS Flashes: Secrets of Theme Toggle Engineering
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Building Dark Mode Without CSS Flashes: Secrets of Theme Toggle Engineering',
  'Avoiding FOIT (Flash of Inverted Theme) using blocking inline script hydration, CSS custom properties, and localStorage synchronization.',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_22_agnesh-1","type":"heading-2","styles":{},"content":"The Root Cause of Theme Flashes and the Head Script Solution","metadata":{}},{"id":"block-cmvg_seed_22_agnesh-2","type":"paragraph","styles":{},"content":"If your dark mode toggle relies on React useEffect or window load events to apply theme classes, users will inevitably experience an annoying flash of bright white light on initial page loads.","metadata":{}},{"id":"block-cmvg_seed_22_agnesh-3","type":"paragraph","styles":{},"content":"By injecting a tiny synchronous script in the document <head> before stylesheets render, the theme class is applied instantly before the browser calculates the first paint layout.","metadata":{}}]'::jsonb,
  'A foolproof implementation pattern for instant theme rendering that respects system preferences and persists user overrides seamlessly.

The Root Cause of Theme Flashes and the Head Script Solution

If your dark mode toggle relies on React useEffect or window load events to apply theme classes, users will inevitably experience an annoying flash of bright white light on initial page loads.

By injecting a tiny synchronous script in the document <head> before stylesheets render, the theme class is applied instantly before the browser calculates the first paint layout.',
  ARRAY['css', 'darkmode', 'frontend', 'javascript', 'webdev']::text[],
  'Frontend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '22 days' - INTERVAL '57 minutes',
  NOW() - INTERVAL '22 days' - INTERVAL '57 minutes',
  NULL,
  185,
  18,
  1980,
  20,
  54,
  NULL,
  NOW() - INTERVAL '22 days' - INTERVAL '57 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #23: Demystifying GraphQL: Schema Definition, Resolvers, and DataLoader N+1 Prevention
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Demystifying GraphQL: Schema Definition, Resolvers, and DataLoader N+1 Prevention',
  'When to choose GraphQL over REST APIs, implementing strongly-typed schemas, and eliminating the notorious N+1 database query waterfall.',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_23_agnesh-1","type":"heading-2","styles":{},"content":"Batching Queries with In-Memory Key Accumulation","metadata":{}},{"id":"block-cmvg_seed_23_agnesh-2","type":"paragraph","styles":{},"content":"While GraphQL allows frontend clients to request precisely the data fields they require, naive resolver implementations trigger exponential database queries when traversing relational graphs.","metadata":{}},{"id":"block-cmvg_seed_23_agnesh-3","type":"paragraph","styles":{},"content":"DataLoader solves this by collating all individual lookups issued within a single event-loop tick into an atomic batch array request, preserving single-query performance.","metadata":{}}]'::jsonb,
  'How Facebook engineered DataLoader batching and caching to solve nested resolver performance bottlenecks in large-scale social graphs.

Batching Queries with In-Memory Key Accumulation

While GraphQL allows frontend clients to request precisely the data fields they require, naive resolver implementations trigger exponential database queries when traversing relational graphs.

DataLoader solves this by collating all individual lookups issued within a single event-loop tick into an atomic batch array request, preserving single-query performance.',
  ARRAY['graphql', 'backend', 'api', 'typescript', 'databases']::text[],
  'Backend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '23 days' - INTERVAL '14 minutes',
  NOW() - INTERVAL '23 days' - INTERVAL '14 minutes',
  NULL,
  198,
  20,
  2140,
  23,
  62,
  NULL,
  NOW() - INTERVAL '23 days' - INTERVAL '14 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #24: The Ultimate Guide to Tech Internships: Resume Prep, Cold Outreach, and Interviews
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'The Ultimate Guide to Tech Internships: Resume Prep, Cold Outreach, and Interviews',
  'How I landed summer engineering offers at leading tech companies through targeted GitHub projects, crisp resumes, and alumni networking.',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_24_agnesh-1","type":"heading-2","styles":{},"content":"Crafting High-Impact Bullet Points with the XYZ Formula","metadata":{}},{"id":"block-cmvg_seed_24_agnesh-2","type":"paragraph","styles":{},"content":"Resumes that list job responsibilities are quickly discarded. Top recruiters search for quantified accomplishments formatted using Google''s XYZ formula: Accomplished [X], as measured by [Y], by doing [Z].","metadata":{}},{"id":"block-cmvg_seed_24_agnesh-3","type":"paragraph","styles":{},"content":"Coupling a tailored resume with active engagement on LinkedIn and contributing to campus projects signals initiative and real-world problem-solving capability.","metadata":{}}]'::jsonb,
  'Actionable frameworks for formatting technical resumes, passing automated ATS filters, and standing out during behavioral and technical interview loops.

Crafting High-Impact Bullet Points with the XYZ Formula

Resumes that list job responsibilities are quickly discarded. Top recruiters search for quantified accomplishments formatted using Google''s XYZ formula: Accomplished [X], as measured by [Y], by doing [Z].

Coupling a tailored resume with active engagement on LinkedIn and contributing to campus projects signals initiative and real-world problem-solving capability.',
  ARRAY['internships', 'career', 'resume', 'interviews', 'students']::text[],
  'Career',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '24 days' - INTERVAL '31 minutes',
  NOW() - INTERVAL '24 days' - INTERVAL '31 minutes',
  NULL,
  365,
  58,
  4320,
  78,
  145,
  NULL,
  NOW() - INTERVAL '24 days' - INTERVAL '31 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #25: Understanding OAuth 2.0 and OpenID Connect: Tokens, Scopes, and PKCE
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Understanding OAuth 2.0 and OpenID Connect: Tokens, Scopes, and PKCE',
  'How authentication and authorization protocols secure modern web applications, APIs, and mobile clients against cross-site request attacks.',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_25_agnesh-1","type":"heading-2","styles":{},"content":"Why You Should Never Store Access Tokens in localStorage","metadata":{}},{"id":"block-cmvg_seed_25_agnesh-2","type":"paragraph","styles":{},"content":"Storing JWT authentication tokens in browser localStorage leaves user sessions vulnerable to cross-site scripting (XSS) attacks. Any malicious script running in your domain can extract the token effortlessly.","metadata":{}},{"id":"block-cmvg_seed_25_agnesh-3","type":"paragraph","styles":{},"content":"We demonstrate setting up HTTP-only, SameSite=Strict cookies coupled with refresh token rotation to deliver ironclad session security.","metadata":{}}]'::jsonb,
  'A breakdown of authorization code grant flows with PKCE (Proof Key for Code Exchange) and best practices for token storage.

Why You Should Never Store Access Tokens in localStorage

Storing JWT authentication tokens in browser localStorage leaves user sessions vulnerable to cross-site scripting (XSS) attacks. Any malicious script running in your domain can extract the token effortlessly.

We demonstrate setting up HTTP-only, SameSite=Strict cookies coupled with refresh token rotation to deliver ironclad session security.',
  ARRAY['security', 'oauth', 'authentication', 'jwt', 'backend']::text[],
  'Security',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '25 days' - INTERVAL '48 minutes',
  NOW() - INTERVAL '25 days' - INTERVAL '48 minutes',
  NULL,
  240,
  27,
  2590,
  32,
  77,
  NULL,
  NOW() - INTERVAL '25 days' - INTERVAL '48 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #26: Deploying Kubernetes on Bare Metal: Our Campus Lab Cluster Journey
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Deploying Kubernetes on Bare Metal: Our Campus Lab Cluster Journey',
  'Configuring k3s, Cilium eBPF networking, Rook-Ceph distributed storage, and MetalLB across decommissioned department workstations.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_26_agnesh-1","type":"heading-2","styles":{},"content":"Lightweight Control Planes and eBPF Packet Routing","metadata":{}},{"id":"block-cmvg_seed_26_agnesh-2","type":"paragraph","styles":{},"content":"Running full-blown vanilla Kubernetes on resource-constrained lab computers introduces unnecessary memory overhead. Adopting k3s stripped down legacy cloud-provider drivers while retaining full CNCF conformance.","metadata":{}},{"id":"block-cmvg_seed_26_agnesh-3","type":"paragraph","styles":{},"content":"Pairing Cilium with eBPF allowed our cluster to route internal service traffic directly at the Linux kernel level, bypassing iptables latency bottlenecks.","metadata":{}}]'::jsonb,
  'How we repurposed 12 legacy laboratory desktop computers into a high-availability Kubernetes compute cluster for student project hosting.

Lightweight Control Planes and eBPF Packet Routing

Running full-blown vanilla Kubernetes on resource-constrained lab computers introduces unnecessary memory overhead. Adopting k3s stripped down legacy cloud-provider drivers while retaining full CNCF conformance.

Pairing Cilium with eBPF allowed our cluster to route internal service traffic directly at the Linux kernel level, bypassing iptables latency bottlenecks.',
  ARRAY['kubernetes', 'devops', 'baremetal', 'linux', 'networking']::text[],
  'DevOps',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '26 days' - INTERVAL '5 minutes',
  NOW() - INTERVAL '26 days' - INTERVAL '5 minutes',
  NULL,
  210,
  22,
  2310,
  25,
  68,
  NULL,
  NOW() - INTERVAL '26 days' - INTERVAL '5 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #27: Exploring 3D Web Graphics: Shader Programming with Three.js and GLSL
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Exploring 3D Web Graphics: Shader Programming with Three.js and GLSL',
  'Writing vertex and fragment shaders, manipulating UV coordinates, and rendering procedural noise fields in browser canvases.',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_27_agnesh-1","type":"heading-2","styles":{},"content":"From Geometry Vertices to Rasterized Pixels","metadata":{}},{"id":"block-cmvg_seed_27_agnesh-2","type":"paragraph","styles":{},"content":"Traditional web animations rely on the CPU to calculate position updates on DOM elements. Writing custom GLSL fragment shaders executes computations across millions of screen pixels simultaneously on the GPU.","metadata":{}},{"id":"block-cmvg_seed_27_agnesh-3","type":"paragraph","styles":{},"content":"We construct a glowing procedural topographical grid that responds dynamically to mouse movement and scroll momentum without dropping below 60fps.","metadata":{}}]'::jsonb,
  'Unlocking parallel GPU computation in browser viewports to create responsive generative art, ripple effects, and holographic interfaces.

From Geometry Vertices to Rasterized Pixels

Traditional web animations rely on the CPU to calculate position updates on DOM elements. Writing custom GLSL fragment shaders executes computations across millions of screen pixels simultaneously on the GPU.

We construct a glowing procedural topographical grid that responds dynamically to mouse movement and scroll momentum without dropping below 60fps.',
  ARRAY['threejs', 'webgl', 'glsl', 'shaders', 'creative-coding']::text[],
  'Creative Technology',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '27 days' - INTERVAL '22 minutes',
  NOW() - INTERVAL '27 days' - INTERVAL '22 minutes',
  NULL,
  255,
  30,
  2840,
  39,
  85,
  NULL,
  NOW() - INTERVAL '27 days' - INTERVAL '22 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #28: Mastering TypeScript Generics: Conditional Types, Infer, and Template Literals
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Mastering TypeScript Generics: Conditional Types, Infer, and Template Literals',
  'Take your TypeScript skills to senior level: building bulletproof type-safe libraries and API contract validation layers.',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_28_agnesh-1","type":"heading-2","styles":{},"content":"Unleashing the Type-Level Turing Completeness","metadata":{}},{"id":"block-cmvg_seed_28_agnesh-2","type":"paragraph","styles":{},"content":"TypeScript''s type system is not merely an annotation tool; it is a full-fledged functional programming language that executes at compile-time to verify data integrity.","metadata":{}},{"id":"block-cmvg_seed_28_agnesh-3","type":"paragraph","styles":{},"content":"By mastering the infer keyword within conditional expressions, developers can effortlessly unpack nested promises, extract function argument tuples, and ensure end-to-end type safety.","metadata":{}}]'::jsonb,
  'Deep dive into mapped types, template literal string patterns, and recursive type inference for production utility development.

Unleashing the Type-Level Turing Completeness

TypeScript''s type system is not merely an annotation tool; it is a full-fledged functional programming language that executes at compile-time to verify data integrity.

By mastering the infer keyword within conditional expressions, developers can effortlessly unpack nested promises, extract function argument tuples, and ensure end-to-end type safety.',
  ARRAY['typescript', 'javascript', 'webdev', 'frontend', 'backend']::text[],
  'Programming Languages',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '28 days' - INTERVAL '39 minutes',
  NOW() - INTERVAL '28 days' - INTERVAL '39 minutes',
  NULL,
  280,
  34,
  3100,
  43,
  96,
  NULL,
  NOW() - INTERVAL '28 days' - INTERVAL '39 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #29: The PSG Tech Library: A Haven for Coders, Dreamers, and Research Pioneers
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'The PSG Tech Library: A Haven for Coders, Dreamers, and Research Pioneers',
  'Discovering quiet study corners, vintage IEEE journals, and late-night research sessions under the historic columns of our campus library.',
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_29_agnesh-1","type":"heading-2","styles":{},"content":"Between Rows of Classic Literature and Modern Tech Monographs","metadata":{}},{"id":"block-cmvg_seed_29_agnesh-2","type":"paragraph","styles":{},"content":"While most student life revolves around noisy canteen tables and bustling lab corridors, the four quiet floors of the college library offer unparalleled stillness for deep intellectual focus.","metadata":{}},{"id":"block-cmvg_seed_29_agnesh-3","type":"paragraph","styles":{},"content":"Tackling challenging algorithm problem sets or reading original papers on distributed systems feels vastly different when surrounded by thousands of classic scientific works.","metadata":{}}]'::jsonb,
  'A personal love letter to the place where countless engineering ideas, hackathon plans, and lifelong friendships were quietly forged.

Between Rows of Classic Literature and Modern Tech Monographs

While most student life revolves around noisy canteen tables and bustling lab corridors, the four quiet floors of the college library offer unparalleled stillness for deep intellectual focus.

Tackling challenging algorithm problem sets or reading original papers on distributed systems feels vastly different when surrounded by thousands of classic scientific works.',
  ARRAY['psgtech', 'campus', 'library', 'studentlife', 'coimbatore']::text[],
  'Campus Life',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '29 days' - INTERVAL '56 minutes',
  NOW() - INTERVAL '29 days' - INTERVAL '56 minutes',
  NULL,
  380,
  62,
  4500,
  82,
  98,
  NULL,
  NOW() - INTERVAL '29 days' - INTERVAL '56 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #30: Introduction to Reinforcement Learning: Q-Learning and Policy Gradients
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Introduction to Reinforcement Learning: Q-Learning and Policy Gradients',
  'Training autonomous agents to master games and navigation environments through trial-and-error reward optimization.',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_30_agnesh-1","type":"heading-2","styles":{},"content":"Balancing Exploration and Exploitation in Dynamic Environments","metadata":{}},{"id":"block-cmvg_seed_30_agnesh-2","type":"paragraph","styles":{},"content":"Unlike supervised learning with fixed ground-truth labels, reinforcement learning requires an agent to actively explore unfamiliar actions to discover optimal reward pathways.","metadata":{}},{"id":"block-cmvg_seed_30_agnesh-3","type":"paragraph","styles":{},"content":"We demonstrate training a simulated inverted pendulum agent using policy gradients in PyTorch, illustrating how experience replay buffers stabilize gradient descent.","metadata":{}}]'::jsonb,
  'Formulating Markov Decision Processes (MDPs), understanding the Bellman optimality equation, and implementing Deep Q-Networks (DQN).

Balancing Exploration and Exploitation in Dynamic Environments

Unlike supervised learning with fixed ground-truth labels, reinforcement learning requires an agent to actively explore unfamiliar actions to discover optimal reward pathways.

We demonstrate training a simulated inverted pendulum agent using policy gradients in PyTorch, illustrating how experience replay buffers stabilize gradient descent.',
  ARRAY['reinforcement-learning', 'ai', 'machine-learning', 'python', 'algorithms']::text[],
  'Artificial Intelligence',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '30 days' - INTERVAL '13 minutes',
  NOW() - INTERVAL '30 days' - INTERVAL '13 minutes',
  NULL,
  235,
  26,
  2620,
  31,
  74,
  NULL,
  NOW() - INTERVAL '30 days' - INTERVAL '13 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #31: How to Build a High-Performance Redis-Backed Rate Limiter in Express
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'How to Build a High-Performance Redis-Backed Rate Limiter in Express',
  'Protecting public API endpoints from scraping and DoS floods using sliding-window counter algorithms and Redis atomic transactions.',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_31_agnesh-1","type":"heading-2","styles":{},"content":"Sliding Window Log vs Sliding Window Counter","metadata":{}},{"id":"block-cmvg_seed_31_agnesh-2","type":"paragraph","styles":{},"content":"Fixed-window counters allow malicious clients to send double their permitted quota right at the transition boundary of the minute window, exhausting server resources.","metadata":{}},{"id":"block-cmvg_seed_31_agnesh-3","type":"paragraph","styles":{},"content":"By storing timestamped requests in Redis sorted sets and pruning expired logs with ZREMRANGEBYSCORE, our rate limiter enforces precise traffic caps with microsecond overhead.","metadata":{}}]'::jsonb,
  'Why fixed-window rate limiters fail during burst traffic spikes, and how Redis ZSET sliding-window algorithms ensure fair usage limits.

Sliding Window Log vs Sliding Window Counter

Fixed-window counters allow malicious clients to send double their permitted quota right at the transition boundary of the minute window, exhausting server resources.

By storing timestamped requests in Redis sorted sets and pruning expired logs with ZREMRANGEBYSCORE, our rate limiter enforces precise traffic caps with microsecond overhead.',
  ARRAY['redis', 'security', 'express', 'nodejs', 'backend']::text[],
  'Backend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '31 days' - INTERVAL '30 minutes',
  NOW() - INTERVAL '31 days' - INTERVAL '30 minutes',
  NULL,
  195,
  18,
  2180,
  22,
  59,
  NULL,
  NOW() - INTERVAL '31 days' - INTERVAL '30 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #32: State Management in 2026: Why Zustand and Jotai Are Replacing Redux
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'State Management in 2026: Why Zustand and Jotai Are Replacing Redux',
  'Embracing atomic and hook-based reactivity: cleaner component code, effortless asynchronous selectors, and zero boilerplate.',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_32_agnesh-1","type":"heading-2","styles":{},"content":"Subscription-Based Re-renders and Fine-Grained Selectors","metadata":{}},{"id":"block-cmvg_seed_32_agnesh-2","type":"paragraph","styles":{},"content":"Large Redux codebases frequently drown in ritualistic boilerplate. React Context, on the other hand, causes all child subscribers to re-render whenever any value in the context changes.","metadata":{}},{"id":"block-cmvg_seed_32_agnesh-3","type":"paragraph","styles":{},"content":"Zustand uses store subscriptions outside React''s render cycle, ensuring that components re-render exclusively when their specific selector output changes.","metadata":{}}]'::jsonb,
  'A direct architectural comparison showing how modern micro-state managers eliminate reducers, action creators, and context re-rendering penalties.

Subscription-Based Re-renders and Fine-Grained Selectors

Large Redux codebases frequently drown in ritualistic boilerplate. React Context, on the other hand, causes all child subscribers to re-render whenever any value in the context changes.

Zustand uses store subscriptions outside React''s render cycle, ensuring that components re-render exclusively when their specific selector output changes.',
  ARRAY['react', 'state-management', 'zustand', 'frontend', 'javascript']::text[],
  'Frontend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '32 days' - INTERVAL '47 minutes',
  NOW() - INTERVAL '32 days' - INTERVAL '47 minutes',
  NULL,
  215,
  25,
  2410,
  28,
  67,
  NULL,
  NOW() - INTERVAL '32 days' - INTERVAL '47 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #33: Reverse Engineering Android Apps: Static Analysis with Jadx and Frida
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Reverse Engineering Android Apps: Static Analysis with Jadx and Frida',
  'Decompiling APKs, inspecting obfuscated Java bytecode, intercepting SSL traffic, and runtime hooking with Frida scripts.',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_33_agnesh-1","type":"heading-2","styles":{},"content":"Dynamic Instrumentation and Hooking Memory Functions","metadata":{}},{"id":"block-cmvg_seed_33_agnesh-2","type":"paragraph","styles":{},"content":"Mobile penetration testing requires understanding both static source code disassembly and dynamic runtime behavior. Jadx decompiles Dalvik bytecode back into readable Java classes.","metadata":{}},{"id":"block-cmvg_seed_33_agnesh-3","type":"paragraph","styles":{},"content":"Injecting Frida hooks allows researchers to dynamically intercept cryptographic keystore invocations and verify whether sensitive tokens are leaking over insecure channels.","metadata":{}}]'::jsonb,
  'Ethical security research walkthrough on analyzing network security configurations and bypassing SSL pinning to inspect mobile API payloads.

Dynamic Instrumentation and Hooking Memory Functions

Mobile penetration testing requires understanding both static source code disassembly and dynamic runtime behavior. Jadx decompiles Dalvik bytecode back into readable Java classes.

Injecting Frida hooks allows researchers to dynamically intercept cryptographic keystore invocations and verify whether sensitive tokens are leaking over insecure channels.',
  ARRAY['cybersecurity', 'android', 'reverse-engineering', 'security', 'tools']::text[],
  'Cybersecurity',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '33 days' - INTERVAL '4 minutes',
  NOW() - INTERVAL '33 days' - INTERVAL '4 minutes',
  NULL,
  290,
  36,
  3250,
  49,
  102,
  NULL,
  NOW() - INTERVAL '33 days' - INTERVAL '4 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #34: Engineering Scalable Real-Time Collaborative Canvas with CRDTs
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Engineering Scalable Real-Time Collaborative Canvas with CRDTs',
  'Building multiplayer whiteboard applications using Yjs, Conflict-free Replicated Data Types, and peer-to-peer WebRTC signaling.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_34_agnesh-1","type":"heading-2","styles":{},"content":"State-Based vs Operation-Based Replicated Data Types","metadata":{}},{"id":"block-cmvg_seed_34_agnesh-2","type":"paragraph","styles":{},"content":"When multiple users edit a shared document simultaneously over erratic connections, traditional central server locks cause crippling latency and poor user experience.","metadata":{}},{"id":"block-cmvg_seed_34_agnesh-3","type":"paragraph","styles":{},"content":"CRDTs mathematically guarantee eventual consistency: as long as all mutation operations eventually arrive at all peers, the reconstructed document states are identical.","metadata":{}}]'::jsonb,
  'How Figma and Google Docs synchronize state across multiple disconnected clients without requiring centralized locking mechanisms.

State-Based vs Operation-Based Replicated Data Types

When multiple users edit a shared document simultaneously over erratic connections, traditional central server locks cause crippling latency and poor user experience.

CRDTs mathematically guarantee eventual consistency: as long as all mutation operations eventually arrive at all peers, the reconstructed document states are identical.',
  ARRAY['crdt', 'webrtc', 'realtime', 'javascript', 'algorithms']::text[],
  'Software Engineering',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '34 days' - INTERVAL '21 minutes',
  NOW() - INTERVAL '34 days' - INTERVAL '21 minutes',
  NULL,
  245,
  29,
  2780,
  35,
  83,
  NULL,
  NOW() - INTERVAL '34 days' - INTERVAL '21 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #35: From 0 to 1: Launching Our Campus Event Management Platform
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'From 0 to 1: Launching Our Campus Event Management Platform',
  'How our student developer team designed, coded, and deployed a platform handling 4,000+ registrations for the annual college symposium.',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_35_agnesh-1","type":"heading-2","styles":{},"content":"Architecture Under Load: Surviving the 9:00 AM Registration Rush","metadata":{}},{"id":"block-cmvg_seed_35_agnesh-2","type":"paragraph","styles":{},"content":"When campus festival registrations opened, our servers experienced over 300 requests per second within the first five minutes. Implementing Redis caching for event catalog data prevented database CPU saturation.","metadata":{}},{"id":"block-cmvg_seed_35_agnesh-3","type":"paragraph","styles":{},"content":"Generating digital pass QR codes client-side using Web Workers eliminated server image processing bottlenecks, enabling instant verification at entrance gates.","metadata":{}}]'::jsonb,
  'Handling ticket QR code validation, automated email confirmations, and sudden registration spikes on affordable cloud infrastructure.

Architecture Under Load: Surviving the 9:00 AM Registration Rush

When campus festival registrations opened, our servers experienced over 300 requests per second within the first five minutes. Implementing Redis caching for event catalog data prevented database CPU saturation.

Generating digital pass QR codes client-side using Web Workers eliminated server image processing bottlenecks, enabling instant verification at entrance gates.',
  ARRAY['psgtech', 'symposium', 'fullstack', 'startup', 'webdev']::text[],
  'Campus Life',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '35 days' - INTERVAL '38 minutes',
  NOW() - INTERVAL '35 days' - INTERVAL '38 minutes',
  NULL,
  355,
  54,
  4190,
  71,
  104,
  NULL,
  NOW() - INTERVAL '35 days' - INTERVAL '38 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #36: Understanding Memory Leaks in Node.js: Heap Profiling with Chrome DevTools
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Understanding Memory Leaks in Node.js: Heap Profiling with Chrome DevTools',
  'Diagnosing closures, uncleared event listeners, global caches, and inspecting V8 memory snapshots to keep production services stable.',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_36_agnesh-1","type":"heading-2","styles":{},"content":"Retaining Trees, Shallow Size vs Retained Size","metadata":{}},{"id":"block-cmvg_seed_36_agnesh-2","type":"paragraph","styles":{},"content":"Node.js applications running inside containers with strict memory limits will eventually trigger OOM (Out of Memory) kills if references to discarded objects persist in scope.","metadata":{}},{"id":"block-cmvg_seed_36_agnesh-3","type":"paragraph","styles":{},"content":"By taking baseline heap snapshots and comparing retained object trees after load test spikes, developers can quickly locate lingering callback closures and unevicted map caches.","metadata":{}}]'::jsonb,
  'A hands-on debugging guide using node --inspect and heap snapshot comparisons to track down elusive production memory consumption.

Retaining Trees, Shallow Size vs Retained Size

Node.js applications running inside containers with strict memory limits will eventually trigger OOM (Out of Memory) kills if references to discarded objects persist in scope.

By taking baseline heap snapshots and comparing retained object trees after load test spikes, developers can quickly locate lingering callback closures and unevicted map caches.',
  ARRAY['nodejs', 'performance', 'memory', 'debugging', 'backend']::text[],
  'Backend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '36 days' - INTERVAL '55 minutes',
  NOW() - INTERVAL '36 days' - INTERVAL '55 minutes',
  NULL,
  205,
  21,
  2260,
  24,
  63,
  NULL,
  NOW() - INTERVAL '36 days' - INTERVAL '55 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #37: Why Bun Is Changing the JavaScript Ecosystem Forever
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Why Bun Is Changing the JavaScript Ecosystem Forever',
  'Built with Zig and Apple WebKit JavaScriptCore: native TypeScript execution, ultra-fast package manager, and built-in SQLite integration.',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_37_agnesh-1","type":"heading-2","styles":{},"content":"The Speed of Native Zig Implementation and WebKit Core","metadata":{}},{"id":"block-cmvg_seed_37_agnesh-2","type":"paragraph","styles":{},"content":"For over a decade, Node.js and the V8 engine dominated server-side JavaScript. Bun rethinks this foundation by pairing the Zig programming language with Apple''s lightweight JavaScriptCore engine.","metadata":{}},{"id":"block-cmvg_seed_37_agnesh-3","type":"paragraph","styles":{},"content":"Our monorepo install times dropped from 48 seconds to 3.2 seconds, and bun test executes over 400 unit tests in under 800 milliseconds.","metadata":{}}]'::jsonb,
  'Benchmarking bun install versus npm, exploring native test runners, and running high-throughput web APIs without transpilation steps.

The Speed of Native Zig Implementation and WebKit Core

For over a decade, Node.js and the V8 engine dominated server-side JavaScript. Bun rethinks this foundation by pairing the Zig programming language with Apple''s lightweight JavaScriptCore engine.

Our monorepo install times dropped from 48 seconds to 3.2 seconds, and bun test executes over 400 unit tests in under 800 milliseconds.',
  ARRAY['bun', 'javascript', 'zig', 'typescript', 'runtime']::text[],
  'Technology',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '37 days' - INTERVAL '12 minutes',
  NOW() - INTERVAL '37 days' - INTERVAL '12 minutes',
  NULL,
  310,
  41,
  3490,
  55,
  118,
  NULL,
  NOW() - INTERVAL '37 days' - INTERVAL '12 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #38: An Engineer's Field Guide to Clean Architecture and Domain-Driven Design
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'An Engineer''s Field Guide to Clean Architecture and Domain-Driven Design',
  'Separating business logic from delivery frameworks: entities, use cases, repository interfaces, and dependency inversion in practice.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_38_agnesh-1","type":"heading-2","styles":{},"content":"The Dependency Rule: Dependencies Only Point Inward","metadata":{}},{"id":"block-cmvg_seed_38_agnesh-2","type":"paragraph","styles":{},"content":"When application logic becomes tightly coupled to specific database ORMs or HTTP framework handlers, refactoring becomes treacherous and unit testing requires cumbersome mocking.","metadata":{}},{"id":"block-cmvg_seed_38_agnesh-3","type":"paragraph","styles":{},"content":"Clean Architecture decouples core domain entities from external concerns, allowing teams to swap storage engines or migration frameworks without altering a single business rule.","metadata":{}}]'::jsonb,
  'Building software systems whose core domain models remain completely agnostic of database drivers, ORMs, and web presentation frameworks.

The Dependency Rule: Dependencies Only Point Inward

When application logic becomes tightly coupled to specific database ORMs or HTTP framework handlers, refactoring becomes treacherous and unit testing requires cumbersome mocking.

Clean Architecture decouples core domain entities from external concerns, allowing teams to swap storage engines or migration frameworks without altering a single business rule.',
  ARRAY['cleancode', 'architecture', 'ddd', 'backend', 'software-engineering']::text[],
  'Architecture',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '38 days' - INTERVAL '29 minutes',
  NOW() - INTERVAL '38 days' - INTERVAL '29 minutes',
  NULL,
  260,
  31,
  2890,
  37,
  86,
  NULL,
  NOW() - INTERVAL '38 days' - INTERVAL '29 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #39: Mastering Git Rebase: Interactive Squashing, Fixing Commits, and Branch Hygiene
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Mastering Git Rebase: Interactive Squashing, Fixing Commits, and Branch Hygiene',
  'Keep your pull request histories pristine: interactive rebasing, autosquash, reword, and resolving conflicts with surgical precision.',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_39_agnesh-1","type":"heading-2","styles":{},"content":"Crafting Commits That Tell a Clear Story","metadata":{}},{"id":"block-cmvg_seed_39_agnesh-2","type":"paragraph","styles":{},"content":"A clean git commit log is not vanity; it is the primary documentation tool engineers use to bisect regression bugs and understand historical architectural intent.","metadata":{}},{"id":"block-cmvg_seed_39_agnesh-3","type":"paragraph","styles":{},"content":"Using git commit --fixup coupled with git rebase -i --autosquash lets you seamlessly integrate tweaks into past commits without manually rearranging interactive rebase todo lists.","metadata":{}}]'::jsonb,
  'Stop pushing messy ''wip'', ''fix typo'', and ''test 2'' commits to upstream repositories. Learn the art of crafting clean linear git histories.

Crafting Commits That Tell a Clear Story

A clean git commit log is not vanity; it is the primary documentation tool engineers use to bisect regression bugs and understand historical architectural intent.

Using git commit --fixup coupled with git rebase -i --autosquash lets you seamlessly integrate tweaks into past commits without manually rearranging interactive rebase todo lists.',
  ARRAY['git', 'version-control', 'productivity', 'best-practices', 'software']::text[],
  'DevOps',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '39 days' - INTERVAL '46 minutes',
  NOW() - INTERVAL '39 days' - INTERVAL '46 minutes',
  NULL,
  220,
  24,
  2430,
  29,
  73,
  NULL,
  NOW() - INTERVAL '39 days' - INTERVAL '46 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #40: Building Real-Time Notifications with Server-Sent Events (SSE) and HTTP/2
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Building Real-Time Notifications with Server-Sent Events (SSE) and HTTP/2',
  'Why SSE is often a simpler, lighter alternative to WebSockets for one-way server-to-client notifications and streaming LLM responses.',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_40_agnesh-1","type":"heading-2","styles":{},"content":"Lightweight Streaming Over Standard HTTP Connections","metadata":{}},{"id":"block-cmvg_seed_40_agnesh-2","type":"paragraph","styles":{},"content":"While WebSockets require dedicated protocol handshakes and custom proxy configurations, Server-Sent Events operate over standard HTTP, benefiting natively from HTTP/2 multiplexing.","metadata":{}},{"id":"block-cmvg_seed_40_agnesh-3","type":"paragraph","styles":{},"content":"Browsers provide the native EventSource API with built-in automatic reconnects and Last-Event-ID tracking, making SSE ideal for live feed updates and AI token streaming.","metadata":{}}]'::jsonb,
  'Exploring text/event-stream headers, automatic browser reconnection, and message ID resumption for resilient live updates.

Lightweight Streaming Over Standard HTTP Connections

While WebSockets require dedicated protocol handshakes and custom proxy configurations, Server-Sent Events operate over standard HTTP, benefiting natively from HTTP/2 multiplexing.

Browsers provide the native EventSource API with built-in automatic reconnects and Last-Event-ID tracking, making SSE ideal for live feed updates and AI token streaming.',
  ARRAY['sse', 'http2', 'realtime', 'webdev', 'backend']::text[],
  'Backend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '40 days' - INTERVAL '3 minutes',
  NOW() - INTERVAL '40 days' - INTERVAL '3 minutes',
  NULL,
  188,
  19,
  2090,
  21,
  55,
  NULL,
  NOW() - INTERVAL '40 days' - INTERVAL '3 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #41: Exploring Quantum Computing: Simulating Qubits and Superposition in Python
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Exploring Quantum Computing: Simulating Qubits and Superposition in Python',
  'An introduction to quantum gates, the Hadamard transformation, Bell states, and running quantum circuits on IBM Quantum experience.',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_41_agnesh-1","type":"heading-2","styles":{},"content":"From Classical Bits to Bloch Spheres and State Vectors","metadata":{}},{"id":"block-cmvg_seed_41_agnesh-2","type":"paragraph","styles":{},"content":"While classical bits exist strictly as binary 0 or 1 states, qubits exist in a linear combination of both basis states until observed through quantum measurement.","metadata":{}},{"id":"block-cmvg_seed_41_agnesh-3","type":"paragraph","styles":{},"content":"Using Qiskit, we construct a 2-qubit circuit that entangles particles into an Einstein-Podolsky-Rosen (EPR) Bell state and execute it on a real cloud-based quantum processor.","metadata":{}}]'::jsonb,
  'Understanding how quantum superposition and entanglement enable quantum algorithms like Shor''s and Grover''s to outperform classical computing.

From Classical Bits to Bloch Spheres and State Vectors

While classical bits exist strictly as binary 0 or 1 states, qubits exist in a linear combination of both basis states until observed through quantum measurement.

Using Qiskit, we construct a 2-qubit circuit that entangles particles into an Einstein-Podolsky-Rosen (EPR) Bell state and execute it on a real cloud-based quantum processor.',
  ARRAY['quantum', 'qiskit', 'python', 'physics', 'future-tech']::text[],
  'Physics & Computing',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '41 days' - INTERVAL '20 minutes',
  NOW() - INTERVAL '41 days' - INTERVAL '20 minutes',
  NULL,
  275,
  33,
  3050,
  42,
  91,
  NULL,
  NOW() - INTERVAL '41 days' - INTERVAL '20 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #42: How to Build a Custom Component Library with Radix UI and Tailwind CSS
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'How to Build a Custom Component Library with Radix UI and Tailwind CSS',
  'Accessible, unstyled primitives paired with utility CSS: dropdowns, dialogs, tooltips, and accordion components that pass WCAG standards.',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_42_agnesh-1","type":"heading-2","styles":{},"content":"Accessibility Is Not an Afterthought","metadata":{}},{"id":"block-cmvg_seed_42_agnesh-2","type":"paragraph","styles":{},"content":"Building modal dialogs or popovers from scratch often results in broken keyboard trap behavior, missing aria-expanded attributes, and unusable screen reader experiences.","metadata":{}},{"id":"block-cmvg_seed_42_agnesh-3","type":"paragraph","styles":{},"content":"Radix UI primitives handle complex focus management and WAI-ARIA conformance under the hood, leaving developers free to style components using Tailwind classes.","metadata":{}}]'::jsonb,
  'Creating a production design system where keyboard navigation, screen reader ARIA attributes, and focus trapping are guaranteed out of the box.

Accessibility Is Not an Afterthought

Building modal dialogs or popovers from scratch often results in broken keyboard trap behavior, missing aria-expanded attributes, and unusable screen reader experiences.

Radix UI primitives handle complex focus management and WAI-ARIA conformance under the hood, leaving developers free to style components using Tailwind classes.',
  ARRAY['radix-ui', 'tailwindcss', 'accessibility', 'frontend', 'react']::text[],
  'Frontend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '42 days' - INTERVAL '37 minutes',
  NOW() - INTERVAL '42 days' - INTERVAL '37 minutes',
  NULL,
  205,
  20,
  2280,
  25,
  64,
  NULL,
  NOW() - INTERVAL '42 days' - INTERVAL '37 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #43: A Deep Dive into Linux File Systems: Ext4, Inodes, and Disk Fragmentation
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'A Deep Dive into Linux File Systems: Ext4, Inodes, and Disk Fragmentation',
  'How operating systems organize data blocks, manage directories, resolve symlinks, and maintain journaling integrity across power cuts.',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_43_agnesh-1","type":"heading-2","styles":{},"content":"Inodes, Hard Links, and Data Block Allocation","metadata":{}},{"id":"block-cmvg_seed_43_agnesh-2","type":"paragraph","styles":{},"content":"In UNIX-like file systems, file names are merely directory entries that map to numerical inodes. The inode contains file metadata, permissions, and direct or indirect data block pointers.","metadata":{}},{"id":"block-cmvg_seed_43_agnesh-3","type":"paragraph","styles":{},"content":"Understanding how journaling modes (ordered, journal, writeback) prevent filesystem corruption after unexpected reboots is critical for systems and database administrators.","metadata":{}}]'::jsonb,
  'Investigating the role of superblock descriptors, inode pointers, and delayed block allocation in maximizing disk I/O throughput.

Inodes, Hard Links, and Data Block Allocation

In UNIX-like file systems, file names are merely directory entries that map to numerical inodes. The inode contains file metadata, permissions, and direct or indirect data block pointers.

Understanding how journaling modes (ordered, journal, writeback) prevent filesystem corruption after unexpected reboots is critical for systems and database administrators.',
  ARRAY['linux', 'operating-systems', 'kernel', 'storage', 'systems']::text[],
  'Operating Systems',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '43 days' - INTERVAL '54 minutes',
  NOW() - INTERVAL '43 days' - INTERVAL '54 minutes',
  NULL,
  190,
  17,
  2110,
  22,
  56,
  NULL,
  NOW() - INTERVAL '43 days' - INTERVAL '54 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #44: The Art of Writing Technical Documentation: Why Great Code Needs Great Docs
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'The Art of Writing Technical Documentation: Why Great Code Needs Great Docs',
  'Clear READMEs, architecture decision records (ADRs), interactive OpenAPI playgrounds, and onboarding guides that delight developers.',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_44_agnesh-1","type":"heading-2","styles":{},"content":"Documentation as an Engineering Force Multiplier","metadata":{}},{"id":"block-cmvg_seed_44_agnesh-2","type":"paragraph","styles":{},"content":"When documentation is missing or outdated, new contributors spend hours deciphering implicit conventions and troubleshooting environment configuration failures.","metadata":{}},{"id":"block-cmvg_seed_44_agnesh-3","type":"paragraph","styles":{},"content":"Writing Architecture Decision Records (ADRs) captures the context, options considered, and trade-offs behind critical decisions, saving months of future debate.","metadata":{}}]'::jsonb,
  'Why the most successful open-source projects and internal engineering platforms are defined by their documentation clarity rather than code volume.

Documentation as an Engineering Force Multiplier

When documentation is missing or outdated, new contributors spend hours deciphering implicit conventions and troubleshooting environment configuration failures.

Writing Architecture Decision Records (ADRs) captures the context, options considered, and trade-offs behind critical decisions, saving months of future debate.',
  ARRAY['documentation', 'writing', 'best-practices', 'developer-experience', 'communication']::text[],
  'Software Engineering',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '44 days' - INTERVAL '11 minutes',
  NOW() - INTERVAL '44 days' - INTERVAL '11 minutes',
  NULL,
  230,
  26,
  2570,
  31,
  78,
  NULL,
  NOW() - INTERVAL '44 days' - INTERVAL '11 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #45: How to Build a Fast, Scalable Search Service with Meilisearch and Prisma
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'How to Build a Fast, Scalable Search Service with Meilisearch and Prisma',
  'Typo-tolerant instant search, custom ranking rules, and automated database sync for lightning-fast campus course and user discovery.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_45_agnesh-1","type":"heading-2","styles":{},"content":"Typo Tolerance and Relevance Tuning","metadata":{}},{"id":"block-cmvg_seed_45_agnesh-2","type":"paragraph","styles":{},"content":"While Elasticsearch requires substantial RAM and JVM cluster tuning, Meilisearch provides a lean, Rust-built alternative that delivers instant search out of the box.","metadata":{}},{"id":"block-cmvg_seed_45_agnesh-3","type":"paragraph","styles":{},"content":"By setting up Prisma middleware or database triggers, updates to student clubs and blog posts replicate into search indexes within milliseconds.","metadata":{}}]'::jsonb,
  'Integrating a lightweight open-source search engine that delivers search-as-you-type responses under 15ms across hundreds of thousands of records.

Typo Tolerance and Relevance Tuning

While Elasticsearch requires substantial RAM and JVM cluster tuning, Meilisearch provides a lean, Rust-built alternative that delivers instant search out of the box.

By setting up Prisma middleware or database triggers, updates to student clubs and blog posts replicate into search indexes within milliseconds.',
  ARRAY['search', 'meilisearch', 'prisma', 'databases', 'backend']::text[],
  'Search & Retrieval',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '45 days' - INTERVAL '28 minutes',
  NOW() - INTERVAL '45 days' - INTERVAL '28 minutes',
  NULL,
  215,
  22,
  2390,
  26,
  69,
  NULL,
  NOW() - INTERVAL '45 days' - INTERVAL '28 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #46: An Introduction to Web Performance Metrics: Core Web Vitals Explained
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'An Introduction to Web Performance Metrics: Core Web Vitals Explained',
  'Diagnosing and optimizing Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP).',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_46_agnesh-1","type":"heading-2","styles":{},"content":"From First Paint to Smooth User Interaction","metadata":{}},{"id":"block-cmvg_seed_46_agnesh-2","type":"paragraph","styles":{},"content":"User retention drops sharply when web applications take more than two seconds to render interactive content. Google''s Core Web Vitals standardize quantitative metrics for perceived speed.","metadata":{}},{"id":"block-cmvg_seed_46_agnesh-3","type":"paragraph","styles":{},"content":"Optimizing responsive image srcset attributes and avoiding dynamic DOM insertions above existing content ensures a perfect 100/100 Lighthouse performance rating.","metadata":{}}]'::jsonb,
  'Actionable strategies for reducing font-display reflows, prioritizing hero image preloading, and minimizing long tasks on mobile devices.

From First Paint to Smooth User Interaction

User retention drops sharply when web applications take more than two seconds to render interactive content. Google''s Core Web Vitals standardize quantitative metrics for perceived speed.

Optimizing responsive image srcset attributes and avoiding dynamic DOM insertions above existing content ensures a perfect 100/100 Lighthouse performance rating.',
  ARRAY['performance', 'webdev', 'seo', 'core-web-vitals', 'frontend']::text[],
  'Web Development',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '46 days' - INTERVAL '45 minutes',
  NOW() - INTERVAL '46 days' - INTERVAL '45 minutes',
  NULL,
  180,
  16,
  1980,
  19,
  50,
  NULL,
  NOW() - INTERVAL '46 days' - INTERVAL '45 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #47: Building an Autonomous Drone Navigation System with ROS2 and OpenCV
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Building an Autonomous Drone Navigation System with ROS2 and OpenCV',
  'Sensor fusion with IMU and LIDAR, visual odometry, and obstacle avoidance algorithms on embedded Raspberry Pi and Jetson boards.',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_47_agnesh-1","type":"heading-2","styles":{},"content":"Real-Time Visual Odometry and Spatial Mapping","metadata":{}},{"id":"block-cmvg_seed_47_agnesh-2","type":"paragraph","styles":{},"content":"GPS signals are notoriously unreliable inside campus corridors and laboratories. Autonomous rovers and quadcopters must rely on real-time stereo camera feeds and IMU sensor fusion.","metadata":{}},{"id":"block-cmvg_seed_47_agnesh-3","type":"paragraph","styles":{},"content":"Using ROS2 nodes communicating over DDS (Data Distribution Service), our navigation pipeline computes point-cloud collision vectors at 30 frames per second.","metadata":{}}]'::jsonb,
  'Our college robotics club''s adventure in configuring SLAM (Simultaneous Localization and Mapping) for autonomous drone indoor navigation.

Real-Time Visual Odometry and Spatial Mapping

GPS signals are notoriously unreliable inside campus corridors and laboratories. Autonomous rovers and quadcopters must rely on real-time stereo camera feeds and IMU sensor fusion.

Using ROS2 nodes communicating over DDS (Data Distribution Service), our navigation pipeline computes point-cloud collision vectors at 30 frames per second.',
  ARRAY['robotics', 'ros2', 'opencv', 'computer-vision', 'embedded']::text[],
  'Robotics',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '47 days' - INTERVAL '2 minutes',
  NOW() - INTERVAL '47 days' - INTERVAL '2 minutes',
  NULL,
  320,
  45,
  3580,
  59,
  110,
  NULL,
  NOW() - INTERVAL '47 days' - INTERVAL '2 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #48: Building an E-Commerce Payment Gateway with Stripe and Webhook Signatures
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Building an E-Commerce Payment Gateway with Stripe and Webhook Signatures',
  'Secure payment processing, handling idempotency keys, SCA (Strong Customer Authentication), and validating asynchronous webhook signatures.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_48_agnesh-1","type":"heading-2","styles":{},"content":"The Dangers of Relying on Client-Side Payment Callbacks","metadata":{}},{"id":"block-cmvg_seed_48_agnesh-2","type":"paragraph","styles":{},"content":"Never fulfill user orders or grant digital entitlements based solely on client-side redirect responses; users can close their browser or intercept redirect payloads.","metadata":{}},{"id":"block-cmvg_seed_48_agnesh-3","type":"paragraph","styles":{},"content":"We demonstrate verifying Stripe''s HMAC-SHA256 signature headers with raw body parsing to ensure only verified, authentic bank transactions fulfill student orders.","metadata":{}}]'::jsonb,
  'Preventing payment double-charging and race conditions by strictly relying on cryptographically signed webhook receipts.

The Dangers of Relying on Client-Side Payment Callbacks

Never fulfill user orders or grant digital entitlements based solely on client-side redirect responses; users can close their browser or intercept redirect payloads.

We demonstrate verifying Stripe''s HMAC-SHA256 signature headers with raw body parsing to ensure only verified, authentic bank transactions fulfill student orders.',
  ARRAY['stripe', 'payments', 'security', 'nodejs', 'backend']::text[],
  'Backend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '48 days' - INTERVAL '19 minutes',
  NOW() - INTERVAL '48 days' - INTERVAL '19 minutes',
  NULL,
  225,
  24,
  2490,
  28,
  72,
  NULL,
  NOW() - INTERVAL '48 days' - INTERVAL '19 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #49: Understanding CSS Layout Engines: Block Formatting Context, Flexbox, and Grid
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'Understanding CSS Layout Engines: Block Formatting Context, Flexbox, and Grid',
  'A comprehensive breakdown of how modern browser rendering engines compute layout trees, margin collapsing, and two-dimensional grids.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_49_agnesh-1","type":"heading-2","styles":{},"content":"The Power of CSS Grid Subgrid and Minmax Functions","metadata":{}},{"id":"block-cmvg_seed_49_agnesh-2","type":"paragraph","styles":{},"content":"CSS Flexbox is optimal for one-dimensional linear distribution, while CSS Grid provides complete control across both rows and columns simultaneously.","metadata":{}},{"id":"block-cmvg_seed_49_agnesh-3","type":"paragraph","styles":{},"content":"Using grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) allows developer dashboards to adapt seamlessly from smartphones to ultra-wide desktop monitors.","metadata":{}}]'::jsonb,
  'Mastering complex responsive layouts without relying on messy hacks, floats, or rigid fixed pixel dimensions.

The Power of CSS Grid Subgrid and Minmax Functions

CSS Flexbox is optimal for one-dimensional linear distribution, while CSS Grid provides complete control across both rows and columns simultaneously.

Using grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) allows developer dashboards to adapt seamlessly from smartphones to ultra-wide desktop monitors.',
  ARRAY['css', 'frontend', 'webdesign', 'html', 'webdev']::text[],
  'Frontend',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '49 days' - INTERVAL '36 minutes',
  NOW() - INTERVAL '49 days' - INTERVAL '36 minutes',
  NULL,
  195,
  18,
  2150,
  21,
  57,
  NULL,
  NOW() - INTERVAL '49 days' - INTERVAL '36 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

-- ----------------------------------------------------------------------------
-- Post #50: My 4-Year Engineering Journey: What I Learned Beyond the Textbook
-- ----------------------------------------------------------------------------
INSERT INTO "Post" (
  "id",
  "authorId",
  "clubId",
  "title",
  "subtitle",
  "coverImage",
  "blocks",
  "content",
  "topics",
  "category",
  "visibility",
  "anonymous",
  "isAnnouncement",
  "location",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "likeCount",
  "commentCount",
  "viewCount",
  "shareCount",
  "saveCount",
  "scheduledAt",
  "publishedAt",
  "scheduleVersion",
  "status"
) VALUES (
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  'My 4-Year Engineering Journey: What I Learned Beyond the Textbook',
  'Reflections on curiosity, late-night campus debugging, finding incredible mentors, and discovering a lifelong passion for computer science.',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
  '[{"id":"block-cmvg_seed_50_agnesh-1","type":"heading-2","styles":{},"content":"Curiosity and Consistency Over Perfect Grades","metadata":{}},{"id":"block-cmvg_seed_50_agnesh-2","type":"paragraph","styles":{},"content":"While academic scores open initial interview doors, the real joy and lasting competence of an engineer are forged in curious weekend projects and spirited discussions.","metadata":{}},{"id":"block-cmvg_seed_50_agnesh-3","type":"paragraph","styles":{},"content":"Surround yourself with peers who challenge you to think deeply, build boldly, and never hesitate to dive into source code to discover how things work under the hood.","metadata":{}}]'::jsonb,
  'A sincere retrospective on what truly matters during college: building projects with friends, embracing failure, and relentlessly learning.

Curiosity and Consistency Over Perfect Grades

While academic scores open initial interview doors, the real joy and lasting competence of an engineer are forged in curious weekend projects and spirited discussions.

Surround yourself with peers who challenge you to think deeply, build boldly, and never hesitate to dive into source code to discover how things work under the hood.',
  ARRAY['psgtech', 'engineering', 'mentorship', 'career', 'growth']::text[],
  'Campus Life',
  'COLLEGE'::"Visibility",
  false,
  false,
  'PSG Tech, Coimbatore',
  NOW() - INTERVAL '50 days' - INTERVAL '53 minutes',
  NOW() - INTERVAL '50 days' - INTERVAL '53 minutes',
  NULL,
  420,
  74,
  5200,
  95,
  160,
  NULL,
  NOW() - INTERVAL '50 days' - INTERVAL '53 minutes',
  0,
  'PUBLISHED'::"PostStatus"
)
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "subtitle" = EXCLUDED."subtitle",
  "coverImage" = EXCLUDED."coverImage",
  "blocks" = EXCLUDED."blocks",
  "content" = EXCLUDED."content",
  "topics" = EXCLUDED."topics",
  "category" = EXCLUDED."category",
  "likeCount" = EXCLUDED."likeCount",
  "commentCount" = EXCLUDED."commentCount",
  "viewCount" = EXCLUDED."viewCount",
  "updatedAt" = EXCLUDED."updatedAt",
  "status" = EXCLUDED."status";

COMMIT;
