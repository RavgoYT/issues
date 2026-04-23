// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import FormPage from './pages/FormPage.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      {/* Root — no form selected */}
      <Route path="/" element={<NotFound message="No form specified." />} />

      {/* /formname  e.g. /feedback, /issues, /template */}
      <Route path="/:formName" element={<FormPage />} />

      {/* /project/formname  e.g. /myapp/issues */}
      <Route path="/:projectName/:formName" element={<FormPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}