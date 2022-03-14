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

const saveURL = async (id, title, url) => {
    db.data.urls.push({ id, title, url })
    await db.write()
}

export default saveURL
