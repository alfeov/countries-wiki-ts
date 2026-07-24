import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'

import { router } from './providers/router'
import { store } from './providers/store'

import './styles/base/index.css'
import './styles/tailwind/index.css'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
