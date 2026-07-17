import { useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import styles from './PixGift.module.css'

function copiarComFallback(texto: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(texto)
  }
  // Fallback para navegadores sem Clipboard API
  return new Promise((resolver, rejeitar) => {
    const area = document.createElement('textarea')
    area.value = texto
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const copiou = document.execCommand('copy')
    area.remove()
    if (copiou) resolver()
    else rejeitar(new Error('Não foi possível copiar'))
  })
}

export default function PixGift() {
  const secaoRef = useRevealOnScroll<HTMLElement>()
  const [feedback, setFeedback] = useState('')
  const cronometro = useRef<number>()

  useEffect(() => () => window.clearTimeout(cronometro.current), [])

  async function copiar() {
    try {
      await copiarComFallback(CONFIG.pixChave)
      setFeedback('✓ chave copiada!')
    } catch {
      setFeedback(`Copie manualmente: ${CONFIG.pixChave}`)
    }
    window.clearTimeout(cronometro.current)
    cronometro.current = window.setTimeout(() => setFeedback(''), 3500)
  }

  return (
    <section ref={secaoRef} className="reveal">
      <h2 className="titulo-secao">Contribuição</h2>
      <div className={styles.cartao}>
        <img
          className={styles.foto}
          src="/fotos/foto-presente.jpg"
          alt={`Foto de formatura de ${CONFIG.nome}`}
          loading="lazy"
        />
        <p className={styles.texto}>
          Sua presença é o maior presente!
          <br />
          Mas, se quiser me apoiar nesse novo começo, qualquer contribuição via Pix será
          recebida com muita gratidão e vai me ajudar nos primeiros passos da minha carreira:
        </p>
        <p className={styles.chave}>{CONFIG.pixChave}</p>
        <button type="button" className="btn btn-ouro" onClick={copiar}>
          Copiar chave Pix
        </button>
        <p className={styles.feedback} role="status">
          {feedback}
        </p>
      </div>
    </section>
  )
}
