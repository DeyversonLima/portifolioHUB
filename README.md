# portifolioHUB

[![CI](https://github.com/DeyversonLima/portifolioHUB/actions/workflows/ci.yml/badge.svg)](https://github.com/DeyversonLima/portifolioHUB/actions/workflows/ci.yml)

Arquivo navegável de projetos acadêmicos, experimentos pessoais e documentação produzidos durante a formação de Deyverson Lima em Engenharia de Software.

**Hub:** [deyversonlima.github.io/portifolioHUB](https://deyversonlima.github.io/portifolioHUB/)

## Por que este repositório existe

O `portifolioHUB` preserva exercícios menores que não justificam um repositório isolado, mas registram evolução em interface, JavaScript, SQL, automação e documentação. O site da raiz funciona como índice pesquisável para esses materiais.

## Conteúdo

```text
projetos-academicos/
├── calculadora-web/     # calculadora com teclado e parser de expressões
├── controle-estoque/    # interface e modelo SQL
├── experimento-sql/     # criação, inserções e consultas
└── sistema-login/       # protótipo de validação de formulário
projetos-pessoais/
├── site-portifolio/     # versão histórica do portfólio
├── telegram-bot/        # experimento de automação em Python
└── todo-list/           # lista de tarefas no navegador
documentacao/            # relatórios, cronograma e guia de Git
```

## Executar

O hub e os projetos web são estáticos:

```bash
git clone https://github.com/DeyversonLima/portifolioHUB.git
cd portifolioHUB
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Funcionalidades do hub

- busca instantânea por projeto ou tecnologia;
- tema claro/escuro persistido no navegador;
- navegação responsiva e acessível por teclado;
- links diretos para demonstrações e documentação;
- apresentação clara do status de cada item: executável, protótipo ou código.

## Qualidade

```bash
find . -name '*.js' -print0 | xargs -0 -n1 node --check
```

A calculadora possui um parser restrito para as quatro operações e não usa `eval`. O CI valida a sintaxe JavaScript dos projetos a cada alteração.

## Contexto

Este repositório inclui trabalhos em diferentes estágios de maturidade. Eles são apresentados como registros de aprendizado, não como produtos de produção. Projetos maiores e mais recentes ficam em repositórios próprios no [perfil do GitHub](https://github.com/DeyversonLima).
