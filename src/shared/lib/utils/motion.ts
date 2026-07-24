import { motion, stagger } from 'motion/react'

export const createMotionedComponent = <T>(
  Component: string | React.ComponentType<T>,
) => motion.create(Component, { forwardMotionProps: true })

// ! important use overflow-x hidden on body to prevent content overflows
export const sideVariant = (x: number) => ({
  initial: { x, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.2, delay: 0.5 },
})

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.05),
    },
  },
}

export const listVariant = () => ({
  variants: listVariants,
  initial: 'hidden',
  animate: 'show',
})

export const itemVariants = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1 },
}
