import { expect, test } from '@playwright/test'

test('carrega o catálogo sem erros e filtra projetos', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Projetos em evidência' })).toBeVisible()
  await expect(page.locator('[data-featured-projects] .featured-card')).toHaveCount(6)
  await expect(page.locator('[data-project-grid] .project-card')).toHaveCount(12)
  await page.getByLabel('Área').selectOption('seguranca')
  await expect(page.locator('[data-project-grid] .project-card')).toHaveCount(3)
  await expect(page.locator('#project-status')).toContainText('3 de 12')
  expect(errors).toEqual([])
})

test('persiste tema e permite navegação por teclado', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Fluxo coberto no layout desktop')
  await page.goto('/')
  const theme = page.getByRole('button', { name: /Usar tema/ })
  await theme.focus()
  await page.keyboard.press('Enter')
  const selected = await page.locator('html').getAttribute('data-theme')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', selected)
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement !== document.body)).toBe(true)
})

test('menu móvel abre, fecha com Escape e não causa rolagem horizontal', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Fluxo específico do layout móvel')
  await page.goto('/')
  const menuButton = page.getByRole('button', { name: 'Abrir menu' })
  await menuButton.click()
  await expect(page.locator('[data-menu]')).toHaveClass(/open/)
  await page.keyboard.press('Escape')
  await expect(page.locator('[data-menu]')).not.toHaveClass(/open/)
  const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }))
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport)
})
