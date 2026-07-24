import { Link, Outlet } from 'react-router'

import { Header } from '@/shared/ui/Header'
import { Main } from '@/shared/ui/Main'
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton'

import styles from './Layout.module.css'

export function Layout() {
  return (
    <>
      <Header>
        <Link to='/' className={styles.link}>
          Counties Wiki
        </Link>
        <ThemeToggleButton />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  )
}
