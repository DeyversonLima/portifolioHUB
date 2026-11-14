const STATUS_LABELS = { ativo: 'Ativo', concluido: 'Concluído', evolucao: 'Em evolução' }

function element(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function tags(items) {
  const list = element('ul', 'tags')
  items.forEach((item) => list.append(element('li', '', item)))
  return list
}

function status(project) {
  const pill = element('span', 'status-pill', STATUS_LABELS[project.status] || project.status)
  pill.dataset.status = project.status
  return pill
}

function externalLink(url, label) {
  const link = element('a', 'card-link', label)
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  const arrow = element('span', '', '↗')
  arrow.setAttribute('aria-hidden', 'true')
  link.append(arrow)
  return link
}

export function renderFeatured(projects, container) {
  const fragment = document.createDocumentFragment()
  projects.filter((project) => project.featured).forEach((project, index) => {
    const card = element('article', 'featured-card')
    const top = element('div', 'card-top')
    top.append(element('span', 'card-index', String(index + 1).padStart(2, '0')), status(project))
    const title = element('h3', '', project.title)
    const summary = element('p', '', project.summary)
    const highlights = element('ul', 'highlights')
    project.highlights.forEach((item) => highlights.append(element('li', '', item)))
    const actions = element('div', 'card-actions')
    actions.append(externalLink(project.repository, 'Repositório'))
    if (project.demo) actions.append(externalLink(project.demo, project.demoLabel || 'Demonstração'))
    card.append(top, title, summary, tags(project.technologies), highlights, actions)
    fragment.append(card)
  })
  container.replaceChildren(fragment)
}

export function renderProjects(projects, container) {
  const fragment = document.createDocumentFragment()
  projects.forEach((project) => {
    const card = element('article', 'project-card')
    const top = element('div', 'card-top')
    top.append(element('span', 'card-index', String(project.year)), status(project))
    const title = element('h3', '', project.title)
    const summary = element('p', '', project.summary)
    const actions = element('div', 'card-actions')
    actions.append(externalLink(project.repository, 'Código'))
    if (project.demo) actions.append(externalLink(project.demo, project.demoLabel || 'Abrir'))
    card.append(top, title, summary, tags(project.technologies), actions)
    fragment.append(card)
  })
  container.replaceChildren(fragment)
}

export function renderSkills(skills, container) {
  const fragment = document.createDocumentFragment()
  skills.forEach((skill, index) => {
    const card = element('article', 'skill-card')
    card.append(
      element('span', 'skill-number', String(index + 1).padStart(2, '0')),
      element('h3', '', skill.title),
      element('p', '', skill.description),
      tags(skill.items),
    )
    fragment.append(card)
  })
  container.replaceChildren(fragment)
}

export function renderCertifications(certifications, container) {
  const fragment = document.createDocumentFragment()
  certifications.forEach((certificate) => {
    const card = element('article', 'cert-card')
    const meta = element('div', 'cert-meta')
    meta.append(element('span', '', certificate.level), element('span', '', String(certificate.year)))
    card.append(meta, element('h3', '', certificate.title), element('p', '', certificate.issuer))
    fragment.append(card)
  })
  container.replaceChildren(fragment)
}

export function renderTimeline(items, container) {
  const fragment = document.createDocumentFragment()
  items.forEach((item) => {
    const row = element('li')
    const time = element('time', '', item.year)
    time.dateTime = item.year === 'Agora' ? String(new Date().getFullYear()) : item.year
    row.append(time, element('h3', '', item.title), element('p', '', item.description))
    fragment.append(row)
  })
  container.replaceChildren(fragment)
}

export function renderArchive(items, container) {
  const fragment = document.createDocumentFragment()
  items.forEach((item) => {
    const card = element('article', 'archive-card')
    card.append(element('span', 'status-pill', item.status), element('h3', '', item.title), element('p', '', item.description), tags(item.technologies))
    const link = element('a', '', 'Abrir material →')
    link.href = item.url
    card.append(link)
    fragment.append(card)
  })
  container.replaceChildren(fragment)
}

export function renderError(container, message) {
  const error = element('div', 'empty-state')
  error.append(element('strong', '', 'Não foi possível carregar o conteúdo.'), element('span', '', message))
  container.replaceChildren(error)
}
