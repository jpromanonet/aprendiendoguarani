import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ClassPage } from './pages/ClassPage'
import { Resources } from './pages/Resources'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clase/:slug" element={<ClassPage />} />
          <Route path="recursos" element={<Resources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
