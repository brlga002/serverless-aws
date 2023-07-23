# Cervejeira API

A Cervejeira API é um microserviço para gerenciar estilos de cerveja e recomendar o estilo mais adequado com base na temperatura fornecida.

## Funcionalidades

- Listar estilos de cerveja
- Cadastrar novos estilos de cerveja
- Atualizar informações de um estilo de cerveja existente
- Excluir um estilo de cerveja
- Encontrar o estilo de cerveja mais adequado para uma determinada temperatura e obter uma playlist relacionada a esse estilo
- CRUD de usuários
- Autenticação de usuários

## Tecnologias utilizadas

- Node.js
- TypeScript
- Middy
- Inversify
- Jest
- Zod
- MongoDB
- Spotify API
- Seed
- AWS

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js (versão nodejs16.x)
- Usuario capaz de fazer deploy na aws segue links de ajuda:
  - [Create an AWS account](https://sst.dev/chapters/create-an-aws-account.html)
  - [Create an IAM user](https://sst.dev/chapters/create-an-iam-user.html)
  - [Configure the AWS CLI](https://sst.dev/chapters/configure-the-aws-cli.html)

## Instalação

1. Clone este repositório:

```bash
git clone git@github.com:brlga002/karhub.git
```

2. Acesse o diretório do projeto:

```bash
cd karhub
```

3. Instale as dependências do projeto:

```bash
npm install
```

4. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:

```
MONGO_URI=mongodb+srv://gabriellima1000:LhnnnvTRhbgSzm0n@cluster0.zafg75x.mongodb.net/KarhubService
JWT_APPLICATION_KEY="X400ftawaOPXDhF6FvLbHTVUy"
SPOTIFY_CLIENT_ID='ac95e78b2253443e9e2a75cbc97a88a2'
SPOTIFY_CLIENT_SECRET='cf64c8fce8f049f389040648ee8f2698'
```

5. Inicie o servidor:

```bash
npm run dev
```

Apos iniciar o sevidor e apresentado no console as urls da api e swagger:

```bash
ApiEndpoint: https://bcbxfoox4b.execute-api.us-east-1.amazonaws.com
SwaggerUrl: https://d55gp2ajpl0ne.cloudfront.net
```

## Uso

A API oferece documentação com Swagger.

Apos iniciar o sevidor e apresentado no console as urls da api e swagger:

```bash
ApiEndpoint: https://bcbxfoox4b.execute-api.us-east-1.amazonaws.com
SwaggerUrl: https://d55gp2ajpl0ne.cloudfront.net
```

### Rotas existem rotas públicas e privadas na API:

O cadeado indica se é uma rota privada. É necessário um token JWT (JSON Web Token) para acessar as rotas protegidas da API.

![Rota para listar os estilos de cerveja](assets/routes.png)

Rota para acessar o tipo de cerveja e playlist:

![Rota para acessar o tipo de cerveja e playlist](assets/beer-style.png)

Use o e-mail e senha defalt ou crie seu usuário para fazer login e obter um token:

![Rota para obter um token](assets/get-token.png)

Informe o token para autorização no Swagger:

![Autorização no Swagger](assets/authorize.png)

## Deploy Automático na AWS

O deploy é feito automaticamente na AWS toda vez que há alteração nas branches do GitHub através do [Seed](https://console.seed.run).

### Git Flow nas branches

O Git Flow é um modelo de fluxo de trabalho baseado no Git que define uma estrutura clara para o controle de versão de um projeto. Ele usa branches específicas, como "master" e "develop", para gerenciar o ciclo de vida do software, facilitando o desenvolvimento colaborativo, a implantação controlada de versões e a organização das alterações realizadas no código-fonte. Com o Git Flow, equipes de desenvolvimento podem manter um histórico organizado, revisar e testar alterações antes da integração e garantir um fluxo consistente de desenvolvimento.

### Ambiente de Produção

A branch master é publicada para produção [swagger](https://d2ahd6am0gur0x.cloudfront.net) e [Api](https://bcbxfoox4b.execute-api.us-east-1.amazonaws.com)

### Ambiente de Homologação

A branch develop é usada para ambiente de homologação [Swagger](https://d3aogf016ol1wk.cloudfront.net) e [Api](https://p58im53gba.execute-api.us-east-1.amazonaws.com)

### Teste no Deploy

O deploy automático requer que todos os testes sejam aprovados.

### Deploy manual direto do VSCODE

Você também pode fazer o deploy diretamente para a AWS com o comando:

```bash
npm run deploy
```

## Testes

Para executar os testes unitários:

```bash
npm run test
```

Para verificar erros de TypeScript:

```bash
npm run typecheck
```

Há um script no GitHub que executa testes para as Pull Requests, garantindo que nenhuma alteração seja mesclada sem testes.

## Arquitetura do projeto

### Clean Architecture

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

Clean Architecture é um estilo de arquitetura de software que enfatiza a separação de preocupações em camadas bem definidas, promovendo a modularidade, testabilidade e manutenibilidade do sistema. Com a ênfase na independência das regras de negócio das tecnologias e frameworks utilizados, essa abordagem permite a construção de sistemas flexíveis, escaláveis e de alta qualidade.

### Organização das pastas

A comunicação das camadas é feita com o princio da "injeção de dependência"

- 0-core
- 1-domain
- 2-application
- 3-interfaces
- 4-framework

### Inversify

Inversify é um contêiner de injeção de dependência para JavaScript/TypeScript que permite a criação de um código mais modular e desacoplado. Com o Inversify, é possível definir e gerenciar as dependências entre os diferentes componentes de um sistema de forma fácil e flexível. Isso promove a reutilização de código, facilita a manutenção e testabilidade, além de melhorar a escalabilidade e a legibilidade do código. O Inversify oferece uma maneira elegante e poderosa de aplicar o princípio de inversão de dependência em projetos JavaScript/TypeScript [Leia sobre](https://inversify.io).

### Lambda Authoriser

Aproteção das rotas é feita por um Lambda authorizer que valida as requisições antes de chegar na aplicação [Leia sobre](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html).

Caso a requisição seja autorizada as informações do usuário presente no token são adcionados na requisição.

### Middy

"Middy" é um framework de middleware para Node.js que facilita a construção de aplicativos serverless com AWS Lambda. Ele fornece um conjunto de middlewares pré-construídos que podem ser facilmente adicionados às funções do Lambda, permitindo a execução de tarefas comuns, como validação de entrada, tratamento de erros, logging, autenticação e muito mais. O "Middy" é altamente flexível e extensível, permitindo que você adicione seus próprios middlewares personalizados ou aproveite os existentes da comunidade. Com o "Middy", você pode simplificar o desenvolvimento de funções Lambda, tornando-as mais legíveis, reutilizáveis e fáceis de dar manutenção [Leia sobre](https://middy.js.org/).

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
