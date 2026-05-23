import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import './index.css'

// No StrictMode — causes canvas effects to run twice
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  </HashRouter>
)
