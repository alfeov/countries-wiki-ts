import { createPortal } from 'react-dom'

interface StickyPortalWrapper {
  children: React.ReactNode
}
export function StickyPortalWrapper({ children }: StickyPortalWrapper) {
  return createPortal(children, document.body)
}

type AbsoluteWrapperProps = React.ComponentProps<'div'>
export function AbsoluteWrapper({
  className = '',
  children,
  ...props
}: AbsoluteWrapperProps) {
  return (
    <div className={`absolute h-full top-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

type StickyWrapperProps = React.ComponentProps<'div'>
export function StickyWrapper({
  className = '',
  children,
  ...props
}: StickyWrapperProps) {
  return (
    <div className={`sticky top-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

// Portal
//  Absolute
//   Sticky
//     .... < your components
//   Sticky
//  Absolute
// Portal
