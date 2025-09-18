# Sistema de Chatbot WhatsApp para Precatórios

Sistema completo de chatbot inteligente para qualificação automática de leads de precatórios via WhatsApp, com CRM integrado e dashboard operacional.

## 🚀 Funcionalidades Principais

### 🤖 Motor de IA Conversacional
- Processamento de linguagem natural com GPT-4/Claude
- Contexto de conversa persistente
- Extração automática de dados (valores, documentos, localização)
- Respostas contextualizadas sobre precatórios

### 📊 Qualificação Inteligente de Leads
- **Sistema de Pontuação Automática**:
  - Possui precatório: +50pts
  - Precatório elegível: +25pts
  - Urgência alta: +15pts
  - Documentos enviados: +10pts

- **Classificação Automática**:
  - 🔥 Hot (80-100pts): Análise imediata
  - 🟡 Warm (50-79pts): Acompanhamento humano
  - 🔵 Cold (20-49pts): Nutrição educativa
  - ❌ Descarte (0-19pts): Informações básicas

### 💼 CRM Integrado
- Pipeline completo: Qualificado → Análise → Proposta → Fechamento
- Gestão de documentos e ofícios requisitórios
- Timeline completa de interações
- Distribuição automática entre vendedores
- Relatórios de conversão e performance

### 📱 Dashboard Operacional
- Monitoramento em tempo real
- Intervenção manual quando necessário
- Analytics e métricas de conversão
- Alertas para leads hot
- Gestão de equipe e permissões

## 🏗️ Arquitetura Técnica

### Stack Principal
- **Backend**: Node.js 20 + Express + TypeScript + Prisma ORM
- **Banco de Dados**: PostgreSQL 15 + Redis 7
- **Frontend**: React 18 + TypeScript + Ant Design
- **IA**: OpenAI GPT-4 / Anthropic Claude
- **WhatsApp**: Evolution API v2
- **Infraestrutura**: Docker + Nginx + PM2

### Componentes do Sistema
```
┌─────────────────────────────────────────────────────────────┐
│                    LOAD BALANCER (NGINX)                    │
└─────────────────────────────────────────────────────────────┘
           │                          │                        
┌──────────▼─────────┐      ┌─────────▼─────────────────────┐
│   FRONTEND (React) │      │     API GATEWAY (Express)     │
│   - Dashboard      │      │     - Rate Limiting          │
│   - Real-time UI   │      │     - Authentication         │
└────────────────────┘      └─────────────┬─────────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
┌───────▼────────┐              ┌─────────▼──────────┐              ┌──────▼──────┐
│  WHATSAPP      │              │   CORE SERVICES    │              │   AI ENGINE │
│  SERVICE       │◄────────────►│   - Conversation   │◄────────────►│   - NLP     │
│  (Evolution)   │              │   - Lead Mgmt      │              │   - Context │
└────────────────┘              │   - CRM            │              │   - Scoring │
                                └────────────────────┘              └─────────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        │                 │                 │
                ┌───────▼────────┐ ┌──────▼──────┐ ┌───────▼────────┐
                │   POSTGRESQL   │ │    REDIS    │ │   FILE STORAGE │
                │   - Core Data  │ │   - Cache   │ │   - Documents  │
                │   - Analytics  │ │   - Session │ │   - Media      │
                └────────────────┘ └─────────────┘ └────────────────┘
```

## 🚦 Primeiros Passos

### Pré-requisitos
- Node.js 20+ 
- Docker e Docker Compose
- PostgreSQL 15+
- Redis 7+
- Conta OpenAI ou Anthropic
- Evolution API configurada

### 1. Configuração do Ambiente

```bash
# Clone o repositório
git clone <repository-url>
cd precatorios-chatbot

# Configure as variáveis de ambiente
cp apps/api/.env.example apps/api/.env
# Edite o arquivo .env com suas configurações
```

### 2. Instalação com Docker (Recomendado)

```bash
# Instalar dependências
npm install

# Iniciar containers de desenvolvimento
npm run docker:dev

# Executar migrações do banco
npm run db:migrate

# Executar seed inicial
npm run db:seed
```

### 3. Instalação Manual

```bash
# Instalar dependências
npm install
cd apps/api && npm install
cd ../web && npm install
cd ../..

# Configurar banco de dados
npm run db:generate
npm run db:migrate
npm run db:seed

# Iniciar desenvolvimento
npm run dev
```

### 4. Configuração da Evolution API

1. Configure sua instância da Evolution API
2. Adicione as credenciais no `.env`:
```env
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=sua-chave-aqui
EVOLUTION_INSTANCE_NAME=precatorios-bot
```

### 5. Configuração da IA

**Para OpenAI:**
```env
OPENAI_API_KEY=sua-chave-openai
OPENAI_MODEL=gpt-4-turbo-preview
```

**Para Anthropic Claude:**
```env
ANTHROPIC_API_KEY=sua-chave-anthropic
ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

## 📊 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia API e Frontend
npm run dev:api      # Inicia apenas API
npm run dev:web      # Inicia apenas Frontend
```

