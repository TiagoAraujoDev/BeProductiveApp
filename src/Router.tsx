import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayouts'
import { HomeLayout } from './layouts/HomeLayout'
import { History } from './pages/History'
import { SignUp } from './pages/Home/SignUp'
import { SignIn } from './pages/Home/SignIn'
import { Timer } from './pages/Timer'
import { ToDo } from './pages/ToDo'
import { PersistSession } from './components/PersistSession'
import { AuthRoute } from './components/AuthRoute'

export const Router = () => {
  return (
    <Routes>
      <Route element={<PersistSession />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Timer />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/history" element={<History />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/todo" element={<ToDo />} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}
