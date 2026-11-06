const display = document.getElementById('display')

function appendToDisplay(value) {
  if (display.value === 'Erro') display.value = ''
  display.value += value
}

function clearDisplay() {
  display.value = ''
}

function back() {
  display.value = display.value.slice(0, -1)
}

function applyOperation(values, operators) {
  const right = values.pop()
  const left = values.pop()
  const operator = operators.pop()

  if (left === undefined || right === undefined) throw new Error('Expressão inválida')
  if (operator === '+') values.push(left + right)
  if (operator === '-') values.push(left - right)
  if (operator === '*') values.push(left * right)
  if (operator === '/') {
    if (right === 0) throw new Error('Divisão por zero')
    values.push(left / right)
  }
}

function evaluateExpression(expression) {
  const tokens = expression.match(/\d+(?:\.\d+)?|[+\-*/]/g) || []
  if (!expression || tokens.join('') !== expression) throw new Error('Expressão inválida')

  const values = []
  const operators = []
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 }

  tokens.forEach((token, index) => {
    if (index % 2 === 0) {
      const value = Number(token)
      if (!Number.isFinite(value)) throw new Error('Número inválido')
      values.push(value)
      return
    }

    while (operators.length && precedence[operators.at(-1)] >= precedence[token]) {
      applyOperation(values, operators)
    }
    operators.push(token)
  })

  while (operators.length) applyOperation(values, operators)
  if (values.length !== 1) throw new Error('Expressão inválida')
  return values[0]
}

function calculate() {
  try {
    display.value = String(evaluateExpression(display.value))
  } catch {
    display.value = 'Erro'
  }
}

document.addEventListener('keydown', (event) => {
  if (/^[0-9.+\-*/]$/.test(event.key)) appendToDisplay(event.key)
  if (event.key === 'Enter' || event.key === '=') calculate()
  if (event.key === 'Backspace') back()
  if (event.key === 'Escape') clearDisplay()
})

window.appendToDisplay = appendToDisplay
window.clearDisplay = clearDisplay
window.back = back
window.calculate = calculate