### Build e Deploy
```bash
npm run build        # Build completo
npm run build:api    # Build API
npm run build:web    # Build Frontend
```

### Banco de Dados
```bash
npm run db:migrate   # Executa migrações
npm run db:generate  # Gera cliente Prisma
npm run db:seed      # Popula dados iniciais
npm run db:studio    # Abre Prisma Studio
```

### Testes e Qualidade
```bash
npm run test         # Executa todos os testes
npm run lint         # Verifica código
npm run lint:fix     # Corrige problemas automaticamente
```

### Docker
```bash
npm run docker:dev   # Ambiente de desenvolvimento
npm run docker:prod  # Ambiente de produção
```

## 🔧 Configurações do Sistema

### Parâmetros de Scoring
- `LEAD_SCORE_HAS_PRECATORIO=50`
- `LEAD_SCORE_ELIGIBLE=25`
- `LEAD_SCORE_HIGH_URGENCY=15`
- `LEAD_SCORE_HAS_DOCUMENTS=10`

### Thresholds de Classificação
- `LEAD_SCORE_HOT_THRESHOLD=80`
- `LEAD_SCORE_WARM_THRESHOLD=50`
- `LEAD_SCORE_COLD_THRESHOLD=20`

## 📁 Estrutura do Projeto

```
precatorios-chatbot/
├── apps/
│   ├── api/                    # Backend Node.js + Express
│   │   ├── src/
│   │   │   ├── controllers/    # Controladores das rotas
│   │   │   ├── services/       # Lógica de negócio
│   │   │   ├── middleware/     # Middlewares Express
│   │   │   ├── routes/         # Definição das rotas
│   │   │   └── utils/          # Utilitários
│   │   ├── prisma/             # Schema e migrações
│   │   └── tests/              # Testes da API
│   │
│   └── web/                    # Frontend React
│       ├── src/
│       │   ├── components/     # Componentes reutilizáveis
│       │   ├── pages/          # Páginas da aplicação
│       │   ├── services/       # Integração com API
│       │   ├── store/          # Gerenciamento de estado
│       │   └── utils/          # Utilitários frontend
│       └── tests/              # Testes do frontend
│
├── libs/                       # Bibliotecas compartilhadas
│   ├── shared-types/           # Types TypeScript
│   ├── database/               # Utilitários de banco
│   ├── whatsapp/              # Integração WhatsApp
│   └── auth/                   # Autenticação
│
├── docker/                     # Configurações Docker
│   ├── nginx/                  # Proxy reverso
│   ├── postgres/              # Banco de dados
│   └── redis/                 # Cache
│
└── docs/                       # Documentação
    ├── api/                    # Docs da API
    ├── deployment/             # Guias de deploy
    └── architecture/           # Diagramas
```

## 🛡️ Segurança

### Implementações de Segurança
- ✅ Autenticação JWT com refresh tokens
- ✅ Rate limiting por IP e endpoint
- ✅ Validação de entrada com Joi
- ✅ Headers de segurança (Helmet.js)
- ✅ CORS configurado
- ✅ Criptografia de senhas (bcrypt)
- ✅ Validação de webhooks
- ✅ Upload seguro de arquivos

### Conformidade LGPD
- ✅ Consentimento de dados
- ✅ Anonymização de dados
- ✅ Políticas de retenção
- ✅ Logs de auditoria

## 📈 Roadmap de Desenvolvimento

### ✅ Fase 1: Fundação (4-6 semanas)
- [x] Configuração da infraestrutura
- [x] Sistema de autenticação
- [x] Integração WhatsApp básica
- [x] Dashboard MVP

### 🔄 Fase 2: IA e Qualificação (4-5 semanas)
- [ ] Motor de IA conversacional
- [ ] Sistema de scoring automático
- [ ] Classificação inteligente de leads
- [ ] Automações básicas

### ⏳ Fase 3: CRM Avançado (4-5 semanas)
- [ ] Pipeline de vendas completo
- [ ] Gestão de documentos
- [ ] Timeline de interações
- [ ] Distribuição de leads

### ⏳ Fase 4: Analytics e Otimização (3-4 semanas)
- [ ] Dashboard de métricas
- [ ] Relatórios avançados
- [ ] Configurações personalizáveis
- [ ] Otimizações de performance

### ⏳ Fase 5: Produção (2-3 semanas)
- [ ] Deploy em produção
- [ ] Monitoramento avançado
- [ ] Backup e disaster recovery
- [ ] Documentação final

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💬 Suporte

Para suporte técnico ou dúvidas sobre implementação, entre em contato:
- 📧 Email: suporte@precatorios.com
- 💬 WhatsApp: (11) 99999-9999

## 🎯 Métricas de Sucesso

### KPIs Principais
- **Taxa de Conversão**: Lead → Cliente (meta: >15%)
- **Tempo de Resposta**: < 2 segundos para 95% das mensagens
- **Qualidade do Lead**: >80% dos leads "Hot" se tornam oportunidades reais
- **Redução de Custo**: 60% redução vs. métodos tradicionais
- **Satisfação**: NPS > 70

---

**🚀 Sistema desenvolvido com foco em escalabilidade, performance e experiência do usuário.**