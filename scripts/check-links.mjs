import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const ignored = new Set(['node_modules', '.git'])

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else if (entry.name.endsWith('.html')) files.push(path)
  }
  return files
}

const failures = []
for (const file of await walk(root)) {
  const html = await readFile(file, 'utf8')
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1])
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(reference)) continue
    const clean = decodeURIComponent(reference.split(/[?#]/)[0])
    if (!clean) continue
    try { await access(resolve(dirname(file), clean)) } catch { failures.push(`${relative(root, file)} -> ${reference}`) }
  }
}
if (failures.length) throw new Error(`Referências locais inexistentes:\n${failures.join('\n')}`)
console.log('Todos os recursos locais referenciados existem.')
