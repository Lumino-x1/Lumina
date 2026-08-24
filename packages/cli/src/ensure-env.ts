import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(import.meta.dirname ?? dirname(fileURLToPath(import.meta.url)), "../../..");
const examplePath = resolve(root, '.env.example')
const envPath = resolve(root, '.env')

if (existsSync(envPath)) {
  process.exit(0)
}

if (!existsSync(examplePath)) {
  console.error('Missing .env.example — cannot create .env')
  process.exit(1)
}

copyFileSync(examplePath, envPath)
console.log('Created .env from .env.example — fill in your values before continuing')
