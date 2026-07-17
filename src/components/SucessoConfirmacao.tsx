import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { CONFIG } from '../config'
import { useCountdown } from '../hooks/useCountdown'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import styles from './SucessoConfirmacao.module.css'

interface Props {
  /** true = confirmou presença; false = respondeu "Não vou" */
  vai: boolean
  nome: string
  temAcompanhante?: boolean
  nomeAcompanhante?: string
}

interface Capelo {
  esquerda: number
  atrasoS: number
  duracaoS: number
  tamanhoRem: number
  derivaPx: number
}

const QUANTIDADE_CAPELOS = 18
const DURACAO_CHUVA_MS = 6500

function doisDigitos(valor: number): string {
  return String(valor).padStart(2, '0')
}

export default function SucessoConfirmacao({
  vai,
  nome,
  temAcompanhante = false,
  nomeAcompanhante = '',
}: Props) {
  const movimentoReduzido = usePrefersReducedMotion()
  const [chuvaAtiva, setChuvaAtiva] = useState(vai)
  const contagem = useCountdown(CONFIG.data.iso)

  // Posições/tempos sorteados uma única vez
  const capelos = useMemo<Capelo[]>(
    () =>
      Array.from({ length: QUANTIDADE_CAPELOS }, () => ({
        esquerda: Math.random() * 100,
        atrasoS: Math.random() * 2.5,
        duracaoS: 3 + Math.random() * 2.5,
        tamanhoRem: 1.4 + Math.random() * 1.4,
        derivaPx: -50 + Math.random() * 100,
      })),
    [],
  )

  // Encerra a chuva de capelos e limpa o DOM
  useEffect(() => {
    if (!chuvaAtiva) return
    const id = setTimeout(() => setChuvaAtiva(false), DURACAO_CHUVA_MS)
    return () => clearTimeout(id)
  }, [chuvaAtiva])

  const unidades = [
    { rotulo: 'dias', valor: contagem.dias },
    { rotulo: 'horas', valor: contagem.horas },
    { rotulo: 'min', valor: contagem.minutos },
    { rotulo: 'seg', valor: contagem.segundos },
  ]

  return (
    <div role="status">
      {chuvaAtiva && !movimentoReduzido && (
        <div className={styles.chuva} aria-hidden="true">
          {capelos.map((capelo, indice) => (
            <span
              key={indice}
              className={styles.capelo}
              style={
                {
                  left: `${capelo.esquerda}%`,
                  fontSize: `${capelo.tamanhoRem}rem`,
                  animationDelay: `${capelo.atrasoS}s`,
                  animationDuration: `${capelo.duracaoS}s`,
                  '--deriva': `${capelo.derivaPx}px`,
                } as CSSProperties
              }
            >
              🎓
            </span>
          ))}
        </div>
      )}

      <div className={styles.fotoMoldura}>
        <img
          className={styles.foto}
          src="/fotos/foto-confirmacao.jpg"
          alt={`Foto de formatura de ${CONFIG.nome}`}
        />
        <div className={styles.degrade} aria-hidden="true" />
      </div>

      {vai ? (
        <div className={styles.conteudo}>
          <p className={styles.confirmacao}>
            Obrigado, {nome}!
            <br />
            {temAcompanhante
              ? `Presença confirmada para você e ${nomeAcompanhante}. 🎉`
              : 'Presença confirmada. 🎉'}
          </p>
          <p className={styles.titulo}>Esperamos por você!</p>

          {!contagem.encerrado && (
            <>
              <p className={styles.faltam}>Faltam</p>
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
            </>
          )}
        </div>
      ) : (
        <div className={styles.conteudo}>
          <p className={styles.titulo}>Sentiremos sua falta!</p>
          <p className={styles.despedida}>
            {nome}, agradeço de coração por avisar. Você fez parte dessa conquista e estará
            comigo em pensamento nesse dia tão especial. Um forte abraço,
          </p>
          <p className={styles.assinatura}>{CONFIG.nome}</p>
        </div>
      )}
    </div>
  )
}
