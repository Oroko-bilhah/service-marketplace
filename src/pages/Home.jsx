import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../FavoritesContext"
import { services } from "../data/services"
import "../App.css"
import SiteNavbar from "../components/SiteNavbar"

const categories = [
  {
    name: "Web development",
    description: "Websites, apps, and frontend experiences that feel premium.",
  },
  {
    name: "Graphic design",
    description: "Branding, logos, and visuals that help your business stand out.",
  },
  {
    name: "Photography",
    description: "Candid, polished imagery for life’s biggest moments.",
  },
  {
    name: "Writing",
    description: "Clear, engaging content for blogs, brands, and campaigns.",
  },
  {
    name: "Marketing",
    description: "Campaigns that turn attention into action and growth.",
  },
]

const providers = [
  {
    name: "Alex Mwangi",
    profession: "Full-Stack Developer",
    rating: 4.9,
    services: 24,
  },
  {
    name: "Sarah Wanjiku",
    profession: "Graphic Designer",
    rating: 4.8,
    services: 18,
  },
  {
    name: "Daniel Otieno",
    profession: "Professional Photographer",
    rating: 4.9,
    services: 31,
  },
]

function Home() {
  const { favoriteCount, toggleFavorite, isFavorite } = useFavorites()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categoryOptions = ["All", ...new Set(services.map((service) => service.category))]

  const filteredServices = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase()

    return services.filter((service) => {
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
      const queryMatches = !normalizedQuery ||
        service.title.toLowerCase().includes(normalizedQuery) ||
        service.provider.toLowerCase().includes(normalizedQuery) ||
        service.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && queryMatches
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="site-shell">
      <SiteNavbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">FIND THE RIGHT PROFESSIONAL</p>
            <h1>Find skilled people for any service.</h1>
            <p className="hero-text">
              Discover trusted professionals, compare options, and book the help you need with confidence.
            </p>

            <div className="search-box">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="What service are you looking for?"
                aria-label="Search for a service"
              />
              <button type="button">Search</button>
            </div>

            <div className="quick-filters" aria-label="Service filters">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-pill${selectedCategory === category ? " active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?auto=format&fit=crop&w=2200&q=85"
              alt="Photographer framing a shot at sunset"
            />
          </div>
          <div className="hero-panel" aria-label="Marketplace stats">
            <div className="hero-panel-card">
              <span className="metric-label">Verified experts</span>
              <strong>2,400+</strong>
            </div>
            <div className="hero-panel-card">
              <span className="metric-label">Avg. rating</span>
              <strong>4.9/5</strong>
            </div>
            <div className="hero-panel-card highlight">
              <span className="metric-label">Saved matches</span>
              <strong>{favoriteCount}</strong>
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE SERVICES</p>
              <h2>What do you need help with?</h2>
            </div>
            <Link to="/Services">View all services →</Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <div
                className="category-card category-feature"
                key={category.name}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 13, 29, 0.08) 5%, rgba(8, 13, 29, 0.82) 100%), url(${services.find((service) => service.category.toLowerCase() === category.name.toLowerCase())?.image || (category.name === "Writing" ? "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80" : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80")})` }}
              >
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setSelectedCategory(services.find((service) => service.category.toLowerCase() === category.name.toLowerCase())?.category || category.name)}
                >
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FEATURED SERVICES</p>
              <h2>Popular services</h2>
            </div>
            <Link to="/Services">View all services →</Link>
          </div>

          <div className="service-grid">
            {filteredServices.length ? (
              filteredServices.map((service) => {
                const alreadyFavorite = isFavorite(service.id)

                return (
                  <article className="service-card" key={service.id}>
                  <div
                    className="service-image"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 13, 29, 0.04), rgba(8, 13, 29, 0.48)), url(${service.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  >
                      <span>{service.category}</span>
                      <button
                        type="button"
                        className={`favorite-button${alreadyFavorite ? " is-favorite" : ""}`}
                        aria-label={`${alreadyFavorite ? "Remove" : "Add"} ${service.title} ${alreadyFavorite ? "from" : "to"} favorites`}
                        aria-pressed={alreadyFavorite}
                        onClick={() => toggleFavorite(service.id)}
                      >
                        {alreadyFavorite ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <p className="provider">By {service.provider}</p>

                      <div className="service-bottom">
                        <span>★ {service.rating}</span>
                        <strong>Ksh {service.price}</strong>
                      </div>

                      <div className="service-actions">
                        <Link to={`/service/${service.id}`}>View details</Link>
                      </div>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="empty-state">
                <h3>No matching services found.</h3>
                <p>Try a different keyword or switch to another category.</p>
              </div>
            )}
          </div>
        </section>

        <section className="how-it-works">
          <div className="section-heading centered">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>Simple from start to finish</h2>
            </div>
          </div>

          <div className="steps">
            <div className="step">
              <span className="step-number">01</span>
              <h3>Find a service</h3>
              <p>Search and compare the experts that match your needs and timeline.</p>
            </div>

            <div className="step">
              <span className="step-number">02</span>
              <h3>Compare providers</h3>
              <p>Check ratings, pricing, and reviews before making your choice.</p>
            </div>

            <div className="step">
              <span className="step-number">03</span>
              <h3>Get the job done</h3>
              <p>Request the service and collaborate directly with the professional.</p>
            </div>
          </div>
        </section>

        <section className="providers">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MEET THE PROFESSIONALS</p>
              <h2>Top service providers</h2>
            </div>
            <Link to="/Providers">View all providers →</Link>
          </div>

          <div className="provider-grid">
            {providers.map((provider) => (
              <div className="provider-card" key={provider.name}>
                <div className="provider-avatar">
                  {provider.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div className="provider-info">
                  <h3>{provider.name}</h3>
                  <p>{provider.profession}</p>

                  <div className="provider-stats">
                    <span>★ {provider.rating}</span>
                    <span>{provider.services} services</span>
                  </div>
                </div>

                <a href="#" className="profile-link">View profile →</a>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="cta-content">
            <p className="eyebrow">READY TO GET STARTED?</p>
            <h2>Find the right professional for your next project.</h2>
            <p>Explore talented specialists and get the help you need faster and more confidently.</p>
            <Link to="/register" className="auth-cta-link">Get started today</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <h2>Service Market</h2>
          <p>Connecting buyers and skilled service providers.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <Link to="/">Home</Link>
            <Link to="/Services">Services</Link>
            <Link to="/providers">Providers</Link>
          </div>

          <div>
            <h4>Support</h4>
            <Link to="/favorites">Favorites</Link>
            <Link to="/inbox">Inbox</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
