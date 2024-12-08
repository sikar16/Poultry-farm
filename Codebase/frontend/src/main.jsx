import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from "./app/store.tsx"
import { AuthProvider } from './context/AuthContext.tsx'
import i18n from './util/i18n.jsx'
import { I18nextProvider } from 'react-i18next'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>,
)
