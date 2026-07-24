import { AnimatePresence, motion } from 'motion/react'

import { Spinner } from '@/shared/ui/spinner'

interface FetchingIndicatorProps {
  conditions: boolean
  className?: string
  wrapperClassName?: string
}

export function FetchingIndicator({
  conditions,
  className = '',
  wrapperClassName = '',
}: FetchingIndicatorProps) {
  return (
    <AnimatePresence>
      {conditions && (
        <div
          className={`absolute h-full left-[50%] top-0 translate-x-[-50%] z-10 ${wrapperClassName}`}
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className={`sticky top-[4rem] bg-input dark:bg-chart-4 rounded-2xl p-[0.5rem] ${className}`}
          >
            <Spinner className='size-6' />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
