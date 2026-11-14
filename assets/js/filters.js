import { normalize } from './data.js'
import { renderCertifications, renderProjects } from './render.js'

export function setupProjectFilters(projects) {
  const form = document.querySelector('[data-filter-form]')
  const container = document.querySelector('[data-project-grid]')
  const status = document.querySelector('#project-status')
  const empty = document.querySelector('[data-project-empty]')
  const clear = document.querySelector('[data-clear-filters]')

  function apply() {
    const values = Object.fromEntries(new FormData(form))
    const query = normalize(values.query.trim())
    const filtered = projects.filter((project) => {
      const searchable = normalize([project.title, project.summary, project.category, project.kind, ...project.technologies, ...project.highlights].join(' '))
      return (!query || searchable.includes(query)) && (!values.category || project.category === values.category) && (!values.kind || project.kind === values.kind) && (!values.status || project.status === values.status)
    })
    renderProjects(filtered, container)
    empty.hidden = filtered.length !== 0
    status.textContent = `${filtered.length} de ${projects.length} projeto${projects.length === 1 ? '' : 's'}`
    const params = new URLSearchParams()
    Object.entries(values).forEach(([key, value]) => { if (value) params.set(key, value) })
    history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`)
  }

  const params = new URLSearchParams(location.search)
  for (const [name, value] of params) {
    const field = form.elements.namedItem(name)
    if (field) field.value = value
  }
  form.addEventListener('input', apply)
  form.addEventListener('submit', (event) => { event.preventDefault(); apply() })
  clear.addEventListener('click', () => { form.reset(); apply(); form.querySelector('input').focus() })
  apply()
}

export function setupCertificateFilters(certificates) {
  const toolbar = document.querySelector('[data-cert-filters]')
  const container = document.querySelector('[data-cert-grid]')
  const categories = ['todas', ...new Set(certificates.map((item) => item.category))]
  const labels = { todas: 'Todas', engenharia: 'Engenharia', seguranca: 'Segurança', infraestrutura: 'Infraestrutura', ia: 'IA', dados: 'Dados', desenvolvimento: 'Desenvolvimento', cloud: 'Cloud' }

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'cert-filter'
    button.textContent = labels[category] || category
    button.dataset.category = category
    button.setAttribute('aria-pressed', String(category === 'todas'))
    button.addEventListener('click', () => {
      toolbar.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)))
      renderCertifications(category === 'todas' ? certificates : certificates.filter((item) => item.category === category), container)
    })
    toolbar.append(button)
  })
  renderCertifications(certificates, container)
}
