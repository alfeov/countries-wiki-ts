import { CircleX } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

export function NotFoundPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <CircleX className='size-6' />
        </EmptyMedia>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
