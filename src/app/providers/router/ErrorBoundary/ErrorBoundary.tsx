import { useRouteError } from 'react-router'

import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

export function ErrorBoundary() {
  const error = useRouteError()

  return (
    <ErrorEmpty>
      {error instanceof Error ? error.message : 'Unknown error'}
    </ErrorEmpty>
  )
}
