import { AnimatePresence, motion } from 'motion/react'

import { Spinner } from '@/shared/ui/spinner'
import {
  AbsoluteWrapper,
  PortalWrapper,
  StickyWrapper,
} from '@/shared/ui/Sticky'

//! set body position relative

export interface AnimatedFetchingIndicatorProps {
  condition: boolean
  className?: string
}

export function AnimatedFetchingIndicator({
  className,
  condition,
}: AnimatedFetchingIndicatorProps) {
  return (
    <PortalWrapper>
      <AbsoluteWrapper className={`left-[50%] translate-x-[-50%] ${className}`}>
        <StickyWrapper className='top-10'>
          <AnimatePresence>
            {condition && (
              <motion.div
                className='bg-input dark:bg-chart-4 rounded-2xl p-1'
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
              >
                <Spinner className='size-6' data-testid='fetching-indicator' />
              </motion.div>
            )}
          </AnimatePresence>
        </StickyWrapper>
      </AbsoluteWrapper>
    </PortalWrapper>
  )
}
