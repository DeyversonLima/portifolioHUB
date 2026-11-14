# Portfólio HUB

[![CI](https://github.com/DeyversonLima/portifolioHUB/actions/workflows/ci.yml/badge.svg)](https://github.com/DeyversonLima/portifolioHUB/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.1-35D58A)](CHANGELOG.md)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-35D58A?logo=github)](https://deyversonlima.github.io/portifolioHUB/)

Catálogo profissional e pesquisável de projetos, formações, certificações e registros de aprendizagem de Deyverson Lima em Engenharia de Software.

**Site:** [deyversonlima.github.io/portifolioHUB](https://deyversonlima.github.io/portifolioHUB/)

## Objetivo

O Hub complementa o [portfólio profissional](https://deyversonlima.github.io/) com evidências técnicas detalhadas. O site principal apresenta um resumo para recrutadores; este repositório preserva contexto, código, documentação, projetos acadêmicos e evolução.

## Recursos

- 12 repositórios atuais catalogados;
- seis projetos em destaque;
- busca e filtros combináveis por área, tipo e status;
- catálogo de formações sem exposição de documentos pessoais;
- competências ligadas a evidências reais;
- linha do tempo de evolução;
- arquivo de exercícios acadêmicos;
- tema claro/escuro persistente;
- menu móvel com suporte a teclado e `Esc`;
- conteúdo orientado por JSON;
- SEO, dados estruturados, sitemap e página 404;
- CI com validação de HTML, JavaScript, dados, links e testes.

## Executar localmente

Requer Node.js 22 ou Python 3.

```powershell
git clone https://github.com/DeyversonLima/portifolioHUB.git
cd portifolioHUB
python -m http.server 8000
```

Acesse `http://localhost:8000`. O servidor local é necessário porque o navegador bloqueia o carregamento dos JSONs quando o HTML é aberto diretamente como `file://`.

## Desenvolvimento e testes

```powershell
npm install
npx playwright install chromium
npm run check
npm audit
```

Comandos individuais:

```powershell
npm run validate:data
npm run validate:links
npm run lint:js
npm run lint:html
npm test
npm run test:e2e
```

## Atualizar o catálogo

O conteúdo não deve ser duplicado no HTML. Atualize os arquivos em `data/`:

```text
data/
├── projects.json
├── certifications.json
├── skills.json
├── timeline.json
└── archive.json
```

Depois, execute `npm run check`. O validador rejeita IDs duplicados, campos obrigatórios ausentes, status desconhecidos e referências locais quebradas.

## Privacidade dos certificados

Os PDFs originais permanecem fora do repositório. O site publica somente:

- curso;
- instituição;
- ano;
- categoria;
- tipo de formação.

Uma credencial completa só deve ser vinculada quando houver URL oficial de validação e nenhum dado pessoal indevido. CPF, matrícula, assinatura, QR Code privado e arquivos locais nunca devem entrar no Git.

## Estrutura

```text
assets/css/             design system e responsividade
assets/js/              dados, filtros, renderização e navegação
assets/images/          recursos visuais do Hub
data/                   catálogos estruturados
scripts/                validação de conteúdo e links
tests/                  testes automatizados
projetos-academicos/    demonstrações e exercícios preservados
projetos-pessoais/      experimentos históricos
documentacao/           materiais e roadmap
```

## Escopo das demonstrações

Os projetos do arquivo acadêmico são estudos, não serviços de produção. O login é apenas uma simulação de validação visual; o estoque funciona localmente e não se conecta ao SQL; os laboratórios de cibersegurança devem ser executados somente em ambientes isolados e autorizados.

## Segurança

Consulte [SECURITY.md](SECURITY.md). Não abra uma issue pública contendo tokens, documentos pessoais ou detalhes de uma vulnerabilidade não corrigida.

## Versionamento

O projeto segue SemVer. A versão `1.0.0` representa a primeira edição profissional do Hub orientada por dados; a `1.0.1` corrige compatibilidade responsiva entre navegadores. Consulte [CHANGELOG.md](CHANGELOG.md).

## Licença

O código-fonte está sob a [licença MIT](LICENSE). Certificados, documentos acadêmicos e conteúdo pessoal não são relicenciados para reutilização.
