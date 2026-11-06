const root = document.documentElement
const themeButton = document.getElementById('theme-toggle')
const search = document.getElementById('project-search')
const cards = [...document.querySelectorAll('.project-card')]
const status = document.getElementById('search-status')

themeButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  root.dataset.theme = nextTheme
  localStorage.setItem('hub-theme', nextTheme)
})

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

search.addEventListener('input', () => {
  const term = normalize(search.value.trim())
  let visible = 0

  cards.forEach((card) => {
    const matches = normalize(card.dataset.search).includes(term)
    card.hidden = !matches
    if (matches) visible += 1
  })

  status.textContent = term
    ? `${visible} projeto${visible === 1 ? '' : 's'} encontrado${visible === 1 ? '' : 's'}.`
    : ''
})
