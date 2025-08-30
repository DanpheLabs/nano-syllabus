import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from './components/ui/provider.tsx';
import { UiProvider } from "./lib/providers/uiProvider.tsx"
import { AuthProvider } from "./lib/providers/authProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <Provider>
    <AuthProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </AuthProvider>
  </Provider>
)
