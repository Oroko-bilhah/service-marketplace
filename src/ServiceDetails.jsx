import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { services } from "./data/services"

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
    return <main className="service-details-page"><h1>Service not found</h1><Link to="/services">Back to services</Link></main>
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
    <main className="service-details-page">
      <Link className="back-link" to="/services">← Back to services</Link>
      <section className="service-detail-summary">
        <p className="eyebrow">{service.category}</p>
        <h1>{service.title}</h1>
        <p>By {service.provider}</p>
        <div className="detail-rating"><StarRating value={Math.round(service.rating)} /><strong>{service.rating.toFixed(1)}</strong><span>({reviews.length} reviews)</span></div>
        <strong className="detail-price">Ksh {service.price}</strong>
        <Link className="contact-provider" to={`/inbox?serviceId=${service.id}`}>Message provider</Link>
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
  )
}

export default ServiceDetails
