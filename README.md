
# Pokémon Teams API - Desafio Backend NestJS

## 📋 Sobre o projeto

Este projeto é a solução para o desafio técnico da vaga de **Desenvolvedor Backend Júnior**.  
A API foi desenvolvida com **NestJS**, seguindo arquitetura em camadas, boas práticas de código limpo e integração com a **PokéAPI (https://pokeapi.co/)** para consulta de dados oficiais de Pokémon.

A aplicação permite:

- ✅ Gerenciar Treinadores
- ✅ Criar Times de Pokémon por Treinador
- ✅ Adicionar/Remover Pokémon nos times (máximo de 6)
- ✅ Listar os Pokémon de cada time com **enriquecimento de dados da PokéAPI** (nome, tipos, sprite)

## 🚀 Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- PostgreSQL (via Docker)
- TypeORM
- Swagger (OpenAPI)
- Jest (Testes unitários)
- PokéAPI (API externa oficial de Pokémon)

## 🗂️ Estrutura de Pastas (Camadas)

```
src/
├── trainers/          # CRUD de Treinadores
├── teams/             # CRUD de Times (por Treinador)
├── team-pokemons/     # Adição/Listagem/Remoção de Pokémon nos Times
├── pokeapi/           # Serviço de integração com a PokéAPI
├── main.ts            # Bootstrap da aplicação
└── app.module.ts      # Configuração de módulos e TypeORM
```

## 🐳 Como rodar o projeto com Docker (Banco PostgreSQL)

### 1. Subir o banco de dados

```bash
docker-compose up -d
```

👉 **Configuração do banco (porta customizada):**

| Parâmetro | Valor |
|---|---|
| Host | localhost |
| Porta | 5433 |
| User | leany |
| Senha | leany123 |
| Database | leanydb |

## ⚙️ Como rodar o NestJS

### 1. Instalar dependências:

```bash
npm install
```

### 2. Rodar a aplicação:

```bash
npm run start:dev
```

A API estará disponível em:

```
http://localhost:3000
```

## 📑 Acessar o Swagger (Documentação da API)

```
http://localhost:3000/docs
```

A documentação inclui todos os endpoints, DTOs, exemplos e descrições.

## ✅ Funcionalidades principais implementadas

| Funcionalidade | Status |
|---|---|
| CRUD de Treinadores | ✅ |
| CRUD de Times (por Treinador) | ✅ |
| Limite de 6 Pokémon por time | ✅ |
| Validação de Pokémon pela PokéAPI | ✅ |
| Listagem de Pokémon de um time (com nome, tipos e sprite) | ✅ |
| Swagger completo com exemplos nos DTOs | ✅ |
| Testes unitários básicos | ✅ |

## ✅ Testes Unitários (Jest)

### Executar os testes:

```bash
npm run test
```

Testes implementados:

- ✅ TrainersService
- ✅ TeamPokemonsService (incluindo limite de 6 pokémons e integração com PokéAPI mockada)

## 🏗️ Decisões de Arquitetura

- Separação clara por **camadas (Controller → Service → Repository)**
- Criação de um módulo separado para integração com a PokéAPI (**`PokeApiService`**)
- Uso de **DTOs com validação via `class-validator` e documentação Swagger via `@nestjs/swagger`**
- **Tratamento centralizado de erros** com uso de exceções HTTP (`BadRequestException`, `NotFoundException`, etc.)
- **Banco Dockerizado**, isolando ambiente de desenvolvimento
- **Testes unitários com Jest** para garantir a confiabilidade dos principais serviços

## ✅ Como rodar as Migrations (se for usar)

```bash
npm run migration:generate
npm run migration:run
```

## ✅ Contato

**Lucas Gabriel Likes**  
🔗 LinkedIn: [https://www.linkedin.com/in/lucas-gabriel-likes-06a2b9182/](https://www.linkedin.com/in/lucas-gabriel-likes-06a2b9182/)
