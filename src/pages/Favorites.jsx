import { Link } from "react-router-dom"
import ServiceCard from "../components/ServiceCard"
import { useFavorites } from "../FavoritesContext"
import { services } from "../data/services"

function Favorites() {
  const { favoriteIds } = useFavorites()
  const favoriteServices = services.filter((service) => favoriteIds.includes(service.id))

  return (
    <main className="favorites-page">
      <section className="favorites-header">
        <nav className="page-links"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/inbox">Inbox</Link></nav>
        <p className="eyebrow">YOUR SHORTLIST</p>
        <h1>Favorite services</h1>
        <p>Keep the services you are interested in close at hand.</p>
      </section>
      <section className="favorites-list">
        {favoriteServices.length ? (
          <div className="service-grid">
            {favoriteServices.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        ) : (
          <div className="no-services">
            <h2>No favorites yet</h2>
            <p>Save a service with the heart button and it will appear here.</p>
            <Link to="/services">Browse services</Link>
          </div>
        )}
      </section>
    </main>
  )
}

export default Favorites
