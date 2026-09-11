import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient({

  defaultOptions:{
    queries:{
      staleTime: 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus:false,
      retry:1,
    },
  },

});



createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <App />
  </BrowserRouter>

  <ReactQueryDevtools initialIsOpen={true} />
</QueryClientProvider>
)
