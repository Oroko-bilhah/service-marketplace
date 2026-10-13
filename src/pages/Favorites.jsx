import { Link } from "react-router-dom"
import ServiceCard from "../components/ServiceCard"
import { useFavorites } from "../FavoritesContext"
import { services } from "../data/services"
import SiteNavbar from "../components/SiteNavbar"

function Favorites() {
  const { favoriteIds, favoriteCount } = useFavorites()
  const favoriteServices = services.filter((service) => favoriteIds.includes(service.id))

  return (
    <main className="favorites-page">
      <SiteNavbar />

      <section className="favorites-header">
        <p className="eyebrow">YOUR SHORTLIST</p>
        <h1>Favorite services</h1>
        <p>Keep the services you are interested in close at hand and compare them when you’re ready.</p>
      </section>

      <section className="favorites-list">
        <div className="favorites-summary">
          <div>
            <strong>{favoriteCount}</strong>
            <span>Saved services</span>
          </div>
          {favoriteServices[0] ? (
            <div>
              <strong>{favoriteServices[0].provider}</strong>
              <span>Top pick</span>
            </div>
          ) : null}
        </div>

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
