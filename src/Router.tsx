import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayouts'
import { HomeLayout } from './layouts/HomeLayout'
import { History } from './pages/History'
import { SignUp } from './pages/Home/SignUp'
import { SignIn } from './pages/SignIn'
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
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      )}
    </Routes>
  )
}
