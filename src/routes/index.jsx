import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Events from '../pages/Events'
import Settings from '../pages/Settings'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/service-worker.js"
        element={null} 
      />
    </Routes>
  )
}

export default AppRoutes