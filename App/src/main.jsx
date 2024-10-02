import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/appRoutes.jsx'
import { Provider } from './hooks/provider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    < AppRoutes />
  </Provider>,
)
