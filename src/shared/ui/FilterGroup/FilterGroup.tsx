import styles from './FilterGroup.module.css'

export function FilterGroup({ children }: { children: React.ReactNode }) {
  return <div className={styles.group}>{children}</div>
}
