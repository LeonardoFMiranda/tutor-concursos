# Tutor de Concursos com IA: Prompt do MVP e Tasks

Projeto de portfólio em Next.js. Este arquivo tem duas partes:

1. **Prompt** para colar no Claude Code, Cursor ou similar
2. **Checklist de tasks** por fase para acompanhar o desenvolvimento

---

## 1. Prompt para colar na ferramenta de código

````markdown
# Contexto
Você é um engenheiro sênior de Next.js. Vamos construir o MVP de um **Tutor de Concursos com IA**: uma aplicação web onde o candidato gera questões por matéria/banca, resolve, recebe correção com explicação e conversa com um tutor de IA para tirar dúvidas. O projeto é para portfólio, então priorize código limpo, boa UX e deploy funcionando.

# Stack
- Next.js 15 (App Router) + TypeScript (strict)
- Tailwind CSS + shadcn/ui
- Vercel AI SDK (`ai` + provider configurável via variável de ambiente; nunca fixe o modelo no código, use `AI_MODEL`)
- Zod para validação e schemas de saída estruturada
- Prisma + PostgreSQL (Neon ou Supabase)
- Autenticação com Clerk
- Recharts para gráficos
- Upstash Ratelimit para limitar uso da IA
- Deploy na Vercel

# Funcionalidades do MVP
1. **Autenticação**: login/cadastro, rotas protegidas.
2. **Onboarding**: usuário escolhe concurso-alvo (texto livre), banca (CEBRASPE, FGV, FCC, VUNESP, IBFC, Outra) e matérias de interesse.
3. **Gerar questões**: formulário com matéria, assunto (opcional), banca, dificuldade (fácil/médio/difícil) e quantidade (3 a 10). A IA gera as questões via `generateObject` com schema Zod.
   - Estilo da banca: CEBRASPE usa itens **Certo/Errado**; as demais usam **múltipla escolha A–E**.
4. **Resolver questões**: uma questão por vez, seleciona resposta, confirma, vê na hora se acertou, gabarito e explicação detalhada. Resultado final da sessão ao terminar.
5. **Tutor (chat)**: chat com streaming para tirar dúvidas. Pode ser aberto a partir de uma questão ("Não entendi") e recebe a questão como contexto.
6. **Dashboard**: taxa de acerto geral, por matéria, evolução por dia (últimos 30 dias) e últimas sessões.
7. **Reportar erro**: botão em cada questão para marcar "questão com problema" (a IA pode errar).

# Modelo de dados (Prisma)
- `Profile`: userId, targetExam, banca, subjects (String[])
- `PracticeSession`: id, userId, subject, topic, banca, difficulty, createdAt
- `Question`: id, sessionId, subject, topic, banca, style (MULTIPLE_CHOICE | CERTO_ERRADO), statement, options (Json), correctAnswer, explanation, difficulty, reported (Boolean)
- `Attempt`: id, userId, questionId, selectedAnswer, isCorrect, createdAt
- `Conversation`: id, userId, questionId (opcional), title, createdAt
- `Message`: id, conversationId, role, content, createdAt

# Rotas
- `/` landing simples
- `/onboarding`
- `/dashboard`
- `/praticar` (formulário) e `/praticar/[sessionId]` (resolução)
- `/tutor` e `/tutor/[conversationId]`
- `/api/chat` (Route Handler com streaming)
- Geração de questões via Server Action

# Regras de IA
- **Gerador de questões** (system prompt): "Você é um elaborador de questões de concursos públicos brasileiros. Crie questões originais no estilo da banca informada, com enunciado claro, uma única alternativa correta, distratores plausíveis e explicação que justifique a correta e explique por que as demais estão erradas. Cite o fundamento (lei, artigo, regra gramatical) quando aplicável. Não invente artigos ou jurisprudência; se não tiver certeza, elabore a questão sobre conceitos consolidados."
- **Tutor** (system prompt): "Você é um professor particular para concursos públicos. Explique de forma didática, com exemplos e passo a passo. Use o contexto da questão quando houver. Seja honesto: se não tiver certeza sobre legislação atual, diga e recomende conferir a fonte oficial. Responda em português do Brasil."
- Validar toda saída do modelo com Zod; em caso de falha, tentar novamente uma vez e exibir erro amigável.
- Chave de API só no servidor. Rate limit por usuário nas rotas de IA.

# Padrões de código
- Server Components por padrão; `"use client"` só onde houver interatividade
- Separar lógica em `lib/` (ai, db, validations) e componentes em `components/`
- Estados de loading (skeletons) e de erro em todas as telas
- Responsivo (mobile first)
- Variáveis em `.env.example`

# Como trabalhar
Execute **por fases**, uma de cada vez, e pare ao final de cada fase para eu validar:
0. Setup do projeto
1. Autenticação e banco
2. Onboarding
3. Geração de questões
4. Resolução e correção
5. Tutor com streaming
6. Dashboard
7. Polimento, rate limit e deploy

