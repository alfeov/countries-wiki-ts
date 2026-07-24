import styles from './Header.module.css'

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>{children}</div>
    </header>
  )
}
