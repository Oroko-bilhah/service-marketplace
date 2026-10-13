import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { services } from "./data/services"
import SiteNavbar from "./components/SiteNavbar"

function StarRating({ value, label }) {
  return (
    <span className="star-rating" aria-label={label || `${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= value ? "star filled" : "star"} aria-hidden="true">★</span>
      ))}
    </span>
  )
}

function ServiceDetails() {
  const { id } = useParams()
  const service = services.find((item) => item.id === Number(id))
  const [userReviews, setUserReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`market-reviews-${id}`) || "[]")
    } catch {
      return []
    }
  })
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [error, setError] = useState("")

  if (!service) {
    return (
      <div className="site-shell">
        <SiteNavbar />
        <main className="service-details-page"><h1>Service not found</h1><Link to="/services">Back to services</Link></main>
      </div>
    )
  }

  const reviews = [...userReviews, ...service.reviews]

  function submitReview(event) {
    event.preventDefault()
    if (!rating) {
      setError("Choose a star rating before submitting.")
      return
    }
    const nextReviews = [{ name: name.trim() || "Marketplace customer", rating, text: reviewText.trim() }, ...userReviews]
    setUserReviews(nextReviews)
    localStorage.setItem(`market-reviews-${id}`, JSON.stringify(nextReviews))
    setName("")
    setReviewText("")
    setRating(0)
    setError("")
  }

  return (
    <div className="site-shell">
      <SiteNavbar />
      <main className="service-details-page">
      <Link className="back-link" to="/services">← Back to services</Link>
      <div className="detail-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(8, 13, 29, 0.12), rgba(8, 13, 29, 0.04)), url(${service.image})` }} role="img" aria-label={service.title} />
      <section className="service-detail-summary">
        <p className="eyebrow">{service.category}</p>
        <h1>{service.title}</h1>
        <p>By {service.provider}</p>
        <div className="detail-rating"><StarRating value={Math.round(service.rating)} /><strong>{service.rating.toFixed(1)}</strong><span>({reviews.length} reviews)</span></div>
        <strong className="detail-price">Ksh {service.price}</strong>
        <span className="price-caption">One-time service price</span>
        <Link className="contact-provider" to={`/inbox?serviceId=${service.id}`}>Message provider</Link>
      </section>

      <section className="service-info-grid">
        <article className="service-info-card service-description">
          <p className="eyebrow">ABOUT THIS SERVICE</p>
          <h2>What you can expect</h2>
          <p>{service.description}</p>
          <h3>What’s included</h3>
          <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <aside className="service-info-card service-facts">
          <p className="eyebrow">DELIVERY DETAILS</p>
          <dl>
            <div><dt>Delivery time</dt><dd>{service.deliveryTime}</dd></div>
            <div><dt>Revisions included</dt><dd>{service.revisions}</dd></div>
            <div><dt>Category</dt><dd>{service.category}</dd></div>
          </dl>
          <Link className="contact-provider" to={`/inbox?serviceId=${service.id}`}>Ask {service.provider.split(" ")[0]} a question</Link>
        </aside>
        <article className="service-info-card provider-bio">
          <p className="eyebrow">ABOUT THE PROVIDER</p>
          <div className="provider-avatar">{service.provider.split(" ").map((part) => part[0]).join("")}</div>
          <div><h2>{service.provider}</h2><p>{service.providerBio}</p></div>
          <Link to={`/inbox?serviceId=${service.id}`}>Contact provider →</Link>
        </article>
      </section>

      <section className="reviews-section">
        <div className="reviews-heading">
          <div><p className="eyebrow">CUSTOMER FEEDBACK</p><h2>Reviews</h2></div>
          <div className="reviews-overview"><StarRating value={Math.round(service.rating)} /><strong>{service.rating.toFixed(1)} / 5</strong></div>
        </div>

        <form className="review-form" onSubmit={submitReview}>
          <h3>Leave a review</h3>
          <label className="rating-label">Your rating</label>
          <div className="rating-picker" onMouseLeave={() => setHoveredRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" className={star <= (hoveredRating || rating) ? "selected" : ""} aria-label={`Rate ${star} out of 5 stars`} aria-pressed={rating === star} onMouseEnter={() => setHoveredRating(star)} onFocus={() => setHoveredRating(star)} onBlur={() => setHoveredRating(0)} onClick={() => { setRating(star); setError("") }}>★</button>
            ))}
          </div>
          <label htmlFor="review-name">Name</label>
          <input id="review-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" maxLength={60} />
          <label htmlFor="review-text">Review</label>
          <textarea id="review-text" value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Share your experience" required maxLength={600} rows={4} />
          {error && <p className="review-error" role="alert">{error}</p>}
          <button className="submit-review" type="submit">Submit review</button>
        </form>

        <div className="review-list">
          {reviews.map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <div className="review-card-heading"><h3>{review.name}</h3><StarRating value={review.rating} /></div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </section>
      </main>
    </div>
  )
}

export default ServiceDetails
