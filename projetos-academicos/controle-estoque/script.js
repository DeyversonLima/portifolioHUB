const STORAGE_KEY = 'portfolio-hub:inventory'
const form = document.getElementById('form-adicionar')
const tableBody = document.querySelector('#tabela-estoque tbody')
const status = document.getElementById('estoque-status')

function readProducts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}

let products = readProducts()
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)) }

function actionButton(label, className, handler) {
  const button = document.createElement('button')
  button.type = 'button'; button.className = className; button.textContent = label
  button.addEventListener('click', handler)
  return button
}

function render() {
  tableBody.replaceChildren()
  products.forEach((product) => {
    const row = tableBody.insertRow()
    const name = row.insertCell(); const quantity = row.insertCell(); const price = row.insertCell()
    const add = row.insertCell(); const remove = row.insertCell()
    name.textContent = product.name
    quantity.textContent = String(product.quantity)
    price.textContent = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    add.append(actionButton('+1', 'adicionar', () => updateQuantity(product.id, 1)))
    remove.append(actionButton(product.quantity ? '-1' : 'Excluir', 'remover', () => product.quantity ? updateQuantity(product.id, -1) : deleteProduct(product.id)))
  })
  if (!products.length) status.textContent = 'Nenhum produto cadastrado.'
}

function updateQuantity(id, change) {
  products = products.map((product) => product.id === id ? { ...product, quantity: Math.max(0, product.quantity + change) } : product)
  save(); render(); status.textContent = 'Estoque atualizado.'
}

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id)
  save(); render(); status.textContent = 'Produto excluído.'
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = document.getElementById('nome-produto').value.trim()
  const quantity = Number(document.getElementById('quantidade-produto').value)
  const price = Number(document.getElementById('preco-produto').value)
  if (!name || !Number.isInteger(quantity) || quantity < 0 || !Number.isFinite(price) || price <= 0) {
    status.textContent = 'Revise nome, quantidade e preço.'; return
  }
  products.push({ id: crypto.randomUUID(), name, quantity, price })
  save(); render(); form.reset(); status.textContent = 'Produto adicionado.'
})
render()
