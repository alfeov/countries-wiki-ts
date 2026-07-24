import { useEffect } from 'react'
import { useLocation } from 'react-router'

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function useScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    setTimeout(scrollToTop, 0)
  }, [location.pathname])
}
