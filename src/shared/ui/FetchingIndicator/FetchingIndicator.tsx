import { Spinner } from '@/shared/ui/spinner'
import {
  AbsoluteWrapper,
  StickyPortalWrapper,
  StickyWrapper,
} from '@/shared/ui/Sticky'

//! set body position relative

export interface FetchingIndicatorProps {
  conditions: boolean
  className: string
}

export function FetchingIndicator({
  className,
  conditions,
}: FetchingIndicatorProps) {
  return (
    <>
      {conditions && (
        <StickyPortalWrapper>
          <AbsoluteWrapper
            className={`left-[50%] translate-x-[-50%] ${className}`}
          >
            <StickyWrapper className='top-[40px]'>
              <div className='bg-input dark:bg-chart-4 rounded-2xl p-[5px]'>
                <Spinner className='size-6' />
              </div>
            </StickyWrapper>
          </AbsoluteWrapper>
        </StickyPortalWrapper>
      )}
    </>
  )
}
