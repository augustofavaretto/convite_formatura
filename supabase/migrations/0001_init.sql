-- Tabela de confirmações de presença (RSVP)
create table public.confirmacoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tem_acompanhante boolean not null default false,
  nome_acompanhante text,
  criado_em timestamptz not null default now()
);

alter table public.confirmacoes enable row level security;

-- visitantes podem apenas inserir; ninguém lê via anon key
create policy "insert_publico" on public.confirmacoes
  for insert to anon with check (true);
