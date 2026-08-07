import { AnimatePresence, motion } from 'motion/react'

import { Spinner } from '@/shared/ui/spinner'
import {
  AbsoluteWrapper,
  StickyPortalWrapper,
  StickyWrapper,
} from '@/shared/ui/Sticky'

//! set body position relative

export interface AnimatedFetchingIndicatorProps {
  conditions: boolean
  className: string
}

export function AnimatedFetchingIndicator({
  className,
  conditions,
}: AnimatedFetchingIndicatorProps) {
  return (
    <StickyPortalWrapper>
      <AbsoluteWrapper className={`left-[50%] translate-x-[-50%] ${className}`}>
        <StickyWrapper className='top-[40px]'>
          <AnimatePresence>
            {conditions && (
              <motion.div
                className='bg-input dark:bg-chart-4 rounded-2xl p-[5px]'
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
              >
                <Spinner className='size-6' />
              </motion.div>
            )}
          </AnimatePresence>
        </StickyWrapper>
      </AbsoluteWrapper>
    </StickyPortalWrapper>
  )
}
