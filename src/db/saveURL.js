// @ts-check
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

db.data ||= { urls: [] }

const saveURL = (id, title, url) => db.data.urls.push({ id, title, url })

export default saveURL
// Create and query items using plain JS
db.data.posts.push('hello world')
const firstPost = db.data.posts[0]

// Alternatively, you can also use this syntax if you prefer
const { posts } = db.data
posts.push('hello world')

// Finally write db.data content to file
await db.write()