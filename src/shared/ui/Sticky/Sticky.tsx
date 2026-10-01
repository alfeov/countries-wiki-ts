import { createPortal } from 'react-dom'

interface PortalWrapper {
  children: React.ReactNode
}

export function PortalWrapper({ children }: PortalWrapper) {
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

type Sticky = React.ComponentProps<'div'>

export function Sticky({ children, className }: Sticky) {
  return (
    <AbsoluteWrapper className={className}>
      <StickyWrapper>{children}</StickyWrapper>
    </AbsoluteWrapper>
  )
}
