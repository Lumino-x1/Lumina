import * as fs from 'fs';
import * as path from 'path';

const authorId = "FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3";

interface PostInfo {
  num: number;
  id: string;
  title: string;
  category: string;
  topics: string[];
  commentCount: number;
  daysAgo: number;
}

const postList: PostInfo[] = [
  { num: 1, id: "cmvg_seed_01_agnesh", title: "Building Resilient Microservices with Go and gRPC: Lessons from Production", category: "Technology", topics: ["golang", "grpc", "microservices"], commentCount: 18, daysAgo: 1 },
  { num: 2, id: "cmvg_seed_02_agnesh", title: "Mastering LeetCode Patterns: From Two-Pointers to Monotonic Queues", category: "Competitive Programming", topics: ["leetcode", "algorithms", "c++"], commentCount: 42, daysAgo: 2 },
  { num: 3, id: "cmvg_seed_03_agnesh", title: "Demystifying Transformers: Writing an Attention Mechanism from Scratch in PyTorch", category: "Artificial Intelligence", topics: ["pytorch", "transformers", "nlp"], commentCount: 29, daysAgo: 3 },
  { num: 4, id: "cmvg_seed_04_agnesh", title: "Why We Migrated from Docker Desktop to OrbStack on Apple Silicon", category: "DevOps", topics: ["docker", "orbstack", "macos"], commentCount: 23, daysAgo: 4 },
  { num: 5, id: "cmvg_seed_05_agnesh", title: "Deep Dive into PostgreSQL Indexing: B-Tree, GiST, GIN and BRIN Explained", category: "Databases", topics: ["postgresql", "indexing", "sql"], commentCount: 31, daysAgo: 5 },
  { num: 6, id: "cmvg_seed_06_agnesh", title: "Building Production-Grade React 19 Applications with Server Components", category: "Web Development", topics: ["react", "typescript", "rsc"], commentCount: 16, daysAgo: 6 },
  { num: 7, id: "cmvg_seed_07_agnesh", title: "Rust for C++ Developers: Surviving the Borrow Checker and Memory Ownership", category: "Systems Programming", topics: ["rust", "cpp", "memory"], commentCount: 37, daysAgo: 7 },
  { num: 8, id: "cmvg_seed_08_agnesh", title: "Reflections on Winning the Smart India Hackathon: Our 36-Hour Journey", category: "Campus Life", topics: ["hackathon", "psgtech", "startup"], commentCount: 51, daysAgo: 8 },
  { num: 9, id: "cmvg_seed_09_agnesh", title: "Demystifying Zero-Knowledge Proofs: An Intuitive Introduction for Engineers", category: "Cryptography", topics: ["zkp", "cryptography", "snarks"], commentCount: 24, daysAgo: 9 },
  { num: 10, id: "cmvg_seed_10_agnesh", title: "Tailwind CSS v4 Under the Hood: The Lightning CSS Engine and Native CSS Variables", category: "Web Development", topics: ["tailwindcss", "css", "vite"], commentCount: 19, daysAgo: 10 },
  { num: 11, id: "cmvg_seed_11_agnesh", title: "Designing Fault-Tolerant Distributed Job Queues with Redis Streams and BullMQ", category: "Backend", topics: ["redis", "bullmq", "queues"], commentCount: 14, daysAgo: 11 },
  { num: 12, id: "cmvg_seed_12_agnesh", title: "A Comprehensive Guide to Vector Embeddings and RAG Architecture", category: "Artificial Intelligence", topics: ["rag", "llm", "embeddings"], commentCount: 38, daysAgo: 12 },
  { num: 13, id: "cmvg_seed_13_agnesh", title: "Navigating Open Source Contributions: From Your First PR to Maintainer Status", category: "Career", topics: ["opensource", "git", "github"], commentCount: 26, daysAgo: 13 },
  { num: 14, id: "cmvg_seed_14_agnesh", title: "The Architecture of Modern WebAssembly: Running C++ and Rust in the Browser", category: "Technology", topics: ["wasm", "rust", "cpp"], commentCount: 17, daysAgo: 14 },
  { num: 15, id: "cmvg_seed_15_agnesh", title: "Essential System Design Concepts Every CS Student Should Know", category: "System Design", topics: ["system-design", "scalability", "caching"], commentCount: 44, daysAgo: 15 },
  { num: 16, id: "cmvg_seed_16_agnesh", title: "Why We Swapped Webpack for Vite in Our 100K-Line Monorepo", category: "Frontend", topics: ["vite", "webpack", "monorepo"], commentCount: 15, daysAgo: 16 },
  { num: 17, id: "cmvg_seed_17_agnesh", title: "Understanding Linux Namespaces and Cgroups: Building a Container from Scratch", category: "DevOps", topics: ["linux", "containers", "golang"], commentCount: 28, daysAgo: 17 },
  { num: 18, id: "cmvg_seed_18_agnesh", title: "How to Build Real-Time Web Apps with WebSockets and Socket.io", category: "Web Development", topics: ["websockets", "socketio", "realtime"], commentCount: 21, daysAgo: 18 },
  { num: 19, id: "cmvg_seed_19_agnesh", title: "Mastering Git Internals: Blobs, Trees, Commits and References Explained", category: "Software Engineering", topics: ["git", "version-control", "internals"], commentCount: 32, daysAgo: 19 },
  { num: 20, id: "cmvg_seed_20_agnesh", title: "Graph Neural Networks: Predicting Molecular Properties and Campus Social Networks", category: "Artificial Intelligence", topics: ["gnn", "pytorch", "graph-ai"], commentCount: 25, daysAgo: 20 },
  { num: 21, id: "cmvg_seed_21_agnesh", title: "Clean Code Practices: Why Readability Trumps Clever One-Liners", category: "Engineering Best Practices", topics: ["cleancode", "refactoring", "best-practices"], commentCount: 46, daysAgo: 21 },
  { num: 22, id: "cmvg_seed_22_agnesh", title: "Building Dark Mode Without CSS Flashes: Secrets of Theme Toggle Engineering", category: "Frontend", topics: ["css", "darkmode", "theme"], commentCount: 18, daysAgo: 22 },
  { num: 23, id: "cmvg_seed_23_agnesh", title: "Demystifying GraphQL: Schema Definition, Resolvers, and DataLoader N+1 Prevention", category: "Backend", topics: ["graphql", "api", "dataloader"], commentCount: 20, daysAgo: 23 },
  { num: 24, id: "cmvg_seed_24_agnesh", title: "The Ultimate Guide to Tech Internships: Resume Prep, Cold Outreach, and Interviews", category: "Career", topics: ["internships", "resume", "interviews"], commentCount: 58, daysAgo: 24 },
  { num: 25, id: "cmvg_seed_25_agnesh", title: "Understanding OAuth 2.0 and OpenID Connect: Tokens, Scopes, and PKCE", category: "Security", topics: ["oauth", "security", "jwt"], commentCount: 27, daysAgo: 25 },
  { num: 26, id: "cmvg_seed_26_agnesh", title: "Deploying Kubernetes on Bare Metal: Our Campus Lab Cluster Journey", category: "DevOps", topics: ["kubernetes", "k3s", "baremetal"], commentCount: 22, daysAgo: 26 },
  { num: 27, id: "cmvg_seed_27_agnesh", title: "Exploring 3D Web Graphics: Shader Programming with Three.js and GLSL", category: "Creative Technology", topics: ["threejs", "glsl", "webgl"], commentCount: 30, daysAgo: 27 },
  { num: 28, id: "cmvg_seed_28_agnesh", title: "Mastering TypeScript Generics: Conditional Types, Infer, and Template Literals", category: "Programming Languages", topics: ["typescript", "generics", "types"], commentCount: 34, daysAgo: 28 },
  { num: 29, id: "cmvg_seed_29_agnesh", title: "The PSG Tech Library: A Haven for Coders, Dreamers, and Research Pioneers", category: "Campus Life", topics: ["psgtech", "library", "campus"], commentCount: 62, daysAgo: 29 },
  { num: 30, id: "cmvg_seed_30_agnesh", title: "Introduction to Reinforcement Learning: Q-Learning and Policy Gradients", category: "Artificial Intelligence", topics: ["rl", "reinforcement-learning", "pytorch"], commentCount: 26, daysAgo: 30 },
  { num: 31, id: "cmvg_seed_31_agnesh", title: "How to Build a High-Performance Redis-Backed Rate Limiter in Express", category: "Backend", topics: ["redis", "rate-limiting", "express"], commentCount: 18, daysAgo: 31 },
  { num: 32, id: "cmvg_seed_32_agnesh", title: "State Management in 2026: Why Zustand and Jotai Are Replacing Redux", category: "Frontend", topics: ["zustand", "jotai", "react"], commentCount: 25, daysAgo: 32 },
  { num: 33, id: "cmvg_seed_33_agnesh", title: "Reverse Engineering Android Apps: Static Analysis with Jadx and Frida", category: "Cybersecurity", topics: ["android", "reverse-engineering", "frida"], commentCount: 36, daysAgo: 33 },
  { num: 34, id: "cmvg_seed_34_agnesh", title: "Engineering Scalable Real-Time Collaborative Canvas with CRDTs", category: "Software Engineering", topics: ["crdt", "realtime", "yjs"], commentCount: 29, daysAgo: 34 },
  { num: 35, id: "cmvg_seed_35_agnesh", title: "From 0 to 1: Launching Our Campus Event Management Platform", category: "Campus Life", topics: ["psgtech", "symposium", "events"], commentCount: 54, daysAgo: 35 },
  { num: 36, id: "cmvg_seed_36_agnesh", title: "Understanding Memory Leaks in Node.js: Heap Profiling with Chrome DevTools", category: "Backend", topics: ["nodejs", "memory", "profiling"], commentCount: 21, daysAgo: 36 },
  { num: 37, id: "cmvg_seed_37_agnesh", title: "Why Bun Is Changing the JavaScript Ecosystem Forever", category: "Technology", topics: ["bun", "javascript", "zig"], commentCount: 41, daysAgo: 37 },
  { num: 38, id: "cmvg_seed_38_agnesh", title: "An Engineer's Field Guide to Clean Architecture and Domain-Driven Design", category: "Architecture", topics: ["clean-architecture", "ddd", "backend"], commentCount: 31, daysAgo: 38 },
  { num: 39, id: "cmvg_seed_39_agnesh", title: "Mastering Git Rebase: Interactive Squashing, Fixing Commits, and Branch Hygiene", category: "DevOps", topics: ["git", "rebase", "productivity"], commentCount: 24, daysAgo: 39 },
  { num: 40, id: "cmvg_seed_40_agnesh", title: "Building Real-Time Notifications with Server-Sent Events (SSE) and HTTP/2", category: "Backend", topics: ["sse", "http2", "realtime"], commentCount: 19, daysAgo: 40 },
  { num: 41, id: "cmvg_seed_41_agnesh", title: "Exploring Quantum Computing: Simulating Qubits and Superposition in Python", category: "Physics & Computing", topics: ["quantum", "qiskit", "python"], commentCount: 33, daysAgo: 41 },
  { num: 42, id: "cmvg_seed_42_agnesh", title: "How to Build a Custom Component Library with Radix UI and Tailwind CSS", category: "Frontend", topics: ["radix-ui", "tailwindcss", "components"], commentCount: 20, daysAgo: 42 },
  { num: 43, id: "cmvg_seed_43_agnesh", title: "A Deep Dive into Linux File Systems: Ext4, Inodes, and Disk Fragmentation", category: "Operating Systems", topics: ["linux", "filesystems", "ext4"], commentCount: 17, daysAgo: 43 },
  { num: 44, id: "cmvg_seed_44_agnesh", title: "The Art of Writing Technical Documentation: Why Great Code Needs Great Docs", category: "Software Engineering", topics: ["docs", "writing", "communication"], commentCount: 26, daysAgo: 44 },
  { num: 45, id: "cmvg_seed_45_agnesh", title: "How to Build a Fast, Scalable Search Service with Meilisearch and Prisma", category: "Search & Retrieval", topics: ["search", "meilisearch", "prisma"], commentCount: 22, daysAgo: 45 },
  { num: 46, id: "cmvg_seed_46_agnesh", title: "An Introduction to Web Performance Metrics: Core Web Vitals Explained", category: "Web Development", topics: ["performance", "web-vitals", "lcp"], commentCount: 16, daysAgo: 46 },
  { num: 47, id: "cmvg_seed_47_agnesh", title: "Building an Autonomous Drone Navigation System with ROS2 and OpenCV", category: "Robotics", topics: ["ros2", "opencv", "robotics"], commentCount: 45, daysAgo: 47 },
  { num: 48, id: "cmvg_seed_48_agnesh", title: "Building an E-Commerce Payment Gateway with Stripe and Webhook Signatures", category: "Backend", topics: ["stripe", "payments", "webhooks"], commentCount: 24, daysAgo: 48 },
  { num: 49, id: "cmvg_seed_49_agnesh", title: "Understanding CSS Layout Engines: Block Formatting Context, Flexbox, and Grid", category: "Frontend", topics: ["css", "grid", "flexbox"], commentCount: 18, daysAgo: 49 },
  { num: 50, id: "cmvg_seed_50_agnesh", title: "My 4-Year Engineering Journey: What I Learned Beyond the Textbook", category: "Campus Life", topics: ["psgtech", "career", "growth"], commentCount: 74, daysAgo: 50 },
];

