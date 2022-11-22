import { CheckSquareOffset, RocketLaunch, Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import { HeaderContainer, LogoContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <span>Focus</span>
        <RocketLaunch size={32} color="#00875F" />
      </LogoContainer>
      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/todo" title="todo">
          <CheckSquareOffset size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
