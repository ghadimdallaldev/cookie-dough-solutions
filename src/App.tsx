import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { OrderingAppPage } from './pages/OrderingAppPage'
import { SupplifyPage } from './pages/SupplifyPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="supplify" element={<SupplifyPage />} />
        <Route path="ordering" element={<OrderingAppPage />} />
        <Route path="al-maalem" element={<Navigate to="/ordering" replace />} />
      </Route>
    </Routes>
  )
}
