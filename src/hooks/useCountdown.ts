import { useEffect, useState } from 'react'

export interface Contagem {
  dias: number
  horas: number
  minutos: number
  segundos: number
  encerrado: boolean
}

function calcular(alvoMs: number): Contagem {
  const restante = alvoMs - Date.now()
  if (restante <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, encerrado: true }
  }
  const segundosTotais = Math.floor(restante / 1000)
  return {
    dias: Math.floor(segundosTotais / 86400),
    horas: Math.floor((segundosTotais % 86400) / 3600),
    minutos: Math.floor((segundosTotais % 3600) / 60),
    segundos: segundosTotais % 60,
    encerrado: false,
  }
}

/** Contagem regressiva ao vivo até a data ISO informada. */
export function useCountdown(alvoIso: string): Contagem {
  const alvoMs = new Date(alvoIso).getTime()
  const [contagem, setContagem] = useState(() => calcular(alvoMs))

  useEffect(() => {
    const id = setInterval(() => setContagem(calcular(alvoMs)), 1000)
    return () => clearInterval(id)
  }, [alvoMs])

  return contagem
}
