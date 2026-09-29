import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Analytics } from './components/Analytics'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ClassPage } from './pages/ClassPage'
import { NivelPage } from './pages/NivelPage'
import { DiccionarioPage } from './pages/DiccionarioPage'
import { TextosPage } from './pages/TextosPage'
import { CuentaPage } from './pages/CuentaPage'
import { levels } from './data/classes'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {levels.map((nivel) => (
              <Route key={nivel.slug} path={nivel.slug} element={<NivelPage />} />
            ))}
            <Route path="nivel-1/clase/:slug" element={<ClassPage />} />
            <Route path="diccionario" element={<DiccionarioPage />} />
            <Route path="textos" element={<TextosPage />} />
            <Route path="cuenta" element={<CuentaPage />} />
            <Route path="progreso" element={<Navigate to="/cuenta" replace />} />
            <Route path="login" element={<Navigate to="/cuenta" replace />} />
            <Route path="clase/:slug" element={<LegacyClassRedirect />} />
            <Route path="recursos" element={<Navigate to="/diccionario" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function LegacyClassRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/nivel-1/clase/${slug}` : '/nivel-1'} replace />
}
