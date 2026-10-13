import { useMemo, useState } from "react"
import { services } from "../data/services"
import ServiceCard from "../components/ServiceCard"
import SiteNavbar from "../components/SiteNavbar"

const categories = ["All", "Web Development", "Graphic Design", "Photography"]

function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return services.filter((service) => {
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
      const matchesSearch = !query ||
        service.title.toLowerCase().includes(query) ||
        service.provider.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="services-page">
      <SiteNavbar />

      <section className="services-header">
        <p className="eyebrow">EXPLORE MARKET</p>
        <h1>Find the right service for your needs.</h1>
        <p>Browse trusted services from skilled professionals and match with the right expert for your next project.</p>
      </section>

      <section className="services-list">
        <div className="services-toolbar">
          <div className="services-search">
            <input
              type="text"
              placeholder="Search services or providers..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search services or providers"
            />
          </div>

          <div className="services-summary" aria-live="polite">
            <span>{filteredServices.length} matches</span>
            <span>{selectedCategory === "All" ? "All categories" : selectedCategory}</span>
          </div>
        </div>

        <div className="category-filters" aria-label="Service categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="service-grid">
          {filteredServices.length ? (
            filteredServices.map((service) => <ServiceCard key={service.id} service={service} />)
          ) : (
            <div className="no-services">
              <h3>No services found</h3>
              <p>Try a different search term or category.</p>
              <button type="button" onClick={() => { setSearchTerm(""); setSelectedCategory("All") }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Services
