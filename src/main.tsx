import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import Compare from './pages/Compare'
import Pricing from './pages/Pricing'
import Playground from './pages/Playground'
import Docs from './pages/Docs'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Layout>
  </HashRouter>
)
