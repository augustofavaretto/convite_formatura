import { CONFIG } from '../config'
import styles from './RedesSociais.module.css'

const REDES = [
  {
    nome: 'Instagram',
    url: CONFIG.redes.instagram,
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nome: 'Facebook',
    url: CONFIG.redes.facebook,
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    nome: 'LinkedIn',
    url: CONFIG.redes.linkedin,
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function RedesSociais() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.icones}>
        {REDES.map((rede) => (
          <a
            key={rede.nome}
            className={styles.icone}
            href={rede.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${rede.nome} de ${CONFIG.nome}`}
          >
            {rede.icone}
          </a>
        ))}
      </div>
      <p className={styles.credito}>
        Desenvolvido com carinho por
        <a
          href="https://www.augustofavaretto.com.br"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Site de ${CONFIG.nome}`}
        >
          <img className={styles.logoCredito} src="/icones/logo-af.svg" alt="AF" />
        </a>
      </p>
    </footer>
  )
}
