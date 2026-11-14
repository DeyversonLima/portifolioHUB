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
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('portfolio-hub:theme', root.dataset.theme)
    sync()
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
  document.addEventListener('click', (event) => { if (menu.classList.contains('open') && !menu.contains(event.target) && !toggle.contains(event.target)) close() })
  matchMedia('(min-width: 821px)').addEventListener('change', (event) => { if (event.matches) close() })
}