Antes de começar a Fase 0, liste os arquivos que pretende criar e as dúvidas que tiver.
````

---

## 2. Tasks por fase

### Fase 0: Setup
- [ ] Criar projeto: `npx create-next-app@latest` (TypeScript, Tailwind, App Router, ESLint)
- [ ] Instalar e configurar shadcn/ui
- [ ] Instalar `ai`, o provider escolhido, `zod`, `recharts`, `prisma`, `@prisma/client`
- [ ] Criar `.env.example` e `.env.local` (`AI_MODEL`, chave da API, `DATABASE_URL`, chaves do Clerk, Upstash)
- [ ] Criar repositório no GitHub (garantir `.env*` no `.gitignore`)
- [ ] Definir estrutura de pastas (`app/`, `components/`, `lib/`, `prisma/`)

### Fase 1: Auth e banco
- [ ] Criar banco no Neon ou Supabase
- [ ] Escrever `schema.prisma` com os modelos acima e rodar a primeira migration
- [ ] Criar client do Prisma (`lib/db.ts`) com singleton
- [ ] Configurar Clerk (provider, middleware, páginas de login/cadastro)
- [ ] Proteger `/dashboard`, `/praticar`, `/tutor` e `/onboarding`
- [ ] Layout autenticado com navbar e menu do usuário

### Fase 2: Onboarding
- [x] Página `/onboarding` com formulário (concurso, banca, matérias)
- [x] Validação com Zod
- [x] Server Action para salvar o `Profile`
- [x] Redirecionar para onboarding se o perfil não existir

### Fase 3: Geração de questões
- [x] Definir schema Zod da questão (enunciado, opções, gabarito, explicação)
- [x] Criar `lib/ai/generate-questions.ts` com `generateObject`
- [x] Escrever o system prompt do gerador (com variações CEBRASPE x múltipla escolha)
- [x] Página `/praticar` com formulário (matéria, assunto, banca, dificuldade, quantidade)
- [x] Server Action: gera, salva `PracticeSession` + `Question`s e redireciona
- [x] Loading state durante a geração
- [x] Tratamento de erro e retry

### Fase 4: Resolução
- [x] Página `/praticar/[sessionId]` com uma questão por vez
- [x] Componente de questão (múltipla escolha e certo/errado)
- [x] Ao confirmar: salvar `Attempt`, mostrar acerto/erro, gabarito e explicação
- [x] Barra de progresso da sessão
- [x] Tela de resultado final (acertos, erros, botão para refazer ou nova sessão)
- [x] Botão "Reportar problema" (marca `reported = true`)
- [x] Botão "Não entendi" que abre o tutor com a questão como contexto

### Fase 5: Tutor
- [x] Route Handler `/api/chat` com `streamText`
- [x] System prompt do tutor
- [x] Hook `useChat` na UI com streaming
- [x] Salvar `Conversation` e `Message` no banco
- [x] Sidebar com lista de conversas e rota `/tutor/[conversationId]`
- [x] Injetar contexto da questão quando a conversa vier de uma questão
- [x] Renderizar Markdown nas respostas

### Fase 6: Dashboard
- [x] Query: taxa de acerto geral e por matéria
- [x] Gráfico de evolução dos últimos 30 dias (linha)
- [x] Gráfico de acertos por matéria (barras)
- [x] Lista das últimas sessões com link para revisar
- [x] Estado vazio para quem ainda não resolveu nada

### Fase 7: Polimento e deploy
- [ ] Rate limit nas rotas de IA com Upstash (por usuário)
- [ ] Skeletons, páginas `error.tsx` e `not-found.tsx`
- [ ] Revisar responsividade no celular
- [ ] Aviso visível: "Questões geradas por IA podem conter erros. Confira a legislação oficial."
- [ ] Deploy na Vercel com variáveis de ambiente
- [ ] README com problema, solução, stack, decisões técnicas, prints e GIF
- [ ] Link do projeto no ar no portfólio

---

## 3. Dicas para o desenvolvimento

- **Não peça o projeto inteiro de uma vez.** Cole o prompt e conduza fase por fase; o resultado costuma ser bem melhor.
- **Qualidade das questões é o ponto crítico.** IA erra gabarito e cita artigo inexistente. O botão de reportar e o aviso na tela mostram maturidade e viram ótimo ponto de conversa em entrevista.
- **Nunca suba chaves de API no GitHub.** Use variáveis de ambiente e chame o modelo só no servidor.

## 4. Fora do MVP (próximos passos)

- [ ] Simulados cronometrados
- [ ] Repetição espaçada dos erros
- [ ] Upload de edital para gerar plano de estudos
- [ ] RAG com legislação
