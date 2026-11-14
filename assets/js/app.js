import { loadData } from './data.js'
import { setupCertificateFilters, setupProjectFilters } from './filters.js'
import { setupNavigation, setupReveal, setupScrollExperience, setupTheme } from './navigation.js'
import { renderArchive, renderError, renderFeatured, renderSkills, renderTimeline } from './render.js'

setupTheme()
setupNavigation()
setupScrollExperience()
document.querySelector('[data-current-year]').textContent = String(new Date().getFullYear())

try {
  const data = await loadData()
  document.querySelector('[data-project-count]').textContent = String(data.projects.length)
  document.querySelector('[data-cert-count]').textContent = String(data.certifications.length)
  renderFeatured(data.projects, document.querySelector('[data-featured-projects]'))
  renderSkills(data.skills, document.querySelector('[data-skills-grid]'))
  renderTimeline(data.timeline, document.querySelector('[data-timeline]'))
  renderArchive(data.archive, document.querySelector('[data-archive-grid]'))
  setupProjectFilters(data.projects)
  setupCertificateFilters(data.certifications)
  setupReveal()
} catch (error) {
  renderError(document.querySelector('[data-featured-projects]'), 'Use um servidor local para acessar o catálogo. Consulte o README.')
  console.error(error)
}
