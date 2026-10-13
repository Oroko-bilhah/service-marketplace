import { Link } from "react-router-dom"
import SiteNavbar from "../components/SiteNavbar"

const providers = [
  {
    name: "Alex Mwangi",
    profession: "Full-Stack Developer",
    rating: 4.9,
    services: 24,
    specialty: "Web & product design",
    responseTime: "Usually replies in 2 hours",
  },
  {
    name: "Sarah Wanjiku",
    profession: "Graphic Designer",
    rating: 4.8,
    services: 18,
    specialty: "Brand identity",
    responseTime: "Usually replies in 4 hours",
  },
  {
    name: "Daniel Otieno",
    profession: "Professional Photographer",
    rating: 4.9,
    services: 31,
    specialty: "Events & portraits",
    responseTime: "Usually replies in 1 hour",
  },
]

function Providers() {
  return (
    <div className="providers-page">
      <SiteNavbar />

      <section className="providers-header">
        <p className="eyebrow">DISCOVER TALENT</p>
        <h1>Find skilled professionals for your next project.</h1>
        <p>
          Explore trusted professionals, compare their services, and match with the right person for the job.
        </p>
      </section>

      <section className="providers-list">
        <div className="providers-summary">
          <div>
            <strong>3</strong>
            <span>Top-rated providers</span>
          </div>
          <div>
            <strong>4.9/5</strong>
            <span>Average rating</span>
          </div>
          <div>
            <strong>24h</strong>
            <span>Typical response time</span>
          </div>
        </div>

        <div className="provider-grid">
          {providers.map((provider) => (
            <article className="provider-card" key={provider.name}>
              <div className="provider-avatar">
                {provider.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div className="provider-info">
                <h2>{provider.name}</h2>
                <p>{provider.profession}</p>
                <div className="provider-tag">{provider.specialty}</div>

                <div className="provider-stats">
                  <span>★ {provider.rating}</span>
                  <span>{provider.services} services</span>
                </div>

                <p className="provider-response">{provider.responseTime}</p>

                <Link to="/services" className="profile-link">
                  View profile →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Providers
