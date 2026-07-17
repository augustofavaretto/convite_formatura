import { useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config'
import styles from './BootScreen.module.css'

interface Props {
  aoTerminar: () => void
}

const INTERVALO_LINHAS_MS = 550
const PAUSA_FINAL_MS = 900
const FADE_MS = 700

const CARACTERES_MATRIX = '01{}[]<>/;=+*#$_'
const TAMANHO_FONTE_MATRIX = 16
const QUADRO_MATRIX_MS = 55

function classeDaLinha(linha: string): string {
  if (linha.startsWith('$')) return styles.comando
  if (linha.startsWith('🎓')) return styles.final
  return styles.ok
}

export default function BootScreen({ aoTerminar }: Props) {
  const [visiveis, setVisiveis] = useState(0)
  const [saindo, setSaindo] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Trava o scroll enquanto o boot está ativo
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Chuva de código estilo Matrix atrás do terminal
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const contexto = canvas.getContext('2d')
    if (!contexto) return

    const redimensionar = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    redimensionar()
    window.addEventListener('resize', redimensionar)

    const colunas = Math.ceil(window.innerWidth / TAMANHO_FONTE_MATRIX)
    // Cada coluna começa numa altura aleatória acima da tela
    const gotas = Array.from({ length: colunas }, () => Math.floor(Math.random() * -50))

    const id = setInterval(() => {
      // Véu que apaga o rastro aos poucos
      contexto.fillStyle = 'rgba(11, 17, 32, 0.16)'
      contexto.fillRect(0, 0, canvas.width, canvas.height)
      contexto.font = `${TAMANHO_FONTE_MATRIX}px 'JetBrains Mono', monospace`
      contexto.fillStyle = 'rgba(240, 212, 138, 0.6)'

      for (let i = 0; i < colunas; i++) {
        const caractere =
          CARACTERES_MATRIX[Math.floor(Math.random() * CARACTERES_MATRIX.length)]
        contexto.fillText(caractere, i * TAMANHO_FONTE_MATRIX, gotas[i] * TAMANHO_FONTE_MATRIX)
        if (gotas[i] * TAMANHO_FONTE_MATRIX > canvas.height && Math.random() > 0.975) {
          gotas[i] = 0
        }
        gotas[i]++
      }
    }, QUADRO_MATRIX_MS)

    return () => {
      clearInterval(id)
      window.removeEventListener('resize', redimensionar)
    }
  }, [])

  useEffect(() => {
    if (saindo) {
      const id = setTimeout(aoTerminar, FADE_MS)
      return () => clearTimeout(id)
    }
    if (visiveis < CONFIG.bootLines.length) {
      const id = setTimeout(() => setVisiveis((v) => v + 1), INTERVALO_LINHAS_MS)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setSaindo(true), PAUSA_FINAL_MS)
    return () => clearTimeout(id)
  }, [visiveis, saindo, aoTerminar])

  const progresso = Math.round((visiveis / CONFIG.bootLines.length) * 100)

  return (
    <div
      className={`${styles.overlay} ${saindo ? styles.saindo : ''}`}
      role="status"
      aria-live="polite"
    >
      <canvas ref={canvasRef} className={styles.matriz} aria-hidden="true" />
      <div className={styles.terminal}>
        {CONFIG.bootLines.slice(0, visiveis).map((linha, indice) => (
          <p key={indice} className={`${styles.linha} ${classeDaLinha(linha)}`}>
            {linha}
          </p>
        ))}
        <div className={styles.progresso} aria-hidden="true">
          <span className={styles.trilhoProgresso}>
            <span
              className={styles.preenchimentoProgresso}
              style={{ width: `${progresso}%` }}
            />
          </span>
          <span className={styles.percentual}>{progresso}%</span>
        </div>
      </div>
    </div>
  )
}
