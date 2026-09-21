# Tutor de Concursos

**Tutor de Concursos** é uma plataforma educacional para candidatos a concursos públicos. Ela utiliza Inteligência Artificial (LLMs) para gerar questões inéditas simulando o estilo de bancas brasileiras (como CEBRASPE e FGV) e atua como um tutor particular para explicar conceitos, leis e regras gramaticais em tempo real.

O projeto foi construído do zero focando em uma interface que remete à identidade visual do sistema Gov.br (sóbria e institucional).

## 🚀 Funcionalidades

- **Onboarding Personalizado:** O usuário define seu objetivo, as disciplinas de interesse e a banca examinadora foco.
- **Geração de Questões Inéditas:** Usando IA para criar questões (Múltipla Escolha ou Certo/Errado) focadas em tópicos específicos solicitados.
- **Sessão de Prática:** Interface focada, semelhante aos principais sites de questões, sem distrações. Feedback instantâneo com explicações detalhadas geradas pela IA e referências a leis/doutrinas.
- **Tutor Particular:** Chatbot acoplado à sessão. O usuário pode clicar em "Não Entendi" e debater a questão com um tutor virtual.
- **Dashboard de Evolução:** Gráficos interativos (via Recharts) mostrando a taxa de acertos global, por matéria e evolução nos últimos 30 dias.
- **Autenticação:** Gerenciamento seguro de usuários via Clerk.
- **Rate Limiting:** Proteção contra abusos via Upstash Redis.

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Tokens customizados em Vanilla CSS
- **Banco de Dados:** PostgreSQL hospedado no [Supabase](https://supabase.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Inteligência Artificial:** [Vercel AI SDK 7.0](https://sdk.vercel.ai/) usando o modelo `llama-3.3-70b-versatile` (via provedor Groq).
- **Autenticação:** [Clerk](https://clerk.com/)
- **Rate Limiting:** [Upstash Redis](https://upstash.com/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Ícones:** [Phosphor Icons](https://phosphoricons.com/)

## ⚙️ Como rodar o projeto localmente

1. Clone este repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   # AI
   AI_MODEL=groq/llama-3.3-70b-versatile
   GROQ_API_KEY=sua_chave_aqui

   # Banco de Dados
   DATABASE_URL=sua_connection_string
   DIRECT_URL=sua_connection_string_direta

   # Clerk (Autenticação)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

   # Upstash (Opcional - Rate Limiting)
   UPSTASH_REDIS_REST_URL=sua_url
   UPSTASH_REDIS_REST_TOKEN=seu_token
   ```
4. Atualize o banco de dados:
   ```bash
   npm run db:push
   ```
5. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🧩 Decisões Técnicas e Desafios

- **Migração do Vercel AI SDK:** Durante o desenvolvimento, enfrentamos as quebras de contrato da versão 4 para a 5 do pacote React do AI SDK (e v7 do Core). Foi necessário adaptar o `useChat` para a nova assinatura (uso da propriedade `transport` e conversão de `initialMessages` de string pura para array estruturado com `parts`).
- **Geração de JSON Determinística:** Para garantir que a IA sempre retorne um Array de Questões sem quebrar o parser (JSON malformado), utilizamos o método `generateObject` tipado com `Zod`, além de um prompt system fortificado focado no estilo das bancas brasileiras.
- **Identidade Visual:** Optamos por não usar bibliotecas de componentes prontas (como Shadcn) e focar na construção manual das classes com CSS Variables e Tailwind, permitindo a aderência exata ao Design System de sites do Governo Federal (fontes seguras, cores sóbrias e botões bem definidos).

## 📄 Licença

Projeto desenvolvido para fins de portfólio.
