-- ============================================================================
-- Lumina Platform: Seed 10 Verified Student Users for PostgreSQL
-- Target Institution: PSG College of Technology (psgtech.ac.in)
-- Default Password for all 10 users: Password123!
-- ============================================================================

BEGIN;

DO $$
DECLARE
  v_college_id TEXT;
  v_dept_id TEXT;
  v_pwd_hash TEXT := '3f4920e5dd5f471ac1a72cada791a427:9229b09f49c325bc825d19c89b9001c6c021a3ec3f58e4ae1a1d0969605c0088585c4875d5f7c95e40fe5693d047d73a56f7e2c9e9f7e7a692cbf22e53ea2c23';
BEGIN
  -- 1. Ensure College exists
  SELECT id INTO v_college_id FROM "College" WHERE domain = 'psgtech.ac.in' OR slug = 'psg-tech' LIMIT 1;
  IF v_college_id IS NULL THEN
    v_college_id := 'col_psg_tech_' || substr(md5(random()::text), 1, 12);
    INSERT INTO "College" ("id", "name", "shortName", "slug", "domain", "city", "state", "country", "isVerified", "isActive", "description", "createdAt", "updatedAt")
    VALUES (v_college_id, 'PSG College of Technology', 'PSG Tech', 'psg-tech', 'psgtech.ac.in', 'Coimbatore', 'Tamil Nadu', 'India', true, true, 'Premier Autonomous Government-Aided Engineering College in Coimbatore, India.', NOW(), NOW());
  END IF;

  -- 2. Ensure Department exists
  SELECT id INTO v_dept_id FROM "Department" WHERE "collegeId" = v_college_id AND "name" ILIKE '%Computer Science%' LIMIT 1;
  IF v_dept_id IS NULL THEN
    v_dept_id := 'dept_cse_' || substr(md5(random()::text), 1, 12);
    INSERT INTO "Department" ("id", "name", "code", "collegeId", "createdAt", "updatedAt")
    VALUES (v_dept_id, 'Computer Science & Engineering', 'CSE', v_college_id, NOW(), NOW());
  END IF;

  -- ==========================================================================
  -- USER 1: Sarah Chen (President, ACM Student Chapter)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_sarahchen', 'sarah.chen@psgtech.ac.in', 'Sarah Chen', 'sarahchen', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_sarahchen_id', 'usr_psg_sarahchen', 'usr_psg_sarahchen', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_sarahchen', 'usr_psg_sarahchen', 'Sarah', 'Chen', 'sarah.chen@psgtech.ac.in', '24Z101', '2024-2028', 2, 4, 9.45, 'President @ ACM Student Chapter. Passionate about distributed systems, microservices & algorithms.', 'Coimbatore', 'Coimbatore, India', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', ARRAY['Rust', 'Distributed Systems', 'Go', 'Docker', 'Kubernetes']::text[], ARRAY['Open Source', 'System Design', 'Hackathons']::text[], ARRAY['English', 'Tamil']::text[], 'https://github.com/sarahchen', 'https://linkedin.com/in/sarahchen', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 2: Alex Rivera (AI & Robotics Researcher)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_alexrivera', 'alex.rivera@psgtech.ac.in', 'Alex Rivera', 'alexrivera', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_alexrivera_id', 'usr_psg_alexrivera', 'usr_psg_alexrivera', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_alexrivera', 'usr_psg_alexrivera', 'Alex', 'Rivera', 'alex.rivera@psgtech.ac.in', '24Z102', '2024-2028', 2, 4, 9.12, 'Undergrad researcher exploring reinforcement learning, computer vision & autonomous rovers.', 'Chennai', 'Coimbatore, India', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', ARRAY['Python', 'PyTorch', 'ROS2', 'OpenCV', 'C++']::text[], ARRAY['Robotics', 'Deep Learning', 'Drones']::text[], ARRAY['English', 'Tamil']::text[], 'https://github.com/alexrivera', 'https://linkedin.com/in/alexrivera', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 3: Priya Raman (Cloud Infrastructure Engineer)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_priyaraman', 'priya.raman@psgtech.ac.in', 'Priya Raman', 'priyaraman', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_priyaraman_id', 'usr_psg_priyaraman', 'usr_psg_priyaraman', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_priyaraman', 'usr_psg_priyaraman', 'Priya', 'Raman', 'priya.raman@psgtech.ac.in', '24Z103', '2024-2028', 2, 4, 9.60, 'Cloud infrastructure nerd. Terraforming the universe. Building low-latency network primitives.', 'Bangalore', 'Coimbatore, India', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80', ARRAY['AWS', 'Terraform', 'Kubernetes', 'Go', 'Linux eBPF']::text[], ARRAY['Cloud Architecture', 'DevOps', 'Distributed Hash Tables']::text[], ARRAY['English', 'Kannada', 'Tamil']::text[], 'https://github.com/priyaraman', 'https://linkedin.com/in/priyaraman', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 4: Karthik Raja (Competitive Programmer & Backend Lead)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_karthikraja', 'karthik.raja@psgtech.ac.in', 'Karthik Raja', 'karthikraja', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_karthikraja_id', 'usr_psg_karthikraja', 'usr_psg_karthikraja', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_karthikraja', 'usr_psg_karthikraja', 'Karthik', 'Raja', 'karthik.raja@psgtech.ac.in', '24Z104', '2024-2028', 2, 4, 8.88, 'Candidate Master @ Codeforces. High performance backend engineering with C++20 and Node.js.', 'Madurai', 'Coimbatore, India', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', ARRAY['C++20', 'Algorithms', 'Data Structures', 'PostgreSQL', 'Redis']::text[], ARRAY['Competitive Programming', 'Graph Theory', 'Cache Optimization']::text[], ARRAY['English', 'Tamil']::text[], 'https://github.com/karthikraja', 'https://linkedin.com/in/karthikraja', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 5: Ananya Sharma (Machine Learning & NLP Builder)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_ananyasharma', 'ananya.sharma@psgtech.ac.in', 'Ananya Sharma', 'ananyasharma', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_ananyasharma_id', 'usr_psg_ananyasharma', 'usr_psg_ananyasharma', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_ananyasharma', 'usr_psg_ananyasharma', 'Ananya', 'Sharma', 'ananya.sharma@psgtech.ac.in', '24Z105', '2024-2028', 2, 4, 9.35, 'Building LLM evaluation frameworks and transformer interpretability models. NLP & GenAI.', 'New Delhi', 'Coimbatore, India', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', ARRAY['PyTorch', 'HuggingFace', 'Transformers', 'FastAPI', 'Python']::text[], ARRAY['Natural Language Processing', 'Vector Databases', 'AI Ethics']::text[], ARRAY['English', 'Hindi']::text[], 'https://github.com/ananyasharma', 'https://linkedin.com/in/ananyasharma', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 6: Rohan Verma (Full Stack & Mobile Craftsman)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_rohanverma', 'rohan.verma@psgtech.ac.in', 'Rohan Verma', 'rohanverma', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_rohanverma_id', 'usr_psg_rohanverma', 'usr_psg_rohanverma', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_rohanverma', 'usr_psg_rohanverma', 'Rohan', 'Verma', 'rohan.verma@psgtech.ac.in', '24Z106', '2024-2028', 2, 4, 8.75, 'Full stack web & mobile builder. TypeScript, React Native, Next.js, and GraphQL.', 'Mumbai', 'Coimbatore, India', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80', ARRAY['TypeScript', 'React', 'React Native', 'GraphQL', 'TailwindCSS']::text[], ARRAY['Mobile Apps', 'Design Systems', 'Microfrontends']::text[], ARRAY['English', 'Hindi']::text[], 'https://github.com/rohanverma', 'https://linkedin.com/in/rohanverma', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 7: Deepa Krishnan (Cybersecurity & Application Security)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_deepakrishnan', 'deepa.k@psgtech.ac.in', 'Deepa Krishnan', 'deepakrishnan', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_deepakrishnan_id', 'usr_psg_deepakrishnan', 'usr_psg_deepakrishnan', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_deepakrishnan', 'usr_psg_deepakrishnan', 'Deepa', 'Krishnan', 'deepa.k@psgtech.ac.in', '24Z107', '2024-2028', 2, 4, 9.20, 'CTF player & AppSec enthusiast. Researching zero-trust networks, cryptanalysis & binary exploitation.', 'Kochi', 'Coimbatore, India', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80', ARRAY['Network Security', 'Cryptography', 'Ghidra', 'Wireshark', 'Python']::text[], ARRAY['CTF Competitions', 'Zero-Trust', 'Penetration Testing']::text[], ARRAY['English', 'Malayalam', 'Tamil']::text[], 'https://github.com/deepakrishnan', 'https://linkedin.com/in/deepakrishnan', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 8: Vignesh Sundar (Distributed Storage & Kernel Hacker)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_vigneshsundar', 'vignesh.s@psgtech.ac.in', 'Vignesh Sundar', 'vigneshsundar', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_vigneshsundar_id', 'usr_psg_vigneshsundar', 'usr_psg_vigneshsundar', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_vigneshsundar', 'usr_psg_vigneshsundar', 'Vignesh', 'Sundar', 'vignesh.s@psgtech.ac.in', '24Z108', '2024-2028', 2, 4, 9.05, 'Writing LSM tree storage engines in Rust and debugging Linux kernel page faults.', 'Trichy', 'Coimbatore, India', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80', ARRAY['Rust', 'C', 'Operating Systems', 'Linux eBPF', 'LSM-Trees']::text[], ARRAY['Kernel Development', 'Storage Engines', 'Compilers']::text[], ARRAY['English', 'Tamil']::text[], 'https://github.com/vigneshsundar', 'https://linkedin.com/in/vigneshsundar', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 9: Meera Nair (Product Designer & Frontend Engineer)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_meeranair', 'meera.nair@psgtech.ac.in', 'Meera Nair', 'meeranair', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_meeranair_id', 'usr_psg_meeranair', 'usr_psg_meeranair', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_meeranair', 'usr_psg_meeranair', 'Meera', 'Nair', 'meera.nair@psgtech.ac.in', '24Z109', '2024-2028', 2, 4, 8.95, 'Crafting fluid user interfaces and micro-interactions. Design systems lead @ Lumina Campus Club.', 'Trivandrum', 'Coimbatore, India', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', ARRAY['Figma', 'React', 'CSS/Three.js', 'TypeScript', 'Motion Design']::text[], ARRAY['Creative Coding', 'Design Systems', 'Typography']::text[], ARRAY['English', 'Malayalam']::text[], 'https://github.com/meeranair', 'https://linkedin.com/in/meeranair', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  -- ==========================================================================
  -- USER 10: Aditya Patel (Quantum Computing & HPC Enthusiast)
  -- ==========================================================================
  INSERT INTO "User" ("id", "email", "name", "username", "collegeId", "departmentId", "emailVerified", "role", "status", "password", "createdAt", "updatedAt")
  VALUES ('usr_psg_adityapatel', 'aditya.patel@psgtech.ac.in', 'Aditya Patel', 'adityapatel', v_college_id, v_dept_id, true, 'STUDENT', 'ACTIVE', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "username" = EXCLUDED."username", "collegeId" = v_college_id, "departmentId" = v_dept_id, "emailVerified" = true, "status" = 'ACTIVE';

  INSERT INTO "Account" ("id", "userId", "accountId", "providerId", "password", "createdAt", "updatedAt")
  VALUES ('acc_adityapatel_id', 'usr_psg_adityapatel', 'usr_psg_adityapatel', 'credential', v_pwd_hash, NOW(), NOW())
  ON CONFLICT ("providerId", "accountId") DO UPDATE SET "password" = EXCLUDED."password";

  INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "email", "rollNumber", "batch", "year", "semester", "cgpa", "bio", "hometown", "location", "profilePicture", "skills", "interests", "languages", "github", "linkedin", "profileVisibility", "createdAt", "updatedAt")
  VALUES ('prof_adityapatel', 'usr_psg_adityapatel', 'Aditya', 'Patel', 'aditya.patel@psgtech.ac.in', '24Z110', '2024-2028', 2, 4, 9.52, 'Quantum circuits and CUDA GPU kernel optimization. Interested in Qiskit, OpenMPI and high-throughput clusters.', 'Ahmedabad', 'Coimbatore, India', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80', ARRAY['CUDA', 'C++', 'Qiskit', 'MPI', 'Python']::text[], ARRAY['Quantum Algorithms', 'GPU Computing', 'Supercomputing']::text[], ARRAY['English', 'Gujarati', 'Hindi']::text[], 'https://github.com/adityapatel', 'https://linkedin.com/in/adityapatel', 'PUBLIC', NOW(), NOW())
  ON CONFLICT ("userId") DO UPDATE SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "cgpa" = EXCLUDED."cgpa", "bio" = EXCLUDED."bio", "skills" = EXCLUDED."skills";

  RAISE NOTICE 'Successfully seeded 10 PSG College of Technology student users with complete profiles and credentials!';
END $$;

COMMIT;