function escapeSql(val: string): string {
  return val.replace(/'/g, "''");
}

function getCommentTemplates(post: PostInfo): string[] {
  const t = post.topics[0] || 'tech';
  const c = post.category.toLowerCase();

  return [
    `Pinning the starter repository and benchmark code here for anyone following along with the ${post.title.split(':')[0]} setup!`,
    `A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.`,
    `We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.`,
    `If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.`,
    `Update: thanks everyone for the insightful feedback on ${t}! I am working on part 2 covering distributed failure scenarios.`,
    `One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.`,
    `For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.`,
    `Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.`,
    `The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.`,
    `Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!`,
    `Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.`,
    `Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.`,
    `I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.`,
    `Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.`,
    `An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.`,
    `Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.`,
    `Thanks for the great response to this article! Always excited to discuss ${post.topics.join(', ')} architectures.`,
    `Check out the official documentation as well for additional low-level runtime flags and optimizations.`,
    `We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.`,
    `Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.`,
    `Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.`,
    `If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.`,
    `Glad to see so many campus developers interested in modern ${c} architectures! More deep dives coming soon.`,
    `Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.`,
    `For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.`,
    `We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.`,
    `Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!`,
    `A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.`,
    `Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.`,
    `Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.`
  ];
}

let sql = `-- ============================================================================
-- Lumina Platform: Seed Contextual Comments for 50 Campus Posts
-- Author ID: ${authorId} (agnesh K K - 24z206@psgtech.ac.in)
-- Total Comments: Exactly matches each post's commentCount (Sum: 1,486 comments)
-- All comments are relevant to each post's domain and authored by the same user
-- ============================================================================

BEGIN;

`;

let totalCommentsCount = 0;

for (const post of postList) {
  const targetCount = post.commentCount;
  const templates = getCommentTemplates(post);

  sql += `
-- ----------------------------------------------------------------------------
-- Comments for Post #${post.num}: ${post.title} (${targetCount} comments)
-- ----------------------------------------------------------------------------
`;

  const topLevelCount = Math.max(1, Math.ceil(targetCount * 0.75));
  const replyCount = targetCount - topLevelCount;

  const topLevelIds: string[] = [];

  // Generate top-level comments
  for (let i = 0; i < topLevelCount; i++) {
    totalCommentsCount++;
    const commId = `comm_${post.id}_t${String(i + 1).padStart(2, '0')}`;
    topLevelIds.push(commId);

    const templateIndex = i % templates.length;
    const variantNum = Math.floor(i / templates.length) + 1;
    let content = templates[templateIndex];
    if (variantNum > 1) {
      content = `${content} (Note #${variantNum} on ${post.topics[i % post.topics.length]})`;
    }

    const isPinned = i === 0; // Pin the first author note
    const minutesOffset = (i * 37) % 720;
    const hoursOffset = (i * 3) % 48;

    sql += `INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  '${commId}',
  '${escapeSql(content)}',
  '${post.id}',
  '${authorId}',
  NULL,
  0,
  false,
  ${isPinned},
  1,
  NOW() - INTERVAL '${post.daysAgo} days' + INTERVAL '${hoursOffset} hours' + INTERVAL '${minutesOffset} minutes',
  NOW() - INTERVAL '${post.daysAgo} days' + INTERVAL '${hoursOffset} hours' + INTERVAL '${minutesOffset} minutes'
) ON CONFLICT ("id") DO NOTHING;
`;
  }

  // Generate reply comments attached to top-level comments
  for (let j = 0; j < replyCount; j++) {
    totalCommentsCount++;
    const parentId = topLevelIds[j % topLevelIds.length];
    const replyId = `comm_${post.id}_r${String(j + 1).padStart(2, '0')}`;

    const replyTemplates = [
      `Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!`,
      `Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.`,
      `Here is the relevant documentation snippet that explains the internal buffering mechanism.`,
      `Spot on! Handling timeouts at the gateway level provides an additional safeguard.`,
      `Quick update on this: the benchmark results have been verified across 10,000 simulated requests.`,
      `Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.`,
      `Thanks for pointing that out! Added an inline note to clarify the configuration parameter.`
    ];

    const content = replyTemplates[j % replyTemplates.length];
    const hoursOffset = ((j + 1) * 4) % 40;

    sql += `INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  '${replyId}',
  '${escapeSql(content)}',
  '${post.id}',
  '${authorId}',
  '${parentId}',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '${post.daysAgo} days' + INTERVAL '${hoursOffset} hours' + INTERVAL '${(j * 19) % 55} minutes',
  NOW() - INTERVAL '${post.daysAgo} days' + INTERVAL '${hoursOffset} hours' + INTERVAL '${(j * 19) % 55} minutes'
) ON CONFLICT ("id") DO NOTHING;
`;
  }
}

sql += `
COMMIT;
`;

const outputPath = path.join(__dirname, 'seed-comments-agnesh.sql');
fs.writeFileSync(outputPath, sql, 'utf-8');
console.log(`Generated SQL for ${totalCommentsCount} comments across 50 posts at: ${outputPath}`);
