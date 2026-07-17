import RedesSociais from './RedesSociais'
import SucessoConfirmacao from './SucessoConfirmacao'
import styles from './PaginaResposta.module.css'

interface Props {
  /** true = confirmou presença; false = respondeu "Não vou" */
  vai: boolean
  nome: string
  nomeAcompanhante: string
}

/** Página dedicada exibida após o envio da resposta (rota ?rsvp=...). */
export default function PaginaResposta({ vai, nome, nomeAcompanhante }: Props) {
  const primeiroNome = nome.split(/\s+/)[0] ?? nome

  return (
    <section className={styles.pagina}>
      <SucessoConfirmacao
        vai={vai}
        nome={vai ? nome : primeiroNome}
        temAcompanhante={nomeAcompanhante !== ''}
        nomeAcompanhante={nomeAcompanhante}
      />
      <RedesSociais />
    </section>
  )
}
