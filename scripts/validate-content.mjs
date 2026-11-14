import { readFile } from 'node:fs/promises'

const files = ['projects', 'certifications', 'skills', 'timeline', 'archive']
const data = Object.fromEntries(await Promise.all(files.map(async (name) => [name, JSON.parse(await readFile(new URL(`../data/${name}.json`, import.meta.url), 'utf8'))])))

for (const [name, entries] of Object.entries(data)) {
  if (!Array.isArray(entries) || !entries.length) throw new Error(`${name}.json deve conter uma lista não vazia.`)
}

const projectIds = data.projects.map((project) => project.id)
if (new Set(projectIds).size !== projectIds.length) throw new Error('IDs de projeto duplicados.')

const requiredProjectFields = ['id', 'title', 'summary', 'category', 'kind', 'year', 'status', 'technologies', 'repository', 'highlights']
const allowedStatus = new Set(['ativo', 'concluido', 'evolucao'])
data.projects.forEach((project) => {
  requiredProjectFields.forEach((field) => { if (project[field] === undefined || project[field] === '') throw new Error(`${project.id || 'Projeto'} sem ${field}.`) })
  if (!allowedStatus.has(project.status)) throw new Error(`${project.id}: status inválido.`)
  if (!project.repository.startsWith('https://github.com/')) throw new Error(`${project.id}: repositório inválido.`)
  if (!Array.isArray(project.technologies) || !project.technologies.length) throw new Error(`${project.id}: informe tecnologias.`)
})

const certificateIds = data.certifications.map((item) => item.id)
if (new Set(certificateIds).size !== certificateIds.length) throw new Error('IDs de certificação duplicados.')
data.certifications.forEach((item) => ['id', 'title', 'issuer', 'category', 'year', 'level'].forEach((field) => { if (!item[field]) throw new Error(`${item.id || 'Certificação'} sem ${field}.`) }))

console.log(`Conteúdo válido: ${data.projects.length} projetos, ${data.certifications.length} certificações e ${data.archive.length} itens históricos.`)
