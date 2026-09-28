import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ClassPage } from './pages/ClassPage'
import { NivelPage } from './pages/NivelPage'
import { DiccionarioPage } from './pages/DiccionarioPage'
import { TextosPage } from './pages/TextosPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nivel-1" element={<NivelPage />} />
          <Route path="nivel-1/clase/:slug" element={<ClassPage />} />
          <Route path="diccionario" element={<DiccionarioPage />} />
          <Route path="textos" element={<TextosPage />} />
          <Route path="clase/:slug" element={<LegacyClassRedirect />} />
          <Route path="recursos" element={<Navigate to="/diccionario" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function LegacyClassRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/nivel-1/clase/${slug}` : '/nivel-1'} replace />
}
