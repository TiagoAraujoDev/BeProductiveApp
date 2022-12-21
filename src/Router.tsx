import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayouts'
import { History } from './pages/History'
import { Timer } from './pages/Timer'
import { ToDo } from './pages/ToDo'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Timer />} />
        <Route path="/history" element={<History />} />
        <Route path="/ToDo" element={<ToDo />} />
      </Route>
    </Routes>
  )
}
