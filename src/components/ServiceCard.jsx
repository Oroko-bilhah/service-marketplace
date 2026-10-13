import { Link } from "react-router-dom"
import { useFavorites } from "../FavoritesContext"

function ServiceCard({ service }) {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const isFavorite = favoriteIds.includes(service.id)

  return (
    <article className="service-card">
      <div className={`service-image ${service.category.toLowerCase().replaceAll(" ", "-")}`}>
        <span>{service.category}</span>
        <button
          type="button"
          className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
          aria-label={`${isFavorite ? "Remove" : "Add"} ${service.title} ${isFavorite ? "from" : "to"} favorites`}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(service.id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="service-content">
        <h3>{service.title}</h3>
        <p className="provider">By {service.provider}</p>
        <div className="service-bottom">
          <span>★ {service.rating}</span>
          <strong>Ksh {service.price}</strong>
        </div>
        <div className="service-action">
          <Link to={`/service/${service.id}`}>View service →</Link>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
