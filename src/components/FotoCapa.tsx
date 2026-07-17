import type { CSSProperties } from 'react'
import { CONFIG } from '../config'
import styles from './FotoCapa.module.css'

interface Palavra {
  texto: string
  /** Aspa dourada colada ao fim da palavra */
  sufixo?: string
}

const PALAVRAS_INICIO = 'Depois de milhares de linhas de código, chegou a hora de'.split(' ')

// Destaque dourado — renderizado junto, sem quebra de linha no meio
const PALAVRAS_DESTAQUE: Palavra[] = [
  { texto: 'compilar' },
  { texto: 'um' },
  { texto: 'sonho', sufixo: '”' },
]

const ATRASO_ENTRE_PALAVRAS_MS = 70

interface Props {
  /** As animações só começam depois que o boot termina */
  iniciar: boolean
}

export default function FotoCapa({ iniciar }: Props) {
  return (
    <section className={`reveal ${styles.secao} ${iniciar ? 'visivel' : ''}`}>
      <div className={styles.moldura}>
        <img
          className={styles.foto}
          src="/fotos/foto-capa.jpg"
          alt={`Foto de formatura de ${CONFIG.nome}`}
        />
        <div className={styles.degrade} aria-hidden="true" />
      </div>
      <div className={styles.legenda}>
          <p className={styles.frase}>
            {PALAVRAS_INICIO.map((texto, indice) => (
              <span
                key={indice}
                className={styles.palavra}
                style={{ '--atraso': `${indice * ATRASO_ENTRE_PALAVRAS_MS}ms` } as CSSProperties}
              >
                {indice === 0 && <span className={styles.aspa}>“</span>}
                {texto}
              </span>
            ))}
            <span className={styles.semQuebra}>
              {PALAVRAS_DESTAQUE.map((palavra, indice) => (
                <span
                  key={indice}
                  className={styles.palavra}
                  style={
                    {
                      '--atraso': `${(PALAVRAS_INICIO.length + indice) * ATRASO_ENTRE_PALAVRAS_MS}ms`,
                    } as CSSProperties
                  }
                >
                  <em>{palavra.texto}</em>
                  {palavra.sufixo && <span className={styles.aspa}>{palavra.sufixo}</span>}
                </span>
              ))}
            </span>
          </p>
          <p className={styles.nome}>{CONFIG.nome}</p>
          <p className={styles.familia}>e família convidam, honrados, para sua formatura de</p>
          <p className={styles.curso}>Ciência da Computação</p>
          <p className={styles.presenca}>
            Sua presença tornará esse momento ainda mais especial.
          </p>
      </div>
    </section>
  )
}
