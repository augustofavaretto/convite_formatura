import { useState, type FormEvent } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { supabase, type NovaConfirmacao } from '../lib/supabase'
import styles from './RSVPForm.module.css'

type Escolha = 'vou' | 'naoVou' | null

const ERRO_SEM_BANCO =
  'O banco de dados ainda não foi configurado (variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY). Seus dados não foram perdidos — tente novamente em instantes.'
const ERRO_AO_SALVAR =
  'Ops, não conseguimos salvar sua resposta agora. 😕 Seus dados continuam aqui — tente de novo em instantes.'

/** Navega para a página dedicada de resposta (rota ?rsvp=...). */
function irParaPaginaResposta(vai: boolean, nome: string, nomeAcompanhante: string) {
  const parametros = new URLSearchParams({
    rsvp: vai ? 'confirmado' : 'recusado',
    nome,
  })
  if (nomeAcompanhante) parametros.set('acompanhante', nomeAcompanhante)
  window.location.assign(`/?${parametros.toString()}`)
}

export default function RSVPForm() {
  const secaoRef = useRevealOnScroll<HTMLElement>()
  const [escolha, setEscolha] = useState<Escolha>(null)
  const [nome, setNome] = useState('')
  const [temAcompanhante, setTemAcompanhante] = useState(false)
  const [nomeAcompanhante, setNomeAcompanhante] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  function escolher(opcao: Escolha) {
    setEscolha(opcao)
    setErro(null)
  }

  async function salvar(resposta: NovaConfirmacao): Promise<boolean> {
    if (!supabase) {
      setErro(ERRO_SEM_BANCO)
      return false
    }
    setEnviando(true)
    const { error } = await supabase.from('confirmacoes').insert(resposta)
    if (error) {
      setEnviando(false)
      setErro(ERRO_AO_SALVAR)
      return false
    }
    // mantém "Enviando..." até a navegação para a página de resposta
    return true
  }

  async function confirmar(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)

    const nomeLimpo = nome.trim()
    const acompanhanteLimpo = nomeAcompanhante.trim()

    if (!nomeLimpo) {
      setErro('Informe seu nome para confirmar.')
      return
    }
    if (temAcompanhante && !acompanhanteLimpo) {
      setErro('Informe o nome do acompanhante.')
      return
    }

    const confirmacao: NovaConfirmacao = {
      nome: nomeLimpo,
      tem_acompanhante: temAcompanhante,
      nome_acompanhante: temAcompanhante ? acompanhanteLimpo : null,
      vai: true,
    }

    if (!(await salvar(confirmacao))) return
    irParaPaginaResposta(true, nomeLimpo, temAcompanhante ? acompanhanteLimpo : '')
  }

  async function recusar(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)

    const nomeLimpo = nome.trim()
    if (!nomeLimpo) {
      setErro('Informe seu nome para enviar a resposta.')
      return
    }

    const resposta: NovaConfirmacao = {
      nome: nomeLimpo,
      tem_acompanhante: false,
      nome_acompanhante: null,
      vai: false,
    }

    if (!(await salvar(resposta))) return
    irParaPaginaResposta(false, nomeLimpo, '')
  }

  return (
    <section ref={secaoRef} className="reveal" id="rsvp">
      <h2 className={`titulo-secao ${styles.tituloRsvp}`}>
        Confirme sua presença até <span className={styles.dataLimite}>07/08/2026</span>
      </h2>

      {escolha === null ? (
        <div className={styles.escolha}>
          <p className={styles.escolhaPergunta}>Você poderá comparecer?</p>
          <div className={styles.escolhaBotoes}>
            <button type="button" className="btn btn-ouro" onClick={() => escolher('vou')}>
              🎉 Eu vou!
            </button>
            <button type="button" className="btn btn-contorno" onClick={() => escolher('naoVou')}>
              Não vou
            </button>
          </div>
        </div>
      ) : escolha === 'vou' ? (
        <form className={styles.formulario} onSubmit={confirmar} noValidate>
          <button type="button" className={styles.voltar} onClick={() => escolher(null)}>
            ‹ voltar
          </button>
          <div className={styles.campoGrupo}>
            <label htmlFor="rsvp-nome">Seu nome completo</label>
            <input
              id="rsvp-nome"
              type="text"
              value={nome}
              required
              autoComplete="name"
              placeholder="Ex.: Augusto Favaretto"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={temAcompanhante}
              onChange={(e) => setTemAcompanhante(e.target.checked)}
            />
            <span className={styles.trilhoToggle} aria-hidden="true" />
            Vou levar acompanhante
          </label>

          {temAcompanhante && (
            <div className={styles.campoGrupo}>
              <label htmlFor="rsvp-acompanhante">Nome do acompanhante</label>
              <input
                id="rsvp-acompanhante"
                type="text"
                value={nomeAcompanhante}
                required
                placeholder="Ex.: Augusto Favaretto"
                onChange={(e) => setNomeAcompanhante(e.target.value)}
              />
            </div>
          )}

          {erro && (
            <p className={styles.erro} role="alert">
              {erro}
            </p>
          )}

          <button type="submit" className="btn btn-ouro" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Confirmar presença 🎓'}
          </button>
        </form>
      ) : (
        <form className={styles.formulario} onSubmit={recusar} noValidate>
          <button type="button" className={styles.voltar} onClick={() => escolher(null)}>
            ‹ voltar
          </button>
          <div className={styles.campoGrupo}>
            <label htmlFor="rsvp-nome-recusa">Seu nome completo</label>
            <input
              id="rsvp-nome-recusa"
              type="text"
              value={nome}
              required
              autoComplete="name"
              placeholder="Ex.: Augusto Favaretto"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {erro && (
            <p className={styles.erro} role="alert">
              {erro}
            </p>
          )}

          <button type="submit" className="btn btn-contorno" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar resposta'}
          </button>
        </form>
      )}
    </section>
  )
}
