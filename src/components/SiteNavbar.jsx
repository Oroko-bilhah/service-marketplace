import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../useAuth"
import { useFavorites } from "../FavoritesContext"

const navigation = [
  { label: "Home", to: "/", end: true },
  { label: "Services", to: "/services" },
  { label: "Providers", to: "/providers" },
  { label: "Inbox", to: "/inbox" },
]

function SiteNavbar() {
  const { favoriteCount } = useFavorites()
  const { user, logout } = useAuth()
  const [logoutError, setLogoutError] = useState("")

  async function handleLogout() {
    setLogoutError("")
    try {
      await logout()
    } catch (error) {
      setLogoutError(error.message)
    }
  }

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
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name.split(" ")[0]}</span>
            <button type="button" className="auth-nav-link" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-nav-link">Log in</Link>
            <Link to="/register" className="primary-button">Get Started</Link>
          </>
        )}
      </div>
      {logoutError && <span className="navbar-auth-error" role="alert">{logoutError}</span>}
    </header>
  )
}

export default SiteNavbar
