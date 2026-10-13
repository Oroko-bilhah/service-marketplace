import { Link, NavLink } from "react-router-dom"
import { useFavorites } from "../FavoritesContext"

const navigation = [
  { label: "Home", to: "/", end: true },
  { label: "Services", to: "/services" },
  { label: "Providers", to: "/providers" },
  { label: "Inbox", to: "/inbox" },
]

function SiteNavbar() {
  const { favoriteCount } = useFavorites()

  return (
    <header className="navbar">
      <Link to="/" className="brand-block" aria-label="Service Market home">
        <span className="brand-name">Service Market</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {navigation.map(({ label, to, end }) => (
          <NavLink key={to} to={to} end={end}>{label}</NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <NavLink to="/favorites" className="favorites-link" aria-label={`Favorites, ${favoriteCount} saved`}>
          Favorites <span className="favorites-badge">{favoriteCount}</span>
        </NavLink>
        <Link to="/services" className="primary-button">Get Started</Link>
      </div>
    </header>
  )
}

export default SiteNavbar
