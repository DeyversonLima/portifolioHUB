const DATA_ROOT = 'data'

export async function loadData() {
  const files = ['projects', 'certifications', 'skills', 'timeline', 'archive']
  const responses = await Promise.all(files.map((name) => fetch(`${DATA_ROOT}/${name}.json`)))

  responses.forEach((response) => {
    if (!response.ok) throw new Error(`Falha ao carregar ${response.url}`)
  })

  const [projects, certifications, skills, timeline, archive] = await Promise.all(
    responses.map((response) => response.json()),
  )
  return { projects, certifications, skills, timeline, archive }
}

export function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
