import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** Verdadeiro quando o visitante prefere menos movimento (todas as animações devem respeitar). */
export function usePrefersReducedMotion(): boolean {
  const [reduzido, setReduzido] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const midia = window.matchMedia(QUERY)
    const aoMudar = (evento: MediaQueryListEvent) => setReduzido(evento.matches)
    midia.addEventListener('change', aoMudar)
    return () => midia.removeEventListener('change', aoMudar)
  }, [])

  return reduzido
}
