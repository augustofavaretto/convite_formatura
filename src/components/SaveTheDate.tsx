import { CONFIG } from '../config'
import { useCountdown } from '../hooks/useCountdown'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import styles from './SaveTheDate.module.css'

function doisDigitos(valor: number): string {
  return String(valor).padStart(2, '0')
}

export default function SaveTheDate() {
  const secaoRef = useRevealOnScroll<HTMLElement>()
  const contagem = useCountdown(CONFIG.data.iso)

  const unidades = [
    { rotulo: 'dias', valor: contagem.dias },
    { rotulo: 'horas', valor: contagem.horas },
    { rotulo: 'min', valor: contagem.minutos },
    { rotulo: 'seg', valor: contagem.segundos },
  ]

  return (
    <section ref={secaoRef} className={`reveal ${styles.secao}`}>
      <div className={styles.cartao}>
        <p className={styles.dataLinha}>
          {CONFIG.data.mes}
          <span className={styles.separador} aria-hidden="true">
            |
          </span>
          <span className={styles.diaDestaque}>{CONFIG.data.dia}</span>
          <span className={styles.separador} aria-hidden="true">
            |
          </span>
          {CONFIG.data.ano}
        </p>

        <div className={styles.contagem} aria-label="Contagem regressiva para a formatura">
          {unidades.map((unidade) => (
            <div key={unidade.rotulo} className={styles.unidade}>
              {/* key remonta o número a cada mudança, disparando o pulso */}
              <b key={unidade.valor} className={styles.valor}>
                {doisDigitos(unidade.valor)}
              </b>
              <span className={styles.rotulo}>{unidade.rotulo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
