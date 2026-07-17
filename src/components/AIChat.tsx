import { useEffect, useRef, useState } from 'react'
import { CONFIG, type LinkFaq } from '../config'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import styles from './AIChat.module.css'

interface Mensagem {
  autor: 'visitante' | 'assistente'
  texto: string
  links?: LinkFaq[]
}

const BOAS_VINDAS: Mensagem = {
  autor: 'assistente',
  texto:
    'Olá! 👋 Sou o AugustoIA, o assistente da formatura do Augusto Favaretto. Toque em uma pergunta abaixo que eu respondo na hora!',
}

const PAUSA_RESPOSTA_MS = 500

export default function AIChat() {
  const secaoRef = useRevealOnScroll<HTMLElement>()
  const corpoRef = useRef<HTMLDivElement>(null)
  const [mensagens, setMensagens] = useState<Mensagem[]>([BOAS_VINDAS])
  const [digitando, setDigitando] = useState(false)

  // Mantém o chat rolado para a última mensagem
  useEffect(() => {
    const corpo = corpoRef.current
    if (corpo) corpo.scrollTop = corpo.scrollHeight
  }, [mensagens, digitando])

  function adicionar(mensagem: Mensagem) {
    setMensagens((atuais) => [...atuais, mensagem])
  }

  // Todas as respostas vêm do FAQ local — sem chamadas de API
  function responderFaq(indice: number) {
    const item = CONFIG.faq[indice]
    if (!item || digitando) return
    adicionar({ autor: 'visitante', texto: item.q })
    setDigitando(true)
    window.setTimeout(() => {
      adicionar({ autor: 'assistente', texto: item.a, links: item.links })
      setDigitando(false)
    }, PAUSA_RESPOSTA_MS)
  }

  return (
    <section ref={secaoRef} className="reveal">
      <h2 className="titulo-secao">Dúvidas? Pergunte ao AugustoIA</h2>
      <p className={styles.subtitulo}>
        Clique em uma pergunta para esclarecer suas dúvidas sobre a formatura.
      </p>

      <div className={styles.janela}>
        <header className={styles.barra}>
          <span className={styles.luzes} aria-hidden="true">
            <span className={styles.ouro} />
            <span className={styles.champanhe} />
            <span className={styles.marfim} />
          </span>
          <p className={styles.tituloJanela}>augustoIA ~ online</p>
        </header>

        <div ref={corpoRef} className={styles.corpo} aria-live="polite">
          {mensagens.map((mensagem, indice) => (
            <p
              key={indice}
              className={
                mensagem.autor === 'visitante' ? styles.balaoVisitante : styles.balaoAssistente
              }
            >
              {mensagem.texto}
              {mensagem.links && (
                <span className={styles.linksBalao}>
                  {mensagem.links.map((link) => (
                    <a
                      key={link.url}
                      className={`${styles.linkBalao} ${
                        link.estilo === 'azul' ? styles.linkAzul : styles.linkOuro
                      }`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img className={styles.linkIcone} src={link.icone} alt="" aria-hidden="true" />
                      {link.rotulo}
                    </a>
                  ))}
                </span>
              )}
            </p>
          ))}
          {digitando && (
            <p className={`${styles.balaoAssistente} ${styles.digitando}`}>digitando...</p>
          )}
        </div>

        <div className={styles.chips}>
          {CONFIG.faq.map((item, indice) => (
            <button
              key={item.q}
              type="button"
              className={styles.chip}
              onClick={() => responderFaq(indice)}
            >
              {item.chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
