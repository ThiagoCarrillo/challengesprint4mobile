# OdontoApp

Aplicativo móvel desenvolvido com React Native, TypeScript e Expo, para gerenciamento de planos odontológicos e agendamentos, consumindo dados do Firebase Firestore.

### Integrantes
#### Thiago Carrillo RM553565 
#### Igor Oviedo RM553434
#### Cauã Loureiro RM553093

# Funcionalidades principais

- CRUD completo para agendamentos
- Consulta e seleção de plano odontológico pelo usuário
- Tela de perfil com informações do usuário
- Tela de login com usuário de teste pré-configurado
    - LOGIN: TESTE 
    - SENHA: 1234
- Feedback visual e tratamento de erros
- Interface fluida e responsiva com React Native Paper
- Caso não haja dados no FireStone para Planos ou Usuário, a função do Botão Tente Novamente foi implementada

# O que foi utilizado

- React Native + Expo
- TypeScript
- Firebase Firestore 
- React Native Paper 
- React Navigation

# Pré-requisitos

- Node.js 
- Expo CLI 
- Conta no Firebase com projeto criado e Firestore configurado
- Arquivo firebaseConfig.ts configurado com suas credenciais do Firebase

# Instalação e execução

## Instale as dependências:

- npm install -g expo-cli
- npm install
- npm install @react-navigation/native@^7.1.9 @react-navigation/native-stack@^7.3.13 @react-navigation/stack@^7.3.2 expo@~53.0.9 expo-status-bar@~2.2.3 firebase@^9.23.0 react@19.0.0 react-native@0.79.2 react-native-safe-area-context@^5.4.1 
react-native-screens@~4.10.0 react-native-paper@^5.10.1
- npm install --save-dev @types/react@~19.0.10 typescript@~5.8.3

4. Configure o Firebase/Firestone

- Crie um projeto no Firebase Console 
- Habilite o Firestore Database
- Gere as credenciais e configure o arquivo src/services/firebaseConfig.ts conforme seu projeto

- Crie a coleção users e insira um documento com ID usuarioTeste:
{
  "name": "Usuário Teste",
  "email": "teste@exemplo.com",
  "phone": "(11) 99999-9999",
  "planId": "plano1"
}

- Crie a coleção plans e insira um documento com o ID planosTeste:
{
  "planName": "Plano OdontoPrev Básico",
  "validity": "2025-12-31",
  "coverage": "Limpeza básica, exame simples",
  "contactPhone": "(11) 4002-1234"
}

6. Execute o app no Expo:

- npm expo start

# Uso

- Na tela de login, utilize as credenciais:

  - Usuário: teste
  - Senha: 1234

- Após login, navegue pelas telas para:

  - Consultar, criar, editar e deletar agendamentos
  - Visualizar e selecionar plano odontológico
  - Visualizar e editar perfil do usuário

## Dependências principais

- expo (~53.0.9)
- firebase (^9.23.0)
- react-native-paper (^5.x.x)
- @react-navigation/native (^7.x.x)
- @react-navigation/native-stack (^7.x.x)
- react-native-safe-area-context (^5.x.x)
- react-native-screens (~4.10.0)
- react (19.0.0)
- react-native (0.79.2)
- typescript (~5.8.3)
- @types/react (~19.x.x)

### Observações

- O projeto usa o Firestore para persistência dos dados. Garanta que suas regras de segurança permitam leitura/escrita para testes ou configure autenticação.
- O usuário teste teste com senha 1234 é usado apenas para simulação no login, sem autenticação real no Firebase.
- Para produção,o ideal seria o login com Firebase Auth ou outro método porém falhamos em implementar no projeto.
