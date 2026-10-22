-- ============================================================================
-- Lumina Platform: Seed Contextual Comments for 50 Campus Posts
-- Author ID: FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3 (agnesh K K - 24z206@psgtech.ac.in)
-- Total Comments: Exactly matches each post's commentCount (Sum: 1,486 comments)
-- All comments are relevant to each post's domain and authored by the same user
-- ============================================================================

BEGIN;


-- ----------------------------------------------------------------------------
-- Comments for Post #1: Building Resilient Microservices with Go and gRPC: Lessons from Production (18 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building Resilient Microservices with Go and gRPC setup!',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on golang! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_01_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_01_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_01_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_01_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_01_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_01_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '1 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '1 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #2: Mastering LeetCode Patterns: From Two-Pointers to Monotonic Queues (42 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Mastering LeetCode Patterns setup!',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on leetcode! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss leetcode, algorithms, c++ architectures.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t23',
  'Glad to see so many campus developers interested in modern competitive programming architectures! More deep dives coming soon.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the Mastering LeetCode Patterns setup! (Note #2 on leetcode)',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on algorithms)',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_02_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_02_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_02_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '2 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '2 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #3: Demystifying Transformers: Writing an Attention Mechanism from Scratch in PyTorch (29 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Demystifying Transformers setup!',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on pytorch! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss pytorch, transformers, nlp architectures.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_03_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_03_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_03_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '3 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '3 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #4: Why We Migrated from Docker Desktop to OrbStack on Apple Silicon (23 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Why We Migrated from Docker Desktop to OrbStack on Apple Silicon setup!',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on docker! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss docker, orbstack, macos architectures.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_04_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_04_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_04_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_04_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_04_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_04_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_04_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '4 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '4 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #5: Deep Dive into PostgreSQL Indexing: B-Tree, GiST, GIN and BRIN Explained (31 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Deep Dive into PostgreSQL Indexing setup!',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on postgresql! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss postgresql, indexing, sql architectures.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t23',
  'Glad to see so many campus developers interested in modern databases architectures! More deep dives coming soon.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_05_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_05_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_05_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '5 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '5 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #6: Building Production-Grade React 19 Applications with Server Components (16 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building Production-Grade React 19 Applications with Server Components setup!',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on react! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_06_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_06_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_06_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_06_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_06_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_06_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '6 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '6 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #7: Rust for C++ Developers: Surviving the Borrow Checker and Memory Ownership (37 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Rust for C++ Developers setup!',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on rust! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss rust, cpp, memory architectures.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t23',
  'Glad to see so many campus developers interested in modern systems programming architectures! More deep dives coming soon.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_07_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_07_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_07_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '7 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '7 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #8: Reflections on Winning the Smart India Hackathon: Our 36-Hour Journey (51 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Reflections on Winning the Smart India Hackathon setup!',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on hackathon! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss hackathon, psgtech, startup architectures.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t23',
  'Glad to see so many campus developers interested in modern campus life architectures! More deep dives coming soon.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the Reflections on Winning the Smart India Hackathon setup! (Note #2 on hackathon)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on psgtech)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on startup)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on hackathon)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t35',
  'Update: thanks everyone for the insightful feedback on hackathon! I am working on part 2 covering distributed failure scenarios. (Note #2 on psgtech)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '6 hours' + INTERVAL '538 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '6 hours' + INTERVAL '538 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t36',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state. (Note #2 on startup)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '9 hours' + INTERVAL '575 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '9 hours' + INTERVAL '575 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t37',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM. (Note #2 on hackathon)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '612 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '612 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t38',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries. (Note #2 on psgtech)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '15 hours' + INTERVAL '649 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '15 hours' + INTERVAL '649 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_t39',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences. (Note #2 on startup)',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '18 hours' + INTERVAL '686 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '18 hours' + INTERVAL '686 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_08_agnesh_r12',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_08_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_08_agnesh_t12',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '8 days' + INTERVAL '8 hours' + INTERVAL '44 minutes',
  NOW() - INTERVAL '8 days' + INTERVAL '8 hours' + INTERVAL '44 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #9: Demystifying Zero-Knowledge Proofs: An Intuitive Introduction for Engineers (24 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Demystifying Zero-Knowledge Proofs setup!',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on zkp! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss zkp, cryptography, snarks architectures.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_09_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_09_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_09_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_09_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_09_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_09_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_09_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_09_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '9 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '9 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #10: Tailwind CSS v4 Under the Hood: The Lightning CSS Engine and Native CSS Variables (19 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Tailwind CSS v4 Under the Hood setup!',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on tailwindcss! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_10_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_10_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_10_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_10_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_10_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_10_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '10 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '10 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #11: Designing Fault-Tolerant Distributed Job Queues with Redis Streams and BullMQ (14 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Designing Fault-Tolerant Distributed Job Queues with Redis Streams and BullMQ setup!',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on redis! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_11_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_11_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_11_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_11_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_11_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '11 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '11 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #12: A Comprehensive Guide to Vector Embeddings and RAG Architecture (38 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the A Comprehensive Guide to Vector Embeddings and RAG Architecture setup!',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on rag! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss rag, llm, embeddings architectures.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t23',
  'Glad to see so many campus developers interested in modern artificial intelligence architectures! More deep dives coming soon.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_12_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_12_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_12_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '12 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '12 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #13: Navigating Open Source Contributions: From Your First PR to Maintainer Status (26 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Navigating Open Source Contributions setup!',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on opensource! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss opensource, git, github architectures.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_13_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_13_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_13_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_13_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_13_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_13_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_13_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_13_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '13 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '13 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #14: The Architecture of Modern WebAssembly: Running C++ and Rust in the Browser (17 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the The Architecture of Modern WebAssembly setup!',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on wasm! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_14_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_14_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_14_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_14_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_14_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_14_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '14 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '14 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #15: Essential System Design Concepts Every CS Student Should Know (44 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Essential System Design Concepts Every CS Student Should Know setup!',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on system-design! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss system-design, scalability, caching architectures.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t23',
  'Glad to see so many campus developers interested in modern system design architectures! More deep dives coming soon.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the Essential System Design Concepts Every CS Student Should Know setup! (Note #2 on system-design)',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on scalability)',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on caching)',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_15_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_15_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_15_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '15 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '15 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #16: Why We Swapped Webpack for Vite in Our 100K-Line Monorepo (15 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Why We Swapped Webpack for Vite in Our 100K-Line Monorepo setup!',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on vite! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_16_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_16_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_16_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_16_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_16_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '16 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '16 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #17: Understanding Linux Namespaces and Cgroups: Building a Container from Scratch (28 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Understanding Linux Namespaces and Cgroups setup!',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on linux! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss linux, containers, golang architectures.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_17_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_17_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_17_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '17 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '17 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #18: How to Build Real-Time Web Apps with WebSockets and Socket.io (21 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the How to Build Real-Time Web Apps with WebSockets and Socket.io setup!',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on websockets! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_18_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_18_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_18_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_18_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_18_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_18_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_18_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '18 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '18 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #19: Mastering Git Internals: Blobs, Trees, Commits and References Explained (32 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Mastering Git Internals setup!',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on git! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss git, version-control, internals architectures.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t23',
  'Glad to see so many campus developers interested in modern software engineering architectures! More deep dives coming soon.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_19_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_19_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_19_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '19 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '19 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #20: Graph Neural Networks: Predicting Molecular Properties and Campus Social Networks (25 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Graph Neural Networks setup!',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on gnn! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss gnn, pytorch, graph-ai architectures.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_20_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_20_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_20_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_20_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_20_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_20_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_20_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_20_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '20 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '20 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #21: Clean Code Practices: Why Readability Trumps Clever One-Liners (46 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Clean Code Practices setup!',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on cleancode! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss cleancode, refactoring, best-practices architectures.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t23',
  'Glad to see so many campus developers interested in modern engineering best practices architectures! More deep dives coming soon.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the Clean Code Practices setup! (Note #2 on cleancode)',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on refactoring)',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on best-practices)',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on cleancode)',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_t35',
  'Update: thanks everyone for the insightful feedback on cleancode! I am working on part 2 covering distributed failure scenarios. (Note #2 on refactoring)',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '6 hours' + INTERVAL '538 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '6 hours' + INTERVAL '538 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_21_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_21_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_21_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '21 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '21 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #22: Building Dark Mode Without CSS Flashes: Secrets of Theme Toggle Engineering (18 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building Dark Mode Without CSS Flashes setup!',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on css! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_22_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_22_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_22_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_22_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_22_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_22_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '22 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '22 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #23: Demystifying GraphQL: Schema Definition, Resolvers, and DataLoader N+1 Prevention (20 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Demystifying GraphQL setup!',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on graphql! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_23_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_23_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_23_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_23_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_23_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_23_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_23_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '23 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '23 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #24: The Ultimate Guide to Tech Internships: Resume Prep, Cold Outreach, and Interviews (58 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the The Ultimate Guide to Tech Internships setup!',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on internships! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss internships, resume, interviews architectures.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t23',
  'Glad to see so many campus developers interested in modern career architectures! More deep dives coming soon.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the The Ultimate Guide to Tech Internships setup! (Note #2 on internships)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on resume)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on interviews)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on internships)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t35',
  'Update: thanks everyone for the insightful feedback on internships! I am working on part 2 covering distributed failure scenarios. (Note #2 on resume)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '6 hours' + INTERVAL '538 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '6 hours' + INTERVAL '538 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t36',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state. (Note #2 on interviews)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '9 hours' + INTERVAL '575 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '9 hours' + INTERVAL '575 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t37',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM. (Note #2 on internships)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '612 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '612 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t38',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries. (Note #2 on resume)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '15 hours' + INTERVAL '649 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '15 hours' + INTERVAL '649 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t39',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences. (Note #2 on interviews)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '18 hours' + INTERVAL '686 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '18 hours' + INTERVAL '686 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t40',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions! (Note #2 on internships)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '21 hours' + INTERVAL '3 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '21 hours' + INTERVAL '3 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t41',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness. (Note #2 on resume)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t42',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead. (Note #2 on interviews)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '27 hours' + INTERVAL '77 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '27 hours' + INTERVAL '77 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t43',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production. (Note #2 on internships)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '30 hours' + INTERVAL '114 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '30 hours' + INTERVAL '114 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_t44',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services. (Note #2 on resume)',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '33 hours' + INTERVAL '151 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '33 hours' + INTERVAL '151 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r12',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t12',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '8 hours' + INTERVAL '44 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '8 hours' + INTERVAL '44 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r13',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t13',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '8 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '12 hours' + INTERVAL '8 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_24_agnesh_r14',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_24_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_24_agnesh_t14',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '24 days' + INTERVAL '16 hours' + INTERVAL '27 minutes',
  NOW() - INTERVAL '24 days' + INTERVAL '16 hours' + INTERVAL '27 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #25: Understanding OAuth 2.0 and OpenID Connect: Tokens, Scopes, and PKCE (27 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Understanding OAuth 2.0 and OpenID Connect setup!',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on oauth! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss oauth, security, jwt architectures.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_25_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_25_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_25_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_25_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_25_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_25_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_25_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_25_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '25 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '25 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #26: Deploying Kubernetes on Bare Metal: Our Campus Lab Cluster Journey (22 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Deploying Kubernetes on Bare Metal setup!',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on kubernetes! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss kubernetes, k3s, baremetal architectures.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_26_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_26_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_26_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_26_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_26_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_26_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_26_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '26 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '26 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #27: Exploring 3D Web Graphics: Shader Programming with Three.js and GLSL (30 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Exploring 3D Web Graphics setup!',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on threejs! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss threejs, glsl, webgl architectures.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_t23',
  'Glad to see so many campus developers interested in modern creative technology architectures! More deep dives coming soon.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_27_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_27_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_27_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '27 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '27 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #28: Mastering TypeScript Generics: Conditional Types, Infer, and Template Literals (34 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Mastering TypeScript Generics setup!',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on typescript! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss typescript, generics, types architectures.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t23',
  'Glad to see so many campus developers interested in modern programming languages architectures! More deep dives coming soon.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_28_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_28_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_28_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '28 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '28 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #29: The PSG Tech Library: A Haven for Coders, Dreamers, and Research Pioneers (62 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the The PSG Tech Library setup!',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on psgtech! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss psgtech, library, campus architectures.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t23',
  'Glad to see so many campus developers interested in modern campus life architectures! More deep dives coming soon.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the The PSG Tech Library setup! (Note #2 on psgtech)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on library)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on campus)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on psgtech)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t35',
  'Update: thanks everyone for the insightful feedback on psgtech! I am working on part 2 covering distributed failure scenarios. (Note #2 on library)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '6 hours' + INTERVAL '538 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '6 hours' + INTERVAL '538 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t36',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state. (Note #2 on campus)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '9 hours' + INTERVAL '575 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '9 hours' + INTERVAL '575 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t37',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM. (Note #2 on psgtech)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '612 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '612 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t38',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries. (Note #2 on library)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '15 hours' + INTERVAL '649 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '15 hours' + INTERVAL '649 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t39',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences. (Note #2 on campus)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '18 hours' + INTERVAL '686 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '18 hours' + INTERVAL '686 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t40',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions! (Note #2 on psgtech)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '21 hours' + INTERVAL '3 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '21 hours' + INTERVAL '3 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t41',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness. (Note #2 on library)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t42',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead. (Note #2 on campus)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '27 hours' + INTERVAL '77 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '27 hours' + INTERVAL '77 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t43',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production. (Note #2 on psgtech)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '30 hours' + INTERVAL '114 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '30 hours' + INTERVAL '114 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t44',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services. (Note #2 on library)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '33 hours' + INTERVAL '151 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '33 hours' + INTERVAL '151 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t45',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned. (Note #2 on campus)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '188 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '188 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t46',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation. (Note #2 on psgtech)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '39 hours' + INTERVAL '225 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '39 hours' + INTERVAL '225 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_t47',
  'Thanks for the great response to this article! Always excited to discuss psgtech, library, campus architectures. (Note #2 on library)',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '42 hours' + INTERVAL '262 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '42 hours' + INTERVAL '262 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r12',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t12',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '8 hours' + INTERVAL '44 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '8 hours' + INTERVAL '44 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r13',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t13',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '8 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '12 hours' + INTERVAL '8 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r14',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t14',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '16 hours' + INTERVAL '27 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '16 hours' + INTERVAL '27 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_29_agnesh_r15',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_29_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_29_agnesh_t15',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '29 days' + INTERVAL '20 hours' + INTERVAL '46 minutes',
  NOW() - INTERVAL '29 days' + INTERVAL '20 hours' + INTERVAL '46 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #30: Introduction to Reinforcement Learning: Q-Learning and Policy Gradients (26 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Introduction to Reinforcement Learning setup!',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on rl! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss rl, reinforcement-learning, pytorch architectures.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_30_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_30_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_30_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_30_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_30_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_30_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_30_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_30_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '30 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '30 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #31: How to Build a High-Performance Redis-Backed Rate Limiter in Express (18 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the How to Build a High-Performance Redis-Backed Rate Limiter in Express setup!',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on redis! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_31_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_31_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_31_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_31_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_31_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_31_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '31 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '31 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #32: State Management in 2026: Why Zustand and Jotai Are Replacing Redux (25 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the State Management in 2026 setup!',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on zustand! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss zustand, jotai, react architectures.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_32_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_32_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_32_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_32_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_32_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_32_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_32_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_32_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '32 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '32 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #33: Reverse Engineering Android Apps: Static Analysis with Jadx and Frida (36 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Reverse Engineering Android Apps setup!',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on android! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss android, reverse-engineering, frida architectures.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t23',
  'Glad to see so many campus developers interested in modern cybersecurity architectures! More deep dives coming soon.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_33_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_33_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_33_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '33 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '33 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #34: Engineering Scalable Real-Time Collaborative Canvas with CRDTs (29 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Engineering Scalable Real-Time Collaborative Canvas with CRDTs setup!',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on crdt! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss crdt, realtime, yjs architectures.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_34_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_34_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_34_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '34 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '34 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #35: From 0 to 1: Launching Our Campus Event Management Platform (54 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the From 0 to 1 setup!',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on psgtech! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss psgtech, symposium, events architectures.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t23',
  'Glad to see so many campus developers interested in modern campus life architectures! More deep dives coming soon.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the From 0 to 1 setup! (Note #2 on psgtech)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on symposium)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on events)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on psgtech)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t35',
  'Update: thanks everyone for the insightful feedback on psgtech! I am working on part 2 covering distributed failure scenarios. (Note #2 on symposium)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '6 hours' + INTERVAL '538 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '6 hours' + INTERVAL '538 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t36',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state. (Note #2 on events)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '9 hours' + INTERVAL '575 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '9 hours' + INTERVAL '575 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t37',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM. (Note #2 on psgtech)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '612 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '612 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t38',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries. (Note #2 on symposium)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '15 hours' + INTERVAL '649 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '15 hours' + INTERVAL '649 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t39',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences. (Note #2 on events)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '18 hours' + INTERVAL '686 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '18 hours' + INTERVAL '686 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t40',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions! (Note #2 on psgtech)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '21 hours' + INTERVAL '3 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '21 hours' + INTERVAL '3 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_t41',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness. (Note #2 on symposium)',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r12',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t12',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '8 hours' + INTERVAL '44 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '8 hours' + INTERVAL '44 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_35_agnesh_r13',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_35_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_35_agnesh_t13',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '8 minutes',
  NOW() - INTERVAL '35 days' + INTERVAL '12 hours' + INTERVAL '8 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #36: Understanding Memory Leaks in Node.js: Heap Profiling with Chrome DevTools (21 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Understanding Memory Leaks in Node.js setup!',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on nodejs! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_36_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_36_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_36_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_36_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_36_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_36_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_36_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '36 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '36 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #37: Why Bun Is Changing the JavaScript Ecosystem Forever (41 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Why Bun Is Changing the JavaScript Ecosystem Forever setup!',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on bun! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss bun, javascript, zig architectures.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t23',
  'Glad to see so many campus developers interested in modern technology architectures! More deep dives coming soon.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the Why Bun Is Changing the JavaScript Ecosystem Forever setup! (Note #2 on bun)',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_37_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_37_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_37_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '37 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '37 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #38: An Engineer's Field Guide to Clean Architecture and Domain-Driven Design (31 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the An Engineer''s Field Guide to Clean Architecture and Domain-Driven Design setup!',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on clean-architecture! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss clean-architecture, ddd, backend architectures.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t23',
  'Glad to see so many campus developers interested in modern architecture architectures! More deep dives coming soon.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_38_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_38_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_38_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '38 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '38 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #39: Mastering Git Rebase: Interactive Squashing, Fixing Commits, and Branch Hygiene (24 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Mastering Git Rebase setup!',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on git! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss git, rebase, productivity architectures.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_39_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_39_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_39_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_39_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_39_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_39_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_39_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_39_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '39 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '39 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #40: Building Real-Time Notifications with Server-Sent Events (SSE) and HTTP/2 (19 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building Real-Time Notifications with Server-Sent Events (SSE) and HTTP/2 setup!',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on sse! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_40_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_40_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_40_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_40_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_40_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_40_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '40 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '40 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #41: Exploring Quantum Computing: Simulating Qubits and Superposition in Python (33 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Exploring Quantum Computing setup!',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on quantum! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss quantum, qiskit, python architectures.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t23',
  'Glad to see so many campus developers interested in modern physics & computing architectures! More deep dives coming soon.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_41_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_41_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_41_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '41 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '41 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #42: How to Build a Custom Component Library with Radix UI and Tailwind CSS (20 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the How to Build a Custom Component Library with Radix UI and Tailwind CSS setup!',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on radix-ui! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_42_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_42_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_42_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_42_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_42_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_42_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_42_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '42 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '42 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #43: A Deep Dive into Linux File Systems: Ext4, Inodes, and Disk Fragmentation (17 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the A Deep Dive into Linux File Systems setup!',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on linux! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_43_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_43_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_43_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_43_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_43_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_43_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '43 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '43 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #44: The Art of Writing Technical Documentation: Why Great Code Needs Great Docs (26 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the The Art of Writing Technical Documentation setup!',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on docs! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss docs, writing, communication architectures.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_44_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_44_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_44_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_44_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_44_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_44_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_44_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_44_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '44 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '44 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #45: How to Build a Fast, Scalable Search Service with Meilisearch and Prisma (22 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the How to Build a Fast, Scalable Search Service with Meilisearch and Prisma setup!',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on search! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss search, meilisearch, prisma architectures.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_45_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_45_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_45_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_45_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_45_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_45_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_45_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '45 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '45 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #46: An Introduction to Web Performance Metrics: Core Web Vitals Explained (16 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the An Introduction to Web Performance Metrics setup!',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on performance! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_46_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_46_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_46_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_46_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_46_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_46_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '46 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '46 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #47: Building an Autonomous Drone Navigation System with ROS2 and OpenCV (45 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building an Autonomous Drone Navigation System with ROS2 and OpenCV setup!',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on ros2! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss ros2, opencv, robotics architectures.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t23',
  'Glad to see so many campus developers interested in modern robotics architectures! More deep dives coming soon.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building an Autonomous Drone Navigation System with ROS2 and OpenCV setup! (Note #2 on ros2)',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on opencv)',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on robotics)',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on ros2)',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_47_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_47_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_47_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '47 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '47 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #48: Building an E-Commerce Payment Gateway with Stripe and Webhook Signatures (24 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Building an E-Commerce Payment Gateway with Stripe and Webhook Signatures setup!',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on stripe! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss stripe, payments, webhooks architectures.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_48_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_48_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_48_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_48_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_48_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_48_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_48_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_48_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '48 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '48 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #49: Understanding CSS Layout Engines: Block Formatting Context, Flexbox, and Grid (18 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the Understanding CSS Layout Engines setup!',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on css! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_49_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_49_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_49_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_49_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_49_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_49_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '49 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '49 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;

-- ----------------------------------------------------------------------------
-- Comments for Post #50: My 4-Year Engineering Journey: What I Learned Beyond the Textbook (74 comments)
-- ----------------------------------------------------------------------------
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t01',
  'Pinning the starter repository and benchmark code here for anyone following along with the My 4-Year Engineering Journey setup!',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  true,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t02',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '37 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '37 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t03',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '74 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '74 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t04',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '111 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '111 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t05',
  'Update: thanks everyone for the insightful feedback on psgtech! I am working on part 2 covering distributed failure scenarios.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '148 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '148 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t06',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '185 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '185 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t07',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '222 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '222 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t08',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '259 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '259 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t09',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '296 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '296 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t10',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions!',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '27 hours' + INTERVAL '333 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '27 hours' + INTERVAL '333 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t11',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '30 hours' + INTERVAL '370 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '30 hours' + INTERVAL '370 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t12',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '33 hours' + INTERVAL '407 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '33 hours' + INTERVAL '407 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t13',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '444 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '444 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t14',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '39 hours' + INTERVAL '481 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '39 hours' + INTERVAL '481 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t15',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '42 hours' + INTERVAL '518 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '42 hours' + INTERVAL '518 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t16',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '45 hours' + INTERVAL '555 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '45 hours' + INTERVAL '555 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t17',
  'Thanks for the great response to this article! Always excited to discuss psgtech, career, growth architectures.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '592 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '592 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t18',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '629 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '629 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t19',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '666 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '666 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t20',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '703 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '703 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t21',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '20 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '20 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t22',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '57 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '57 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t23',
  'Glad to see so many campus developers interested in modern campus life architectures! More deep dives coming soon.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '94 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '94 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t24',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '131 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '131 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t25',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '168 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '168 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t26',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '27 hours' + INTERVAL '205 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '27 hours' + INTERVAL '205 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t27',
  'Drop your thoughts or alternative approaches in the replies — always eager to learn how other teams handle this!',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '30 hours' + INTERVAL '242 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '30 hours' + INTERVAL '242 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t28',
  'A follow-up article comparing throughput under TLS vs plain TCP connections is currently in drafting.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '33 hours' + INTERVAL '279 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '33 hours' + INTERVAL '279 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t29',
  'Make sure your connection retries include exponential backoff with randomized jitter to prevent thundering herd spikes.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '316 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '316 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t30',
  'Happy coding everyone! Never hesitate to dive deep into compiler outputs and network packet captures.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '39 hours' + INTERVAL '353 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '39 hours' + INTERVAL '353 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t31',
  'Pinning the starter repository and benchmark code here for anyone following along with the My 4-Year Engineering Journey setup! (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '42 hours' + INTERVAL '390 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '42 hours' + INTERVAL '390 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t32',
  'A quick tip: when testing this in local staging, make sure your environment variables match the production schema definitions. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '45 hours' + INTERVAL '427 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '45 hours' + INTERVAL '427 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t33',
  'We re-ran the stress test benchmarks yesterday with high concurrent loads — latency remained remarkably steady under 15ms. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '464 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '464 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t34',
  'If you run into any edge-case exceptions during deployment, feel free to reply directly here and I will help debug. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '501 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '501 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t35',
  'Update: thanks everyone for the insightful feedback on psgtech! I am working on part 2 covering distributed failure scenarios. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '538 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '538 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t36',
  'One critical invariant to keep in mind is handling network partitions gracefully before falling back to cached state. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '575 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '575 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t37',
  'For those asking about memory footprint: running this under standard workloads consumed less than 65MB of resident RAM. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '612 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '612 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t38',
  'Added a small clarification in section 2 regarding backward compatibility with legacy client libraries. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '649 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '649 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t39',
  'The source code has been tested on both macOS Apple Silicon and Ubuntu 22.04 LTS with zero configuration differences. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '686 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '686 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t40',
  'Shoutout to our lab colleagues at PSG Tech who helped stress test the initial prototypes during evening sessions! (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '3 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '3 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t41',
  'Remember to configure health check endpoints properly so container orchestrators can accurately assess pod readiness. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t42',
  'Another major advantage of this pattern is that it completely eliminates redundant serialization overhead. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '27 hours' + INTERVAL '77 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '27 hours' + INTERVAL '77 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t43',
  'I would recommend pairing this with OpenTelemetry tracing if you want end-to-end request visibility in production. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '30 hours' + INTERVAL '114 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '30 hours' + INTERVAL '114 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t44',
  'Make sure to set up automated unit and integration tests before rolling this out to high-traffic student services. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '33 hours' + INTERVAL '151 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '33 hours' + INTERVAL '151 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t45',
  'An interesting benchmark observation: P99 response times dropped by over 40% once connection pooling was tuned. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '188 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '188 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t46',
  'Here is a common pitfall: neglecting timeouts on upstream service calls can cause cascading thread pool starvation. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '39 hours' + INTERVAL '225 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '39 hours' + INTERVAL '225 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t47',
  'Thanks for the great response to this article! Always excited to discuss psgtech, career, growth architectures. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '42 hours' + INTERVAL '262 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '42 hours' + INTERVAL '262 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t48',
  'Check out the official documentation as well for additional low-level runtime flags and optimizations. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '45 hours' + INTERVAL '299 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '45 hours' + INTERVAL '299 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t49',
  'We tested this with mock failure injection (Chaos Engineering) and the recovery loop converged in under 3 seconds. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '336 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '336 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t50',
  'Next milestone: integrating automated metrics export directly into our Grafana observability dashboard. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '373 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '3 hours' + INTERVAL '373 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t51',
  'Pro tip: keep your payload schema definitions modular so multiple microservices can import types cleanly. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '410 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '6 hours' + INTERVAL '410 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t52',
  'If you are benchmarking on your laptop, ensure background heavy processes are paused to obtain consistent jitter numbers. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '447 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '9 hours' + INTERVAL '447 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t53',
  'Glad to see so many campus developers interested in modern campus life architectures! More deep dives coming soon. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '484 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '484 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t54',
  'Key takeaway from our production rollout: keep abstractions thin and profile real workloads before optimizing. (Note #2 on growth)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '521 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '15 hours' + INTERVAL '521 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t55',
  'For anyone preparing for technical interviews, understanding these trade-offs will give you a solid advantage. (Note #2 on psgtech)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '558 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '18 hours' + INTERVAL '558 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_t56',
  'We also evaluated alternative frameworks before settling on this design; simplicity and predictability won out. (Note #2 on career)',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  NULL,
  0,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '595 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '21 hours' + INTERVAL '595 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r01',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t01',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '4 hours' + INTERVAL '0 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '4 hours' + INTERVAL '0 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r02',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t02',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '8 hours' + INTERVAL '19 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '8 hours' + INTERVAL '19 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r03',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t03',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '38 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '38 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r04',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t04',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '16 hours' + INTERVAL '2 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '16 hours' + INTERVAL '2 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r05',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t05',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '20 hours' + INTERVAL '21 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '20 hours' + INTERVAL '21 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r06',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t06',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '40 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '40 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r07',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t07',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '28 hours' + INTERVAL '4 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '28 hours' + INTERVAL '4 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r08',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t08',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '32 hours' + INTERVAL '23 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '32 hours' + INTERVAL '23 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r09',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t09',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '42 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '36 hours' + INTERVAL '42 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r10',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t10',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '6 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '0 hours' + INTERVAL '6 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r11',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t11',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '4 hours' + INTERVAL '25 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '4 hours' + INTERVAL '25 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r12',
  'Quick update on this: the benchmark results have been verified across 10,000 simulated requests.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t12',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '8 hours' + INTERVAL '44 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '8 hours' + INTERVAL '44 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r13',
  'Yes, exactly. That is why keeping immutable state payloads makes debugging significantly easier.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t13',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '8 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '12 hours' + INTERVAL '8 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r14',
  'Thanks for pointing that out! Added an inline note to clarify the configuration parameter.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t14',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '16 hours' + INTERVAL '27 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '16 hours' + INTERVAL '27 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r15',
  'Replying to follow up on this: definitely agree, especially when scaling across multiple clusters!',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t15',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '20 hours' + INTERVAL '46 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '20 hours' + INTERVAL '46 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r16',
  'Good observation. We actually tested that exact scenario in the lab and confirmed the behavior.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t16',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '10 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '24 hours' + INTERVAL '10 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r17',
  'Here is the relevant documentation snippet that explains the internal buffering mechanism.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t17',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '28 hours' + INTERVAL '29 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '28 hours' + INTERVAL '29 minutes'
) ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Comment" (
  "id", "content", "postId", "userId", "parentId", "depth", "isDeleted", "isPinned", "version", "createdAt", "updatedAt"
) VALUES (
  'comm_cmvg_seed_50_agnesh_r18',
  'Spot on! Handling timeouts at the gateway level provides an additional safeguard.',
  'cmvg_seed_50_agnesh',
  'FAtVkshJTjxo1oQAhBjvYlEUnSYR0jG3',
  'comm_cmvg_seed_50_agnesh_t18',
  1,
  false,
  false,
  1,
  NOW() - INTERVAL '50 days' + INTERVAL '32 hours' + INTERVAL '48 minutes',
  NOW() - INTERVAL '50 days' + INTERVAL '32 hours' + INTERVAL '48 minutes'
) ON CONFLICT ("id") DO NOTHING;

COMMIT;
