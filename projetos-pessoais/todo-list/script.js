const STORAGE_KEY = 'portfolio-hub:todo-list'
const taskInput = document.getElementById('new-task')
const taskList = document.getElementById('task-list')
const status = document.getElementById('task-status')
const filterButtons = [...document.querySelectorAll('[data-filter]')]
let currentFilter = 'all'

function readTasks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}

let tasks = readTasks()
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }

function visibleTasks() {
  if (currentFilter === 'pending') return tasks.filter((task) => !task.completed)
  if (currentFilter === 'completed') return tasks.filter((task) => task.completed)
  return tasks
}

function taskButton(label, ariaLabel, handler) {
  const button = document.createElement('button')
  button.type = 'button'; button.textContent = label; button.setAttribute('aria-label', ariaLabel)
  button.addEventListener('click', handler)
  return button
}

function renderTasks() {
  taskList.replaceChildren()
  visibleTasks().forEach((task) => {
    const item = document.createElement('li')
    if (task.completed) item.classList.add('completed')
    const check = document.createElement('input')
    check.type = 'checkbox'; check.checked = Boolean(task.completed); check.setAttribute('aria-label', `Concluir tarefa: ${task.text}`)
    check.addEventListener('change', () => updateTask(task.id, { completed: check.checked }))
    const text = document.createElement('span'); text.textContent = task.text
    const actions = document.createElement('div'); actions.className = 'task-actions'
    actions.append(
      taskButton('Editar', `Editar tarefa: ${task.text}`, () => editTask(task)),
      taskButton('Remover', `Remover tarefa: ${task.text}`, () => removeTask(task.id)),
    )
    item.append(check, text, actions); taskList.append(item)
  })
  const count = visibleTasks().length
  status.textContent = count ? `${count} tarefa${count === 1 ? '' : 's'} neste filtro.` : 'Nenhuma tarefa neste filtro.'
}

function updateTask(id, changes) {
  tasks = tasks.map((task) => task.id === id ? { ...task, ...changes } : task)
  saveTasks(); renderTasks()
}

function editTask(task) {
  const updated = window.prompt('Editar tarefa:', task.text)
  if (updated?.trim()) updateTask(task.id, { text: updated.trim() })
}

function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id)
  saveTasks(); renderTasks()
}

function addTask() {
  const text = taskInput.value.trim()
  if (!text) { status.textContent = 'Digite uma tarefa antes de adicionar.'; taskInput.focus(); return }
  tasks.push({ id: crypto.randomUUID(), text, completed: false })
  saveTasks(); taskInput.value = ''; taskInput.focus(); renderTasks()
}

document.getElementById('add-task').addEventListener('click', addTask)
taskInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') addTask() })
filterButtons.forEach((button) => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter
  filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)))
  renderTasks()
}))
renderTasks()
