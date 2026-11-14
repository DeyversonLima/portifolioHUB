import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function json(name) { return JSON.parse(await readFile(new URL(`../data/${name}.json`, import.meta.url), 'utf8')) }

test('catálogo possui projetos atuais e destaques', async () => {
  const projects = await json('projects')
  assert.ok(projects.length >= 12)
  assert.ok(projects.filter((project) => project.featured).length >= 6)
  assert.ok(projects.some((project) => project.id === 'task-manager-tui'))
  assert.ok(projects.some((project) => project.id === 'finmarket'))
})

test('certificações não expõem caminhos locais ou documentos brutos', async () => {
  const certificates = await json('certifications')
  assert.ok(certificates.length >= 14)
  certificates.forEach((certificate) => {
    assert.equal('file' in certificate, false)
    assert.equal('cpf' in certificate, false)
    assert.equal('code' in certificate, false)
  })
})
