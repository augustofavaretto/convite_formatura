import { useState } from 'react'
import BootScreen from './components/BootScreen'
import FotoCapa from './components/FotoCapa'
import FotoCarrossel from './components/FotoCarrossel'
import SaveTheDate from './components/SaveTheDate'
import Places from './components/Places'
import AIChat from './components/AIChat'
import PixGift from './components/PixGift'
import RSVPForm from './components/RSVPForm'
import RedesSociais from './components/RedesSociais'
import PaginaResposta from './components/PaginaResposta'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

// Rota da página de resposta: /?rsvp=confirmado|recusado&nome=...&acompanhante=...
const parametrosUrl = new URLSearchParams(window.location.search)
const rotaResposta = parametrosUrl.get('rsvp')

export default function App() {
  const movimentoReduzido = usePrefersReducedMotion()
  const [bootConcluido, setBootConcluido] = useState(false)

  // Página dedicada pós-resposta (sem boot e sem o restante do convite)
  if (rotaResposta === 'confirmado' || rotaResposta === 'recusado') {
    return (
      <main className="container">
        <PaginaResposta
          vai={rotaResposta === 'confirmado'}
          nome={parametrosUrl.get('nome') ?? 'Convidado(a)'}
          nomeAcompanhante={parametrosUrl.get('acompanhante') ?? ''}
        />
      </main>
    )
  }

  // Com prefers-reduced-motion o boot nem é renderizado
  const mostrarBoot = !movimentoReduzido && !bootConcluido
  const paginaPronta = movimentoReduzido || bootConcluido

  return (
    <>
      {mostrarBoot && <BootScreen aoTerminar={() => setBootConcluido(true)} />}
      <main className="container">
        <FotoCapa iniciar={paginaPronta} />
        <SaveTheDate />
        <FotoCarrossel />
        <Places />
        <AIChat />
        <PixGift />
        <RSVPForm />
        <RedesSociais />
      </main>
    </>
  )
}
