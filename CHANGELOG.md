# Changelog

O projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-11-14

### Adicionado

- indicador de progresso de leitura e botão flutuante de retorno ao topo;
- identificação automática da seção ativa na navegação;
- faixa animada de tecnologias e animações progressivas com suporte a movimento reduzido;
- confinamento de foco por teclado no menu móvel.

### Alterado

- cabeçalho passa a ocupar toda a largura com fundo temático estável e estado de rolagem;
- transição entre temas usa a View Transitions API quando disponível;
- navegação e apresentação visual foram aproximadas do portfólio profissional.

### Corrigido

- perda de contraste da navbar clara sobre diferentes regiões da página.

## [1.0.1] - 2026-11-14

### Corrigido

- pequeno estouro horizontal no viewport mobile do Chromium/Linux;
- proteção estrutural para itens flex e grid com conteúdo maior que a coluna.

## [1.0.0] - 2026-11-14

### Adicionado

- catálogo orientado por JSON para projetos, formações, competências e trajetória;
- filtros combináveis e persistidos na URL;
- seis projetos em destaque e 12 repositórios catalogados;
- 14 formações principais publicadas apenas como metadados;
- menu móvel acessível, tema persistente e suporte a movimento reduzido;
- validação automática de dados, links, HTML e JavaScript;
- testes de conteúdo e interface em desktop/mobile, sitemap, robots, favicon e página 404.

### Corrigido

- grid visual da calculadora;
- recurso de imagem inexistente no portfólio histórico;
- inserção insegura de dados no controle de estoque;
- credencial fixa no protótipo de login;
- senhas em texto puro nos exemplos SQL;
- navegação mobile inexistente;
- Todo List sem conclusão, edição e filtros.

### Segurança

- certificados brutos e identificadores pessoais permanecem fora do repositório;
- exemplos SQL usam hashes fictícios e domínios reservados;
- links externos gerados pelo catálogo usam `noopener noreferrer`.
