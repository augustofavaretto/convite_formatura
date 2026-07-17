import { useEffect, useRef } from 'react'

/**
 * Aplica a classe global "visivel" quando o elemento entra na viewport.
 * Use junto com a classe "reveal" do CSS global.
 * Com prefers-reduced-motion, o elemento aparece imediatamente.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elemento.classList.add('visivel')
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            elemento.classList.add('visivel')
            observador.disconnect()
          }
        }
      },
      { threshold: 0.12 },
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  return ref
}
