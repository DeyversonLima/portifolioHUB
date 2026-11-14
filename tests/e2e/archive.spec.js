import { expect, test } from '@playwright/test'

test.describe('arquivo acadêmico', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Fluxos funcionais cobertos uma vez no Chromium desktop')
  })

  test('calculadora executa uma operação', async ({ page }) => {
    await page.goto('/projetos-academicos/calculadora-web/')
    await page.getByRole('button', { name: '2' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '3' }).click()
    await page.getByRole('button', { name: '=' }).click()
    await expect(page.getByLabel('Resultado da calculadora')).toHaveValue('5')
  })

  test('estoque persiste dados e trata texto como texto', async ({ page }) => {
    await page.goto('/projetos-academicos/controle-estoque/')
    await page.getByLabel('Produto').fill('<img src=x onerror=alert(1)>')
    await page.getByLabel('Quantidade').fill('2')
    await page.getByLabel('Preço').fill('19.90')
    await page.getByRole('button', { name: 'Adicionar Produto' }).click()
    await expect(page.locator('tbody')).toContainText('<img src=x onerror=alert(1)>')
    await expect(page.locator('tbody img')).toHaveCount(0)
    await page.reload()
    await expect(page.locator('tbody')).toContainText('<img src=x onerror=alert(1)>')
  })

  test('lista de tarefas aceita teclado, conclui e filtra', async ({ page }) => {
    await page.goto('/projetos-pessoais/todo-list/')
    await page.getByLabel('Nova tarefa').fill('Revisar portfólio')
    await page.keyboard.press('Enter')
    await page.getByLabel('Concluir tarefa: Revisar portfólio').check()
    await page.getByRole('button', { name: 'Concluídas' }).click()
    await expect(page.getByText('Revisar portfólio')).toBeVisible()
    await page.getByRole('button', { name: 'Pendentes' }).click()
    await expect(page.getByText('Revisar portfólio')).toBeHidden()
  })

  test('login deixa claro que a validação é demonstrativa', async ({ page }) => {
    await page.goto('/projetos-academicos/sistema-login/')
    await page.getByLabel('Usuário:').fill('ab')
    await page.getByLabel('Senha:').fill('123')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page.locator('#form-message')).toContainText('ao menos 3 caracteres')
    await page.getByLabel('Usuário:').fill('visitante')
    await page.getByLabel('Senha:').fill('demonstracao')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page.locator('#form-message')).toContainText('Campos validados')
  })
})
