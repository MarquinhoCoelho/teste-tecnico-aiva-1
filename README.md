# Sistema de Gestão de Produtos e Usuários

Este projeto é uma aplicação web desenvolvida com React e TypeScript, focada em gestão de produtos e usuários, com interface moderna, autenticação e navegação eficiente.

Acesse: [https://teste-tecnico-aiva-1.vercel.app/sign-in]

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router
- Zustand (gerenciamento de estado)
- SWR (data fetching)
- Tailwind CSS
- ESLint + Prettier
- Husky + lint-staged

## 📋 Pré-requisitos

- Node.js v20 (recomendado usar nvm)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o projeto:
```bash
npm start
```

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier

## 📦 Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── configs/        # Configurações (rotas, navegação)
  ├── constants/      # Constantes e enums
  ├── hooks/          # Custom hooks
  ├── pages/          # Páginas da aplicação
  ├── services/       # Serviços e APIs
  ├── store/          # Gerenciamento de estado
  ├── types/          # Tipos TypeScript
  └── utils/          # Funções utilitárias
```

## 🎯 Funcionalidades

- Autenticação de usuários (login/logout)
- Dashboard com listagem de produtos
- CRUD completo de produtos
- CRUD de usuários
- Página de detalhes do produto
- Interface responsiva e moderna
- Feedback visual (loading, estados vazios, erros)
- Persistência de sessão do usuário
- Controle de permissões por perfil

## 💡 Diferenciais

- Utilização de Zustand para gerenciamento global de estado
- SWR para busca eficiente de dados
- Estrutura modular e escalável
- Código limpo, padronizado e fácil de manter

## 🔍 Por que Vite?

O Vite foi escolhido por oferecer:
- Inicialização rápida do servidor de desenvolvimento
- Hot Module Replacement (HMR) eficiente
- Build otimizado para produção
- Suporte nativo a TypeScript
- Menor overhead de configuração
- Só usaria o Next se for um projeto onde a maior parte dos usuários usa celular, ou para sistemas como por exemplo de varejo que precisam da maior performance possível

## 🚀 Deploy

A aplicação pode ser facilmente publicada em qualquer serviço de hospedagem de aplicações front-end modernas.
Está rodando na vercel[https://teste-tecnico-aiva-1.vercel.app/sign-in]

## Autor: Marcos Coelho
