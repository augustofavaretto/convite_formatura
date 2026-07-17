import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/** Linha inserida na tabela public.confirmacoes */
export interface NovaConfirmacao {
  nome: string
  tem_acompanhante: boolean
  nome_acompanhante: string | null
  /** true = "Eu vou", false = "Não vou" */
  vai: boolean
}

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

/** Nulo quando as variáveis de ambiente não foram configuradas. */
export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null
