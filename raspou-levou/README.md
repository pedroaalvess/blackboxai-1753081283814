# 🎯 Raspou, Levou! - Plataforma de Raspadinhas Online

Uma plataforma completa e funcional para raspadinhas online com sistema de login, depósitos via PIX, jogos interativos e sistema de indicações.

## 🚀 Características

### ✨ Funcionalidades Principais
- **Sistema de Autenticação**: Login e cadastro completo com JWT
- **Depósitos PIX**: Sistema de pagamento com QR Code e tempo limite
- **Raspadinhas Interativas**: 4 tipos diferentes com lógica justa de premiação
- **Painel do Usuário**: Carteira, bônus, entregas, indicações e configurações
- **Sistema de Indicações**: Funcional com links exclusivos e comissões
- **Design Responsivo**: Dark mode com cores neon (verde, azul, laranja)

### 🎲 Tipos de Raspadinhas
1. **PIX na Conta** (R$ 0,50) - Prêmios até R$ 2.000
2. **Sonho de Consumo** (R$ 2,00) - Prêmios até R$ 5.000  
3. **Me Mimei** (R$ 2,50) - Prêmios até R$ 1.000
4. **Super Prêmios** (R$ 5,00) - Prêmios até R$ 20.000

### 👤 Painel do Usuário
- **Minha Carteira**: Saldos, histórico de depósitos e jogos
- **Meus Bônus**: Gestão de bônus disponíveis e resgatados
- **Minhas Entregas**: Acompanhamento de prêmios físicos
- **Indique e Ganhe**: Sistema funcional com link exclusivo
- **Configurações**: Perfil, senha e tema

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** com Express
- **MongoDB** com Mongoose
- **JWT** para autenticação
- **Bcrypt** para hash de senhas
- **QRCode** para geração de PIX

### Frontend
- **React.js** com Vite
- **TailwindCSS** para estilização
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Context API** para gerenciamento de estado

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (v16 ou superior)
- MongoDB (local ou Atlas)
- NPM ou Yarn

### 1. Clone o repositório
```bash
git clone <repository-url>
cd raspou-levou
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/raspou-levou

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_aqui

# Server
PORT=5000

# PIX Payment (configure com seu provedor)
PIX_API_URL=https://api.seuprovedorpix.com
PIX_API_KEY=sua_chave_api_pix
PIX_WEBHOOK_SECRET=seu_webhook_secret

# App Settings
APP_URL=http://localhost:3000
API_URL=http://localhost:5000
```

### 3. Configuração do Frontend

```bash
cd ../frontend
npm install
```

### 4. Executar o Projeto

#### Terminal 1 - Backend:
```bash
cd backend
npm run seed  # Popular raspadinhas no banco
npm run dev   # Iniciar servidor de desenvolvimento
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev   # Iniciar aplicação React
```

### 5. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎮 Como Usar

### 1. Cadastro/Login
- Acesse a aplicação e clique em "Cadastrar"
- Preencha os dados (nome, telefone, email, senha)
- Opcionalmente use um código de indicação
- Faça login com email/telefone e senha

### 2. Fazer Depósito
- Clique em "Depositar" no menu
- Escolha um valor ou digite um personalizado
- Escaneie o QR Code PIX ou copie o código
- Confirme o pagamento (botão de teste disponível)

### 3. Jogar Raspadinhas
- Escolha uma raspadinha na página inicial
- Clique em "Jogar Raspadinha"
- Raspe os 9 quadradinhos clicando neles
- Encontre 3 símbolos iguais para ganhar!

### 4. Sistema de Indicações
- Acesse "Indique e Ganhe" no menu do usuário
- Copie seu link de indicação exclusivo
- Compartilhe com amigos via WhatsApp/Telegram
- Ganhe R$ 10 quando o amigo fizer o primeiro depósito

## 🔧 Scripts Disponíveis

### Backend
```bash
npm start          # Produção
npm run dev        # Desenvolvimento com nodemon
npm run seed       # Popular banco com raspadinhas
```

### Frontend
```bash
npm run dev        # Desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
```

## 📁 Estrutura do Projeto

```
raspou-levou/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seeders/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md
```

## 🎨 Design e Tema

- **Tema**: Dark mode com fundo preto/cinza escuro
- **Cores**: Verde neon (#22c55e), azul vibrante, laranja
- **Tipografia**: Inter (Google Fonts)
- **Responsivo**: Mobile-first design
- **Componentes**: Tailwind CSS com classes customizadas

## 🔐 Segurança

- Senhas hasheadas com bcrypt
- Autenticação JWT com expiração
- Validação de dados no frontend e backend
- Proteção contra ataques comuns
- Sanitização de inputs

## 🎯 Lógica dos Jogos

### Sistema de Probabilidades
Cada raspadinha tem probabilidades configuradas:
- 60-70% chance de não ganhar nada
- 15-25% chance de prêmios pequenos
- 5-10% chance de prêmios médios
- 0.01-1% chance de prêmios grandes

### Mecânica do Jogo
1. Usuário compra raspadinha (saldo é debitado)
2. Sistema gera resultado baseado em probabilidades
3. 9 quadrados são preenchidos com valores
4. Se ganhar: 3 posições têm o mesmo valor premiado
5. Se perder: nenhum valor se repete 3 vezes
6. Prêmio é creditado automaticamente

## 💳 Sistema de Pagamentos

### PIX (BlackCat Pagamentos)
- Integração real com BlackCat Pagamentos
- Geração automática de QR Code PIX
- Tempo limite configurável (padrão: 10 minutos)
- Webhook automático para confirmação de pagamentos
- Chaves de API configuradas e prontas para uso

### Saldos
- **Saldo Padrão**: Depósitos realizados
- **Saldo Prêmios**: Ganhos em jogos
- **Saldo Bônus**: Indicações e promoções

## 🤝 Sistema de Indicações

### Como Funciona
1. Cada usuário tem um código único de 8 caracteres
2. Link de indicação: `/register?ref=CODIGO`
3. Quando indicado faz primeiro depósito:
   - Indicador ganha R$ 10 no saldo bônus
   - Relacionamento é marcado como "ativo"
4. Sem limite de indicações

## 🚀 Deploy

### Backend (Heroku/Railway/DigitalOcean)
1. Configure variáveis de ambiente
2. Configure MongoDB Atlas
3. Configure webhook PIX do provedor
4. Deploy com `npm start`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Configure variáveis de ambiente da API
3. Deploy da pasta `dist/`

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e demonstrativos.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique se MongoDB está rodando
2. Confirme as variáveis de ambiente
3. Execute `npm run seed` para popular dados
4. Verifique logs do console para erros

---

**🎯 Raspou, Levou! - A melhor plataforma de raspadinhas online do Brasil!**
