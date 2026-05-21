import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SupplifyPage } from './pages/SupplifyPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="supplify" element={<SupplifyPage />} />
      </Route>
    </Routes>
  )
}
