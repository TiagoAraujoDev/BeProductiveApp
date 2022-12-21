import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayouts'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Timer } from './pages/Timer'
import { ToDo } from './pages/ToDo'

export function Router() {
  const isLogged = false
  return (
    <Routes>
      {isLogged ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Timer />} />
          <Route path="/history" element={<History />} />
          <Route path="/ToDo" element={<ToDo />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
    </Routes>
  )
}
