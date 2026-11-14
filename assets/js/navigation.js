export function setupTheme() {
  const root = document.documentElement
  const button = document.querySelector('[data-theme-toggle]')
  const icon = button.querySelector('[data-theme-icon]')

  function sync() {
    const light = root.dataset.theme === 'light'
    button.setAttribute('aria-pressed', String(light))
    button.setAttribute('aria-label', light ? 'Usar tema escuro' : 'Usar tema claro')
    icon.textContent = light ? '◑' : '◐'
    document.querySelector('meta[name="theme-color"]').content = light ? '#f4f8f5' : '#07100e'
  }
  button.addEventListener('click', () => {
    const changeTheme = () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('portfolio-hub:theme', root.dataset.theme)
      sync()
    }
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(changeTheme)
    else changeTheme()
  })
  sync()
}

export function setupNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]')
  const menu = document.querySelector('[data-menu]')

  function close({ restoreFocus = false } = {}) {
    menu.classList.remove('open')
    document.body.classList.remove('menu-open')
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', 'Abrir menu')
    if (restoreFocus) toggle.focus()
  }
  function open() {
    menu.classList.add('open')
    document.body.classList.add('menu-open')
    toggle.setAttribute('aria-expanded', 'true')
    toggle.setAttribute('aria-label', 'Fechar menu')
    menu.querySelector('a').focus()
  }
  toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open())
  menu.addEventListener('click', (event) => { if (event.target.closest('a')) close() })
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu.classList.contains('open')) close({ restoreFocus: true }) })
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !menu.classList.contains('open')) return
    const focusable = [...menu.querySelectorAll('a, button:not([disabled])')]
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  })
  document.addEventListener('click', (event) => { if (menu.classList.contains('open') && !menu.contains(event.target) && !toggle.contains(event.target)) close() })
  matchMedia('(min-width: 821px)').addEventListener('change', (event) => { if (event.matches) close() })
}

export function setupScrollExperience() {
  const header = document.querySelector('[data-header]')
  const progress = document.querySelector('[data-scroll-progress]')
  const backToTop = document.querySelector('[data-back-to-top]')
  const links = [...document.querySelectorAll('[data-section-link]')]
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean)

  function updateScrollState() {
    const scrollable = document.documentElement.scrollHeight - innerHeight
    const amount = scrollable > 0 ? Math.min(100, (scrollY / scrollable) * 100) : 0
    progress.style.width = `${amount}%`
    header.classList.toggle('scrolled', scrollY > 12)
    backToTop.classList.toggle('visible', scrollY > innerHeight * .7)
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (!visible) return
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`
      if (active) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .1, .4] })

  sections.forEach((section) => sectionObserver.observe(section))
  backToTop.addEventListener('click', () => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  addEventListener('scroll', updateScrollState, { passive: true })
  addEventListener('resize', updateScrollState)
  updateScrollState()
}

export function setupReveal() {
  const items = [...document.querySelectorAll('.section-heading, .featured-card, .project-card, .skill-card, .cert-card, .timeline li, .archive-card, .document-links, .cta-section')]
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 })
  items.forEach((item, index) => {
    item.classList.add('reveal')
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`
    observer.observe(item)
  })
}
