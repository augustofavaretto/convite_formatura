import { useEffect, useRef, useState } from 'react'
import { CONFIG, type LocalEvento } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import styles from './Places.module.css'

const AUTOPLAY_MS = 4500
const PAUSA_TOQUE_MS = 8000

function GaleriaFotos({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const trilhoRef = useRef<HTMLDivElement>(null)
  const pausadoAte = useRef(0)
  const [ativa, setAtiva] = useState(0)
  const movimentoReduzido = usePrefersReducedMotion()

  function aoRolar() {
    const trilho = trilhoRef.current
    if (!trilho) return
    setAtiva(Math.round(trilho.scrollLeft / trilho.clientWidth))
  }

  function pausarAutoplay() {
    pausadoAte.current = Date.now() + PAUSA_TOQUE_MS
  }

  function irPara(indice: number) {
    const trilho = trilhoRef.current
    if (!trilho) return
    trilho.scrollTo({
      left: indice * trilho.clientWidth,
      behavior: movimentoReduzido ? 'auto' : 'smooth',
    })
  }

  // Passa sozinha a cada 4,5s (pausa 8s após toque; desligada com reduced motion)
  useEffect(() => {
    if (movimentoReduzido || fotos.length < 2) return
    const id = setInterval(() => {
      if (Date.now() < pausadoAte.current || document.hidden) return
      const trilho = trilhoRef.current
      if (!trilho) return
      const atual = Math.round(trilho.scrollLeft / trilho.clientWidth)
      trilho.scrollTo({ left: ((atual + 1) % fotos.length) * trilho.clientWidth, behavior: 'smooth' })
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [movimentoReduzido, fotos.length])

  return (
    <div className={styles.galeria}>
      <div
        ref={trilhoRef}
        className={styles.galeriaTrilho}
        onScroll={aoRolar}
        onPointerDown={pausarAutoplay}
        onTouchStart={pausarAutoplay}
      >
        {fotos.map((foto, indice) => (
          <img
            key={foto}
            className={styles.galeriaFoto}
            src={foto}
            alt={`${titulo} — foto ${indice + 1}`}
            loading="lazy"
          />
        ))}
      </div>
      {fotos.length > 1 && (
        <div className={styles.galeriaDots}>
          {fotos.map((_, indice) => (
            <button
              key={indice}
              type="button"
              aria-label={`Ir para a foto ${indice + 1} de ${titulo}`}
              aria-current={indice === ativa}
              className={`${styles.galeriaDot} ${indice === ativa ? styles.galeriaDotAtiva : ''}`}
              onClick={() => {
                pausarAutoplay()
                irPara(indice)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CartaoLocal({ local }: { local: LocalEvento }) {
  const cartaoRef = useRevealOnScroll<HTMLElement>()
  const busca = encodeURIComponent(local.mapaBusca)

  return (
    <article ref={cartaoRef} className={`reveal ${styles.cartao}`}>
      {local.fotos.length > 0 ? (
        <GaleriaFotos fotos={local.fotos} titulo={local.titulo} />
      ) : (
        <div className={styles.fotoPlaceholder}>
          <span aria-hidden="true">📍</span>
          <p>
            foto do local (edite <code>CONFIG.locais</code>)
          </p>
        </div>
      )}
      <div className={styles.conteudo}>
        <span className={styles.etapa}>{`// ${local.etapa}`}</span>
        <h3 className={styles.titulo}>{local.titulo}</h3>
        <p className={`${styles.meta} ${styles.metaDestaque}`}>
          <b>{local.horario}</b> · {local.lugar}
        </p>
        <p className={styles.meta}>{local.endereco}</p>
        {local.aviso && (
          <p className={styles.aviso}>
            <span aria-hidden="true">⚠️</span>
            {local.aviso}
          </p>
        )}
        <iframe
          className={styles.mapa}
          src={local.mapaEmbed ?? `https://maps.google.com/maps?q=${busca}&z=15&output=embed`}
          title={`Mapa — ${local.titulo}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className={styles.botoes}>
          <a
            className={`${styles.rota} ${styles.gmaps}`}
            href={local.mapaLink ?? `https://www.google.com/maps/search/?api=1&query=${busca}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={styles.rotaIcone} src="/icones/google-maps.webp" alt="" aria-hidden="true" />
            Google Maps
          </a>
          <a
            className={`${styles.rota} ${styles.waze}`}
            href={`https://waze.com/ul?q=${busca}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={styles.rotaIcone} src="/icones/waze.png" alt="" aria-hidden="true" />
            Waze
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Places() {
  const secaoRef = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={secaoRef} className="reveal">
      <h2 className="titulo-secao">Programação da Celebração</h2>
      <p className={styles.subtitulo}>Três momentos, uma noite inesquecível.</p>
      <div>
        {CONFIG.locais.map((local) => (
          <CartaoLocal key={local.titulo} local={local} />
        ))}
      </div>
    </section>
  )
}
