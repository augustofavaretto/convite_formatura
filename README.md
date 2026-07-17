# 🎓 Convite de Formatura — Augusto Favaretto

Convite digital mobile-first para a formatura em Ciência da Computação, com tema
"gala + programação": animação de boot estilo terminal (com chuva de código e
barra de progresso), foto de capa com convite formal, contagem regressiva,
roteiro com mapas, chat de dúvidas com respostas prontas, presente via Pix e
confirmação de presença (RSVP) gravada no Supabase — incluindo quem responde
"Não vou".

**Stack:** React 18 · TypeScript · Vite · CSS Modules · Supabase (Postgres)

## 1. Rodar localmente

```bash
npm install
cp .env.example .env   # preencha com os dados do seu projeto Supabase
npm run dev
```

O site abre em `http://localhost:5173`. Sem o `.env` preenchido o site funciona
normalmente (inclusive o chat, que é 100% local), mas o RSVP mostra um aviso de
banco não configurado ao enviar.

### Pré-visualizar as telas de resposta sem banco

- Confirmado: `http://localhost:5173/?rsvp=confirmado&nome=Augusto#rsvp`
- Não vou: `http://localhost:5173/?rsvp=recusado&nome=Maria#rsvp`

## 2. Onde editar os dados do evento

Tudo que é editável está em [`src/config.ts`](src/config.ts): nome, data
(incluindo o ISO usado na contagem e no evento de calendário), os três locais
(colação, jantar e baile — com fotos, endereços e mapas), chave Pix, WhatsApp,
as perguntas/respostas do chat (`faq`) e as linhas do boot.

As fotos usadas no site ficam em [`public/fotos/`](public/fotos/) e os ícones
dos apps de mapa em [`public/icones/`](public/icones/).

## 3. Chat de dúvidas (sem API)

O chat "AugustoIA" responde **somente com as perguntas cadastradas** no `faq`
do `config.ts` — os visitantes tocam nos chips e a resposta local aparece na
hora. Não há campo de texto livre nem chamadas a APIs de IA, então não existe
nenhuma chave para configurar e nenhum custo. Para adicionar uma pergunta nova,
basta incluir um item `{ q, chip, a }` no array `faq`.

## 4. Configurar o Supabase (para o RSVP)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Instale a CLI (`npm i -g supabase`) e vincule o projeto:

   ```bash
   supabase login
   supabase link --project-ref SEU_PROJECT_REF
   ```

3. Aplique as migrations (criam a tabela `confirmacoes` com RLS e a coluna
   `vai` que registra o "Não vou"):

   ```bash
   supabase db push
   ```

   Ou cole o conteúdo dos arquivos de
   [`supabase/migrations/`](supabase/migrations/) no SQL Editor do painel.

4. Copie a **URL** e a **anon key** (Settings → API) para o seu `.env`:

   ```
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=...
   ```

### Como ver as respostas

A política de RLS permite que visitantes **apenas insiram** respostas — a anon
key não lê nada. Para ver quem confirmou (ou avisou que não vai), acesse o
painel do Supabase → **Table Editor** → tabela `confirmacoes` (coluna `vai`).

## 5. Build e deploy do site

```bash
npm run build   # gera dist/
```

O `dist/` é estático — suba na **Vercel** ou **Netlify**:

- **Vercel:** importe o repositório, framework "Vite", e cadastre
  `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em *Environment Variables*.
- **Netlify:** build command `npm run build`, publish directory `dist`, e as
  mesmas variáveis em *Site settings → Environment variables*.

## 6. Estrutura do projeto

```
src/
  config.ts            ← todos os dados editáveis do convite
  components/          ← uma seção por componente (Boot, Capa, Roteiro, ...)
  hooks/               ← useCountdown, useRevealOnScroll, usePrefersReducedMotion
  lib/                 ← cliente Supabase
  styles/              ← tokens (cores/fontes) e estilos globais
supabase/
  migrations/          ← tabela confirmacoes (com RLS) + coluna vai
public/
  fotos/               ← fotos do convite (capa, locais, confirmação, boot)
  icones/              ← logos do Google Maps e Waze
```

## 7. Segurança

- A anon key do Supabase é pública por natureza; a RLS garante que ela só
  consegue inserir respostas, nunca ler.
- Nenhuma outra chave ou API é usada — o chat é totalmente local.
