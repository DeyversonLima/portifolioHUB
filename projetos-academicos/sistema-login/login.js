const form = document.getElementById('loginForm')
const message = document.getElementById('form-message')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value
  if (username.length < 3 || password.length < 6) {
    message.className = 'message error'
    message.textContent = 'Use ao menos 3 caracteres no usuário e 6 na senha demonstrativa.'
    return
  }
  message.className = 'message success'
  message.textContent = 'Campos validados. Em um sistema real, os dados seriam enviados com HTTPS para um servidor seguro.'
  form.reset()
})
