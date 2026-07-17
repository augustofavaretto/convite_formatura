-- Registra também quem respondeu "Não vou" (vai = false)
alter table public.confirmacoes
  add column vai boolean not null default true;
