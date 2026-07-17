import { CONFIG } from '../config'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import styles from './FotoCarrossel.module.css'

export default function FotoCarrossel() {
  const secaoRef = useRevealOnScroll<HTMLElement>()

  const fotos = CONFIG.fotos
  if (fotos.length === 0) return null

  // Lista duplicada para o loop contínuo emendar sem salto
  const slides = [...fotos, ...fotos]

  return (
    <section ref={secaoRef} className="reveal" aria-label="Fotos de formatura">
      <div className={styles.esteira}>
        <div className={styles.trilho}>
          {slides.map((foto, indice) => (
            <img
              key={indice}
              className={styles.foto}
              src={foto}
              alt={indice < fotos.length ? `Foto de formatura ${indice + 1} de ${CONFIG.nome}` : ''}
              aria-hidden={indice >= fotos.length}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
