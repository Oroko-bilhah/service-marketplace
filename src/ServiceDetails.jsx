import { useParams, Link } from "react-router-dom"

function ServiceDetails() {
  const { id } = useParams()

  return (
    <div className="service-details-page">
      <Link to="/services">← Back to services</Link>

      <h1>Service Details</h1>

      <p>Service ID: {id}</p>
    </div>
  )
}

export default ServiceDetails
