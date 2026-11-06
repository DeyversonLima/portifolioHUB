const STORAGE_KEY = 'portfolio-hub:todo-list'
const taskInput = document.getElementById('new-task')
const taskList = document.getElementById('task-list')
const status = document.getElementById('task-status')

function readTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

let tasks = readTasks()

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function renderTasks() {
  taskList.replaceChildren()

  tasks.forEach((task) => {
    const item = document.createElement('li')
    const text = document.createElement('span')
    const removeButton = document.createElement('button')

    text.textContent = task.text
    removeButton.type = 'button'
    removeButton.textContent = 'Remover'
    removeButton.setAttribute('aria-label', `Remover tarefa: ${task.text}`)
    removeButton.addEventListener('click', () => {
      tasks = tasks.filter((itemToKeep) => itemToKeep.id !== task.id)
      saveTasks()
      renderTasks()
      status.textContent = 'Tarefa removida.'
    })

    item.append(text, removeButton)
    taskList.append(item)
  })

  if (tasks.length === 0) status.textContent = 'Nenhuma tarefa cadastrada.'
}

function addTask() {
  const text = taskInput.value.trim()
  if (!text) {
    status.textContent = 'Digite uma tarefa antes de adicionar.'
    taskInput.focus()
    return
  }

  tasks.push({ id: crypto.randomUUID(), text })
  saveTasks()
  renderTasks()
  taskInput.value = ''
  taskInput.focus()
  status.textContent = 'Tarefa adicionada.'
}

document.getElementById('add-task').addEventListener('click', addTask)
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTask()
})

renderTasks()
