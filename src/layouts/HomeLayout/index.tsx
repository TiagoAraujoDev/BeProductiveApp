import { Outlet } from 'react-router-dom'
import { HeroSection } from '../../components/HeroSection'
import { HomeContainer } from './styles'

export function HomeLayout() {
  return (
    <HomeContainer>
      <HeroSection />
      <Outlet />
    </HomeContainer>
  )
}
