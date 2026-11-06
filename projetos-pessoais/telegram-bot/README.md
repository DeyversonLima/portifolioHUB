# Telegram Bot

Bot educacional em Python que responde aos comandos `/start` e `/help` e repete mensagens de texto. O projeto usa a API assíncrona do `python-telegram-bot` 20.

## Executar

Requisitos: Python 3.10 ou superior e um token criado pelo [BotFather](https://t.me/BotFather).

```bash
git clone https://github.com/DeyversonLima/portifolioHUB.git
cd portifolioHUB/projetos-pessoais/telegram-bot
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Defina o token somente no ambiente:

```bash
export TELEGRAM_BOT_TOKEN="seu-token"
python bot.py
```

No PowerShell:

```powershell
$env:TELEGRAM_BOT_TOKEN="seu-token"
python bot.py
```

Nunca coloque o token diretamente no código ou em commits. Se um token for exposto, revogue-o imediatamente no BotFather.

## Escopo

Este é um exemplo mínimo de polling. Um bot de produção precisaria de logs estruturados, tratamento de falhas, testes, limites de uso e uma estratégia segura de deploy.
